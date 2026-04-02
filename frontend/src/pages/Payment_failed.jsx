import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaTimesCircle } from 'react-icons/fa';

function Payment_failed() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/home', { replace: true });
    }, 5000);

    const countdownTimer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-950 via-zinc-950 to-slate-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full rounded-3xl border border-rose-400/30 bg-zinc-900/70 p-8 text-center shadow-[0_0_80px_rgba(244,63,94,0.2)] backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-rose-300/60 bg-rose-400/15"
          >
            <FaTimesCircle className="text-5xl text-rose-300" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-3xl font-bold"
          >
            Payment Failed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mx-auto mt-3 max-w-xl text-zinc-300"
          >
            The transaction was cancelled or could not be completed. You can try again from the credits page.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="mt-6 text-sm text-zinc-400"
          >
            Redirecting in <span className="font-semibold text-rose-300">{secondsLeft}</span> seconds...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default Payment_failed;