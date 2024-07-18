import BottomBar from "@/components/bottom_bar";

export default function Wallet() {
    return (
        <div className="flex flex-col mt-20">
            <div className="flex justify-between items-center px-4 py-6 shadow-md">
                <h1 className="text-xl font-semibold">My Bitopia Wallet</h1>
                <img
                    src="/bitcoin_logo.png"
                    alt="Bitcoin logo"
                    className="w-8 h-8"
                />
            </div>
            <div className="flex flex-col px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Balance</h2>
                    <h2 className="text-lg font-semibold text-green-500">0.0000 BTC</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md">
                        Send
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md">
                        Receive
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md">
                        Buy Bitcoin
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-md">
                        Transaction History
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-auto px-4 py-8">
                <p className="text-gray-500 text-sm">
                    &copy; Bitopia Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
}
