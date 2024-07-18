import BottomBar from "@/components/bottom_bar";

export default function Leaderboard() {
    const leaderboardData = [
        { name: "Olivia Rodriguez", rank: 1, profileUrl: "" },
        { name: "William Smith", rank: 2, profileUrl: "" },
        { name: "Ava Johnson", rank: 3, profileUrl: "" },
        { name: "Noah Miller", rank: 4, profileUrl: "" },
        { name: "Mia Garcia", rank: 5, profileUrl: "" },
        { name: "Elijah Brown", rank: 6, profileUrl: "" },
        { name: "Sophia Hernandez", rank: 7, profileUrl: "" },
        { name: "Lucas Jones", rank: 8, profileUrl: "" },
        { name: "Isabella Davis", rank: 9, profileUrl: "" },
        { name: "Benjamin Williams", rank: 10, profileUrl: "" },
        { name: "Charlotte Garcia", rank: 11, profileUrl: "" },
        { name: "Matthew Moore", rank: 12, profileUrl: "" },
        { name: "Emily Jones", rank: 13, profileUrl: "" },
        { name: "Daniel Hernandez", rank: 14, profileUrl: "" },
        { name: "Sophia Anderson", rank: 15, profileUrl: "" },
        { name: "Michael Brown", rank: 16, profileUrl: "" },
        { name: "Evelyn Miller", rank: 17, profileUrl: "" },
        { name: "Joseph Garcia", rank: 18, profileUrl: "" },
        { name: "Ashley Davis", rank: 19, profileUrl: "" },
        { name: "David Williams", rank: 20, profileUrl: "" },
        { name: "You", rank: 21, profileUrl: "" },
    ];


    return (
        <div className="mt-20">
            <div className="text-center p-2 pt-4 bg-slate-800 text-xs">See how you rank against other top earners</div>
            <div className="flex flex-col justify-center items-center gap-4 px-4 py-8 mb-20 bg-gradient-to-br from-gray-800 to-gray-900">
                {leaderboardData.map((user) => (
                    <LeaderboardCard key={user.name} user={user} />
                ))}
            </div>
        </div>
    );
}


const LeaderboardCard = ({ user }: { user: any }) => {
    const profileStyle = user.profileUrl
        ? { backgroundImage: `url(${user.profileUrl})` }
        : { background: `linear-gradient(to right, #${Math.floor(Math.random() * 16777215).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})` };

    return (
        <div
            className={`flex items-center rounded-full p-1 px-2 shadow-violet-400/30 shadow-2xl w-full border border-gray-600 backdrop-blur-xl`}
        >
            <div className="relative overflow-hidden rounded-full w-12 h-12 mr-4" style={profileStyle}>
                {/* Show initials if no profile picture */}
                {!user.profileUrl && (
                    <span className="text-white text-sm font-bold absolute inset-0 flex justify-center items-center">
                        {user.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-lg">{user.name}</h3>
                <span className="text-gray-400 text-sm">Rank: {user.rank}</span>
            </div>
        </div>
    );
};
