'use client'
import { useTelegram } from "@/hooks/TelegramProvider";

export function Status() {
    const { user, webApp, bitopiaData } = useTelegram();

    return (
        <div className="w-full p-1 mt-2 flex flex-col justify-between gap-10 border-2 border-white dark:border-gray-500 rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-400/50 backdrop-blur-sm">
            <div className="flex gap-2 items-center">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-600 to-yellow-300 dark:bg-slate-200 object-cover">
                    <img src={user?.photo_url} alt="" />
                </div>
                <div className="w-full">
                    <h1>{user?.first_name || '---'} (#{user?.id || '---'})</h1>
                    <div className="w-full flex items-center justify-between">
                        <div className="h-2 w-20 bg-white dark:bg-gray-300 rounded-full overflow-hidden">
                            <div
                                className={`h-2 bg-green-500`}
                                style={{ width: `${bitopiaData ? 100 - (bitopiaData.remaining_energy / 500 * 100) : 0}%` }}
                            ></div>
                        </div>
                        <h1 className="text-[12px]">Level {bitopiaData?.level || '---'} ({bitopiaData ? 500 - bitopiaData.bitopia_points : '---'} points to level up)</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}