const Stripe = require('stripe');
const User = require('../models/users.model');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
	199: 250,
	499: 800,
	999: 1800,
};

exports.createCreditsOrder = async (req, res) => {
	try {
		const userId = req.user?.id;
		const amount = Number(req.body?.amount);

		if (!userId) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		if (!CREDIT_MAP[amount]) {
			return res.status(400).json({ message: 'Invalid credit plan' });
		}

		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			payment_method_types: ['card'],
			success_url: `${process.env.CLIENT_URL}/payment-success`,
			cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
			line_items: [
				{
					price_data: {
						currency: 'inr',
						product_data: {
							name: `${CREDIT_MAP[amount]} Credits`,
						},
						unit_amount: amount * 100,
					},
					quantity: 1,
				},
			],
			metadata: {
				userId,
				credits: String(CREDIT_MAP[amount]),
			},
		});

		return res.status(200).json({
			checkoutUrl: session.url,
			sessionId: session.id,
		});
	} catch (error) {
		console.error('Create Stripe order error:', error);
		return res.status(500).json({ message: 'Failed to create checkout session' });
	}
};

exports.stripeWebhook = async (req, res) => {
	const sig = req.headers['stripe-signature'];
	let event;

	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);
	} catch (error) {
		console.error('Webhook signature error:', error.message);
		return res.status(400).send('Webhook Error');
	}

	if (event.type === 'checkout.session.completed') {
		try {
			const session = event.data.object;
			const userId = session?.metadata?.userId;
			const creditsToAdd = Number(session?.metadata?.credits);

			if (!userId || !creditsToAdd) {
				return res.status(400).json({ message: 'Invalid metadata' });
			}

			await User.findByIdAndUpdate(
				userId,
				{
					$inc: { credits: creditsToAdd },
					$set: { isCreditAvailable: true },
				},
				{ new: true }
			);
		} catch (error) {
			console.error('Webhook processing error:', error);
			return res.status(500).json({ message: 'Webhook processing failed' });
		}
	}

	return res.json({ received: true });
};


