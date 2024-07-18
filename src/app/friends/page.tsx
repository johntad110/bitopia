import BottomBar from "@/components/bottom_bar";
import { Friend } from "@/types";

const friendsData: Friend[] = [
    { name: "Olivia Rodriguez", level: 7, coins: 2540, bonusPercentage: 5 },
    { name: "William Smith", level: 3, coins: 870, bonusPercentage: 15 },
    { name: "Ava Johnson", level: 10, coins: 4200, bonusPercentage: 8 },
    { name: "Noah Miller", level: 5, coins: 1350, bonusPercentage: 10 },
    { name: "Mia Garcia", level: 8, coins: 3100, bonusPercentage: 3 },
    { name: "Elijah Brown", level: 2, coins: 520, bonusPercentage: 20 },
    { name: "Sophia Hernandez", level: 9, coins: 3800, bonusPercentage: 7 },
    { name: "Lucas Jones", level: 4, coins: 1080, bonusPercentage: 12 },
    { name: "Isabella Davis", level: 6, coins: 1890, bonusPercentage: 9 },
    { name: "Benjamin Williams", level: 8, coins: 3400, bonusPercentage: 4 },
    { name: "Charlotte Garcia", level: 1, coins: 250, bonusPercentage: 25 },
    { name: "Matthew Moore", level: 3, coins: 750, bonusPercentage: 18 },
];

export default function Friends() {
    return (
        <div className="flex flex-col mt-20">
            <h1 className="text-center p-2 pt-4 bg-slate-800 text-xs">When your friend is more active you get more bonus</h1>
            <div className="h-full w-full flex flex-wrap gap-4 justify-center items-center p-4 mb-20">
                {friendsData.slice(0, 12).map((friend) => (
                    <FriendCard key={friend.name} friend={friend} />
                ))}
            </div>
        </div>
    );
}

const FriendCard = ({ friend }: { friend: Friend }) => {
    const profileStyle = friend.profileUrl
        ? { backgroundImage: `url(${friend.profileUrl})` }
        : { background: `linear-gradient(to right, #${Math.floor(Math.random() * 16777215).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})` };

    return (
        <div className="flex flex-col bg-transparent rounded-xl border border-gray-600 px-4 py-2 shadow-2xl shadow-purple-500/30 w-full">
            <div className="flex justify-between items-center">
                <div className="relative overflow-hidden rounded-full w-16 h-16" style={profileStyle}>
                {/* Show initials if no profile picture */}
                {!friend.profileUrl && (
                    <span className="text-white text-xl font-bold absolute inset-0 flex justify-center items-center">
                        {friend.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
            <h3 className="text-lg font-semibold text-center text-white">{friend.name}</h3></div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Level: {friend.level}</span>
                <span className="text-green-400 font-bold">
                    {friend.coins} Coins
                </span>
            </div>
            <div className="text-gray-400 text-sm">
                Your Bonus: {friend.bonusPercentage}% ({friend.bonusPercentage * 10} Coins)
            </div>
        </div>
    );
};