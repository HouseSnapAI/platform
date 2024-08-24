import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/supabase/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig as string, endpointSecret);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: "webhook error", error: err }, { status: 400 });
  }

  console.log("EVENT TYPE", event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;

    if (userId) {
      // Retrieve line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      console.log("LINE ITEMS", lineItems);
      let discountCode;

      const additionalReports = lineItems.data[0].description == 'House Snapshot' ? 1 : lineItems.data[0].description == 'House Album' ? 3 : 7;
    
      // Log discount codes
      if (session.total_details?.amount_discount && session.total_details.breakdown?.discounts) {
        session.total_details.breakdown.discounts.forEach(discount => {
          console.log(`Discount Code: ${discount.discount.promotion_code}`);
        });

        discountCode = session.total_details.breakdown.discounts[0].discount.promotion_code;
      }

      // Fetch current reports_remaining
      const { data: userData, error: fetchError } = await supabase
        .from('User')
        .select('reports_remaining')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Error fetching user data from Supabase:', fetchError);
        return NextResponse.json({ message: "Supabase fetch error", error: fetchError }, { status: 500 });
      }

      const currentReportsRemaining = userData.reports_remaining;
      const newReportsRemaining = currentReportsRemaining + additionalReports;

      // Update user in Supabase
      const { data, error } = await supabase
        .from('User')
        .update({ 
          plan: 'paid',
          reports_remaining: newReportsRemaining,
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating Supabase:', error);
        return NextResponse.json({ message: "Supabase update error", error: error }, { status: 500 });
      }

      const {data: dataPayments, error: errorPayments} = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount: session.amount_total,
        currency: session.currency,
        status: session.status,
        products: lineItems.data[0].description,
        discount_code: discountCode,
        customer_details: session.customer_details
      })
      console.log('Supabase update successful:', dataPayments);
    
    }
  }

  return NextResponse.json({ message: "webhook called" }, { status: 200 });
}