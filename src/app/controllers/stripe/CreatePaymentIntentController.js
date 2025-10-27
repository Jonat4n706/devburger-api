import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class CreatePaymentIntentController {
  async store(req, res) {
    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Valor inválido' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'brl',
        automatic_payment_methods: { enabled: true },
      });

      return res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar pagamento' });
    }
  }
}

export default new CreatePaymentIntentController();
