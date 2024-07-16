export interface ITelegramUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    photo_url: string;
}

export interface IWebApp {
    initData: string;
    initDataUnsafe: {
        query_id: string;
        user: ITelegramUser;
        auth_date: string;
        hash: string;
    };
    version: string;
    platform: string;
    colorScheme: string;
    themeParams: {
        link_color: string;
        button_color: string;
        button_text_color: string;
        secondary_bg_color: string;
        hint_color: string;
        bg_color: string;
        text_color: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    isClosingConfirmationEnabled: boolean;
    headerColor: string;
    backgroundColor: string;
    BackButton: {
        isVisible: boolean;
    };
    MainButton: {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isProgressVisible: boolean;
        isActive: boolean;
    };
    HapticFeedback: any;
    openTelegramLink: Function;
    showAlert: Function;
}

export interface data {
    tg_id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    photo_url: string;
    bitopia_points: number;
    bitopia_friends: number[];
    level: number;
    tasks: number[];
    rank: number;
}

export interface Task {
    image: string;
    title: string;
    description: string;
    reward: number;
}

export interface Friend {
    name: string;
    profileUrl?: string;
    level: number;
    coins: number;
    bonusPercentage: number;
}