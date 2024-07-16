import BottomBar from "@/components/bottom_bar";
import { Task } from "@/types";


const tasks: Task[] = [
    {
        image: "/images/task_checkin.png", // Replace with your image path
        title: "Daily Check-In",
        description: "Earn rewards by checking in daily. Consistency is key!",
        reward: 50,
    },
    {
        image: "/images/task_quiz.png", // Replace with your image path
        title: "Complete a Quiz",
        description:
            "Test your knowledge about Bitcoin and cryptocurrencies. Complete the quiz and earn rewards.",
        reward: 100,
    },
    {
        image: "/images/task_invite.png", // Replace with your image path
        title: "Invite a Friend",
        description:
            "Invite a friend to join Bitopia. Earn rewards for each successful referral.",
        reward: 200,
    },
    {
        image: "/images/task_transaction.png", // Replace with your image path
        title: "Transaction Challenge",
        description:
            "Make a Bitcoin transaction using Bitopia. It can be as simple as sending a small amount to another user.",
        reward: 150,
    },
    {
        image: "/images/task_game.png", // Replace with your image path
        title: "Complete a Game Level",
        description:
            "Reach a certain level in the tap-to-earn game within Bitopia. Levels increase in difficulty, offering bigger rewards.",
        reward: 250,
    },
];

export default function TaskPage() {
    return (
        <div className="flex flex-col">
            <div className="h-full w-full flex flex-wrap gap-4 justify-center items-center p-4">
                {tasks.map((task) => (
                    <TaskCard key={task.title} task={task} />
                ))}
            </div>
            <div className="fixed bottom-0">
                <BottomBar />
            </div>
        </div>
    );
}

const TaskCard = ({ task }: { task: Task }) => {
    return (
        <div className="flex flex-col bg-gray-600/50 rounded-lg p-4 shadow-md w-48">
            <img src={task.image} alt={task.title} className="w-full self-center mb-2 rounded-lg" />
            <h3 className="text-md font-semibold">{task.title}</h3>
            <p className="text-gray-600 mb-2 text-xs">{task.description}</p>
            <div className="flex items-center text-sm">
                <span className="text-green-500 font-bold mr-2">Reward:</span>
                <span className="text-[10px]">{task.reward} Bitopia Coins</span>
            </div>
        </div>
    );
};
