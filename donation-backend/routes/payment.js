const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('your-stripe-secret-key');

router.post('/charge', async (req, res) => {
  try {
    const { amount, source, description } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      description
    });
    res.status(200).json(charge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

