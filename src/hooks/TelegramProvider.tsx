'use client'
import Script from "next/script";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ITelegramUser, IWebApp } from "@/types";

export interface IBitopiaData {
    bitopia_points: number;
    bitopia_friends: number[];
    level: number;
    tasks: number[];
    rank: number;
    remaining_energy: number;
}

export interface ITelegramContext {
    webApp?: IWebApp;
    user?: ITelegramUser;
    bitopiaData?: IBitopiaData | null;
    // setBitopiaData?: React.Dispatch<React.SetStateAction<IBitopiaData | null>>;
    setBitopiaData?: any;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [webApp, setWebApp] = useState<IWebApp | null>(null)
    const [bitopiaData, setBitopiaData] = useState<IBitopiaData | null>(null)

    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            app.ready();
            setWebApp(app);
        }
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            if (webApp?.initDataUnsafe.user) {
                const user = webApp.initDataUnsafe.user;
                const response = await fetch('/api/userData', {
                    method: 'POST',
                    body: JSON.stringify({
                        tg_id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        username: user.username,
                        language_code: user.language_code,
                        photo_url: user.photo_url,
                    })
                })
                if (response.ok) {
                    webApp?.showAlert('Loaded sucessfully');
                    const data = await response.json();
                    const u_data = data.userData
                    setBitopiaData({
                        bitopia_points: u_data.bitopia_points,
                        bitopia_friends: u_data.bitopia_friends,
                        level: u_data.level,
                        tasks: u_data.tasks,
                        rank: u_data.rank,
                        remaining_energy: u_data.remaining_energy,
                    })
                } else {
                    webApp?.showAlert('Something failed to load. Please, reload.')
                    console.error('Something failed fetching data...')
                }
            }
        }

        if (webApp) {
            fetchUserData()
        }
    }, [webApp])

    const value = useMemo(() => {
        return webApp
            ? {
                webApp,
                unsafeData: webApp.initDataUnsafe,
                user: webApp.initDataUnsafe.user,
                bitopiaData,
                setBitopiaData,
            }
            : {};
    }, [webApp, bitopiaData]);

    return (
        <TelegramContext.Provider value={value}>
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
            />
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);