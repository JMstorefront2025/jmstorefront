// pages/api/checkout.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: 'Checkout failed' });
  }
}
