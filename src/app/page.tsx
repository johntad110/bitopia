'use client'
import { TelegramProvider, useTelegram } from "@/hooks/TelegramProvider";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BottomBar from "@/components/bottom_bar";
import { data } from "@/types";

function WebApp() {
  let { user, webApp } = useTelegram();
  const [points, setPoints] = useState<number>(0);
  const [taps, setTaps] = useState<any>([]);
  const [isTapped, setIsTapped] = useState(false);
  const [userData, setUserData] = useState<data>();
  const [remainingEnergy, setRemainingEnergy] = useState<number>(500);

  const fetchUserData = async () => {
    webApp?.showAlert('Loading your Bitopia points ...');
    const response = await fetch('/api/userData', {
      method: 'POST',
      body: JSON.stringify({
        tg_id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        username: user?.username,
        language_code: user?.language_code,
        photo_url: user?.photo_url,
      })
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Fetched user data', data.userData)
      setUserData(data)
      setPoints(data.userData.bitopia_points)
    } else {
      const msg = await response.json()
      console.error('Error fetching u_data. ', msg.message);
      webApp?.showAlert('Something went wrong. Please reload the page.');
    }
  }

  const handleCoinTap = (event: any) => {
    setPoints(points + 1);
    setRemainingEnergy((prevPoint) => prevPoint - 1)

    const newTap = {
      id: Date.now(),
      x: event.clientX,
      y: event.clientY,
    };

    setTaps([...taps, newTap])
    setIsTapped(!isTapped)
  }

  useEffect(() => {
    fetchUserData()
  }, [user])


  return (
    <div>
      {user ? (
        <main className=" min-h-screen flex flex-col items-center justify-between p-2">
          {/* Top Bar */}
          <div className="w-full p-1 mt-2 flex flex-col justify-between gap-10 border-2 border-white dark:border-gray-500 rounded-xl">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-600 to-yellow-300 dark:bg-slate-200 object-cover">
                <img src={user?.photo_url} alt="" />
              </div>
              <div className="">
                <h1>{user?.first_name} (#{user?.id})</h1>
                <div className="h-2 w-20 bg-white dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-2 w-10 bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            {/* Status */}
            <div className="w-full flex items-center justify-around">
              <div>Bitopia Points: {points}</div>
              <div className="text-gray-400">Bitopia Frens: --</div>
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
            Remaining Energy: {remainingEnergy} ({}%)
            <div className="w-full h-4 bg-gray-800 rounded-full">
              <div 
              className={`h-full bg-green-400 rounded-full`}
              style={{ width: `${remainingEnergy / 500 * 100}%` }}
              ></div>
            </div>
            <button
              className="w-full h-12 mt-8 mb-2 bg-gray-200 rounded-2xl dark:bg-gray-100/10 hover:bg-gray-300 dark:hover:dark:bg-gray-600"
              onClick={() => {
                webApp?.openTelegramLink(
                  `https://t.me/share/url?url=http://t.me/bitopia_bot?start=fren=${user?.id}`
                )
              }}
            >
              Invite a friend
            </button>
            <BottomBar />
          </div>
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center items-center border-b border-gray-100 bg-gradient-to-b from-pink-400 pb-6 pt-8 backdrop-blur-2xl dark:border-gray-600 dark:bg-gradient-to-br dark:from-pink-100/30 lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Make sure to open using a <a href="https://t.me/bitopia_bot" className="m-1 px-2 underline underline-offset-4 text-blue-600 hover:underline-offset-2">Telegram</a> client.
            </p>
            <div className="fixed bottom-2 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://t.me/bitopia_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                By{" "}
                <Image
                  src="/bitopia-logo-white-transparent.png"
                  alt="Bit Logo"
                  className="invert dark:invert-0"
                  width={100}
                  height={24}
                  priority
                />
              </a>
            </div>
          </div>

          <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] invert dark:invert-0 hover:shadow-xl"
              src="/bitopia-logo-white-transparent.png"
              alt="Bitopia Logo"
              width={180}
              height={40}
              priority
            />
          </div>

          <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
            <a
              href="https://t.me/bitopia_bot"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="mb-3 text-2xl font-semibold">
                Learn{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  ------&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                Learn about us!
              </p>
            </a>
          </div>
        </main>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <TelegramProvider>
      <WebApp />
    </TelegramProvider>
  )
}