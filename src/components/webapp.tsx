import { TelegramProvider, useTelegram } from "@/hooks/TelegramProvider";
import Image from "next/image";

const WebAppp = () => {
    const { user, webApp } = useTelegram();
    console.log(user);

    return (
        <div>
            {user ? (
                <div
                    className="fixed left-0 top-0 flex w-full justify-center items-center border border-gray-100 bg-gradient-to-b from-pink-400 p-4 m-8 backdrop-blur-2xl"
                >
                    <h1>Welcome {user?.username}</h1>
                    User data:
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                    Entire Web App data:
                    <pre>{JSON.stringify(webApp, null, 2)}</pre>
                </div>
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
    )
}

export const WithTelegramProvider = () => {
    return (
        <TelegramProvider>
            <WebAppp />
        </TelegramProvider>
    );
};