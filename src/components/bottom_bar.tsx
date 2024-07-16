import { FaHome, FaTasks, FaUserFriends, FaWallet } from "react-icons/fa";
import { FaPeoplePulling, FaRankingStar } from "react-icons/fa6";
import './component_styles.css';
import Link from "next/link";

export default function BottomBar() {
    return (
        <div className="w-full mb-2 bg-gray-200 rounded-2xl dark:bg-gray-100/10 flex justify-around items-center gap-1 text-xl">
            <Link
                href="/"
                className="bottom-bar-icons"
            >
                <FaHome />
                <p>Home</p>
            </Link>
            <Link href="/tasks" className="bottom-bar-icons">
                <FaTasks />
                <p>Tasks</p>
            </Link>
            <Link href="/friends" className="bottom-bar-icons">
                <FaPeoplePulling />
                <p>Friends</p>
            </Link>
            <Link href="/leaderboard" className="bottom-bar-icons">
                <FaTasks />
                <p>Leaderboard</p>
            </Link>
            <Link href="/wallet" className="bottom-bar-icons">
                <FaTasks />
                <p>Wallet</p>
            </Link>
        </div>
    )
}