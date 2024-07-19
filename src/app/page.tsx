'use client'
import { useTelegram } from "@/hooks/TelegramProvider";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from 'lodash';
import NoUser from "@/components/no_user";


export default function Home() {
  let { user, webApp, bitopiaData, setBitopiaData } = useTelegram();
  const [points, setPoints] = useState<number>(0);
  const [taps, setTaps] = useState<any>([]);
  const [isTapped, setIsTapped] = useState(false);
  const [remainingEnergy, setRemainingEnergy] = useState<number>(500);

  useEffect(() => {
    const storedPoints = localStorage.getItem('points');
    const storedEnergy = localStorage.getItem('remainingEnergy');

    if (storedPoints) setPoints(Number(storedPoints));
    if (storedEnergy) setRemainingEnergy(Number(storedEnergy))
  }, [])

  useEffect(() => {
    localStorage.setItem('points', points.toString());
    localStorage.setItem('remainingEnergy', remainingEnergy.toString());
  }, [points, remainingEnergy]);

  useEffect(() => {
    if (bitopiaData && bitopiaData.remaining_energy < 500) {
      const intervalId = setInterval(() => {
        setBitopiaData((prevData: any) => {
          if (prevData && prevData.remaining_energy < 500) {
            return { ...prevData, remaining_energy: prevData.remaining_energy + 1 };
          } else {
            clearInterval(intervalId);
            return prevData;
          }
        });
      }, (5 * 60 * 1000) / 500);  // 5 minutes to refill to 500
      return () => clearInterval(intervalId);
    }
  }, [bitopiaData?.remaining_energy]);

  const syncDataWithServer = async (points: number, remainingEnergy: number) => {
    try {
      const response = await fetch('/api/syncData', {
        method: 'POST',
        body: JSON.stringify({ tg_id: user?.id, points, remainingEnergy }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to sync data with server...');
      }
    } catch (error) {
      console.error('Error syncing data:', error)
      webApp?.showAlert('Error syncing data.');
    }
  };

  const debouncedSyncData = useCallback(debounce(syncDataWithServer, 5000), [])

  const handleCoinTap = (event: any) => {
    if (remainingEnergy > 0) {
      setPoints((prevPoints) => {
        const newPoints = prevPoints + 1;
        debouncedSyncData(newPoints, remainingEnergy - 1);

        if (setBitopiaData) {
          setBitopiaData({
            ...bitopiaData,
            bitopia_points: newPoints,
            remaining_energy: remainingEnergy - 1,
          })
        }

        return newPoints;
      });
      setRemainingEnergy((prevPoint) => prevPoint - 1)


      const newTap = {
        id: Date.now(),
        x: event.clientX,
        y: event.clientY,
      };

      setTaps((prevTaps: any) => [...prevTaps, newTap])
      setIsTapped((prevIsTapped) => !prevIsTapped)
    }
  }

  return (
    <div>
      {user ? (
        <main className=" min-h-screen flex flex-col items-center justify-between p-2">
          <div className="w-full flex flex-col items-center justify-center mt-20">
            {/* Status */}
            <div className="w-full flex items-center justify-around">
              <div>Bitopia Points: {bitopiaData?.bitopia_points || '--'}</div>
              <div className="text-white border  px-1 rounded-lg">Bitopia Frens: {bitopiaData ? bitopiaData.bitopia_friends.length : '/...|'}</div>
            </div>
            {/* Coin */}
            <div
              onClick={handleCoinTap}
              className={`h-56 w-56 mt-8 from-yellow-300 to-violet-600 rounded-full border-8 border-white shadow-xl dark:shadow-gray-500 dark:shadow-lg flex flex-wrap justify-center items-center text-[120px] select-none font-bold ${isTapped ? 'bg-gradient-to-tr' : 'bg-gradient-to-br'}`}
              style={{ transition: "background 0.3s ease" }}
            >
              $
            </div>
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
          <div className="w-full">
            <p className="text-xs">Remaining Energy: {remainingEnergy} ({(remainingEnergy / 500) * 100}%)</p>
            <div className="w-full h-4 bg-violet-600 rounded-full">
              <div
                className={`h-full bg-gradient-to-r from-green-300 bg-green-600 rounded-full`}
                style={{ width: `${remainingEnergy / 500 * 100}%` }}
              ></div>
            </div>
            <button
              className="w-full h-12 mt-8 mb-20 bg-gray-200 rounded-2xl dark:bg-gray-100/10 hover:bg-gray-300 dark:hover:dark:bg-gray-600"
              onClick={() => {
                webApp?.openTelegramLink(
                  `https://t.me/share/url?url=http://t.me/bitopia_bot?start=fren=${user?.id}`
                )
              }}
            >
              Invite a friend
            </button>
          </div>
        </main>
      ) : (
        <NoUser />
      )}
    </div>
  );
}