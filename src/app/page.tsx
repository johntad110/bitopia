'use client'
import { TelegramProvider, useTelegram } from "@/hooks/TelegramProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { user, webApp } = useTelegram();
  const [points, setPoints] = useState(5000);
  const [taps, setTaps] = useState<any>([]);
  const [isTapped, setIsTapped] = useState(false);

  const handleCoinTap = (event: any) => {
    setPoints(points + 1);

    const newTap = {
      id: Date.now(),
      x: event.clientX,
      y: event.clientY,
    };

    setTaps([...taps, newTap])
    setIsTapped(!isTapped)
  }

  const demo_user = {
    id: 12,
    first_name: 'John',
    last_name: 'Tad',
    username: '@John_tad',
    language_code: 'en',
  }

  return (
    <TelegramProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-2">
        {/* Status */}
        <div className="w-full flex items-center justify-around">
          <div>Points: {points}</div>
          <div className="text-gray-400">Bitopia Frens: --</div>
        </div>

        {/* Coin */}
        <div
          onClick={handleCoinTap}
          className={`h-56 w-56 mt-8 from-yellow-300 to-violet-600 rounded-full border-8 border-white flex flex-wrap justify-center items-center text-[120px] select-none font-bold ${isTapped ? 'bg-gradient-to-tr' : 'bg-gradient-to-br'}`}
          style={{ transition: "background 0.3s ease" }}
        >
          $
        </div>

        {/* Taps Animation */}
        <AnimatePresence>
          {taps.map((tap: any) => (
            <motion.div
              key={tap.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -100 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .5 }}
              className="absolute text-white font-bold text-xl select-none z-10"
              style={{ top: tap.y, left: tap.x }}
              onAnimationComplete={() => {
                setTaps(taps.filter((t: any) => t.id !== tap.id))
              }}
            >
              +1
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Bottom bar */}
        <button
          className="w-full h-12 mt-8 bg-gray-100/10 rounded-2xl"
          onClick={() => {
            webApp?.openTelegramLink(
              `https://t.me/share/url?url=http://t.me/bitopia_bot?start=fren=${user?.id}`
            )
          }}
        >
          Invite Friends
        </button>
      </main>
    </TelegramProvider>
  );
}
