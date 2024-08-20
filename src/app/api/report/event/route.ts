import { NextRequest, NextResponse } from 'next/server';

let clients: { id: number; clientId: string; writer: WritableStreamDefaultWriter }[] = [];

export const GET = async function handler(req: NextRequest) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };

  const url = new URL(req.url);
  const clientId = url.searchParams.get('clientId');
  console.log('Client ID:', clientId);
  if (!clientId) {
    return new Response('Client ID is required', { status: 400 });
  }

  const connectionId = Date.now();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const keepAlive = setInterval(() => {
    writer.write(encoder.encode(':\n\n'));
  }, 15000);

  req.signal.addEventListener('abort', () => {
    clearInterval(keepAlive);
    writer.close();
    clients = clients.filter(client => client.id !== connectionId);
  });

  const newClient = {
    id: connectionId,
    clientId,
    writer,
  };

  clients.push(newClient);

  return new Response(readable, { headers });
};

function notifyClient(clientId: string, message: any) {
  const encoder = new TextEncoder();
  clients
    .filter(client => client.clientId === clientId)
    .forEach(client => {
      client.writer.write(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
    });
}

export const POST = async function handler(req: NextRequest) {
  const body = await req.json();
  const { message, clientId } = body;
  console.log('Message:', message);
  console.log('Client ID In POST:', clientId);
  if (clientId) {
    notifyClient(clientId, { message });
    return NextResponse.json({ message: 'Client notified' }, { status: 200 });
  }
  return NextResponse.json({ message: 'Invalid message or clientId' }, { status: 400 });
};