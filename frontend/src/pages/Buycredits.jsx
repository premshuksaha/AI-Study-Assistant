import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import Homelayout from '../components/Home/Homelayout'
import { useUserAuth } from '../hooks/useUserAuth';

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;

  return (
    <article
      onClick={() => setSelectedPrice(amount)}
      className={`relative rounded-2xl border p-6 transition ${
        isSelected
          ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
          : 'border-white/10 bg-white/5'
      }`}
    >
      {popular ? (
        <span className="absolute -top-3 right-4 rounded-full border border-emerald-300/50 bg-blue-900 px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      ) : null}

      <p className="text-sm font-semibold uppercase tracking-wider text-zinc-300">{title}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-3xl font-bold text-zinc-50">{price}</span>
        <span className="pb-1 text-sm text-zinc-400">one-time</span>
      </div>

      <p className="mt-3 text-sm text-zinc-300">{description}</p>

      <div className="mt-4 rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2">
        <p className="text-sm text-zinc-200">
          Includes <span className="font-semibold text-emerald-300">{credits} credits</span>
        </p>
      </div>

      <ul className="mt-5 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="text-sm text-zinc-300">
            • {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBuy({ title, amount, credits });
          }}
          disabled={paying}
          className="w-full rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPayingThisCard ? 'Processing...' : `Buy ${title}`}
        </button>
      </div>
    </article>
  );
}

const Buycredits = () => {
  const { user, isLoading } = useUserAuth();
  const [selectedPrice, setSelectedPrice] = useState(499);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const pricingPlans = useMemo(
    () => [
      {
        title: 'Starter',
        price: 'Rs 199',
        amount: 199,
        credits: 250,
        description: 'Best for trying premium generation regularly.',
        features: ['250 AI note credits', 'Fast generation queue', 'Use anytime'],
        popular: false,
      },
      {
        title: 'Pro',
        price: 'Rs 499',
        amount: 499,
        credits: 800,
        description: 'Ideal for weekly study sessions and exam prep.',
        features: ['800 AI note credits', 'Priority processing', 'Better value per credit'],
        popular: true,
      },
      {
        title: 'Ultra',
        price: 'Rs 999',
        amount: 999,
        credits: 1800,
        description: 'For power users creating notes every day.',
        features: ['1800 AI note credits', 'Highest savings', 'Priority support readiness'],
        popular: false,
      },
    ],
    []
  );

  const handleBuyCredits = async (plan) => {
    try {
      setPaying(true);
      setPayingAmount(plan.amount);
      setSelectedPrice(plan.amount);

    } catch {
      toast.error('Unable to start payment right now.');
    } finally {
      setPaying(false);
      setPayingAmount(null);
    }
  };

  return (
    <Homelayout activeMenu="Buy Credits" isLoading={isLoading}>
      <section className="p-2 sm:p-4">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100">Buy Credits</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Pick a credit pack now, then we will connect checkout to your Stripe payment controller.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
            Current Balance: <span className="font-semibold text-emerald-300">{user?.credits ?? 0}</span> credits
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.amount}
              title={plan.title}
              price={plan.price}
              amount={plan.amount}
              credits={plan.credits}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              onBuy={handleBuyCredits}
              paying={paying}
              payingAmount={payingAmount}
            />
          ))}
        </div>
      </section>
    </Homelayout>
  )
}

export default Buycredits