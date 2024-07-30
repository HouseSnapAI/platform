import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
  geoip: z.any().optional(),
  ip: z.string().optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  beds: z.number().nullable().optional(),
  baths: z.number().nullable().optional(),
  min_budget: z.number().nullable().optional(),
  max_budget: z.number().nullable().optional(),
  house_description: z.string().optional(),
  min_size_of_house: z.number().nullable().optional(),
  max_size_of_house: z.number().nullable().optional(),
  location: z.array(z.string()).optional(),
  property_types: z.array(z.string()).optional(),
  clicked: z.array(z.object({
    engage_date: z.string(),
    id: z.string(),
  })).optional(),
  viewed: z.array(z.object({
    engage_date: z.string(),
    id: z.string(),
  })).optional(),
  saved: z.array(z.object({
    engage_date: z.string(),
    id: z.string(),
  })).optional(),
  chats: z.array(z.object({
    id: z.string(),
    updated_at: z.string(),
    title: z.string(),
  })).optional(),
});

export const PATCH = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'PATCH') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const parseResult = schema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const { id, ...updateFields } = parseResult.data;


  try {
    const { data, error } = await supabase
      .from('User')
      .update(updateFields)
      .eq('id', id);

    if (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User updated successfully', data }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});