import { useState } from "react";
import { FaInfoCircle, FaDollarSign, FaTrophy } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { data } from "../utils/price.js";

export default function Bet() {
    const [betAmount, setBetAmount] = useState("");
    const [selectedCrypto, setSelectedCrypto] = useState(data[0]);
    const [hasBet, setHasBet] = useState(false);
    const betDuration = 5; // 5 minutes

    const handleBetAmountChange = (e) => {
        setBetAmount(e.target.value);
    };

    const handleBet = (direction) => {
        console.log(
            `Placed a ${direction} bet of ${betAmount} ${selectedCrypto.name}`
        );
        setHasBet(true);
    };

    return (
        <div className="w-full max-w-md mx-auto border p-4 rounded-lg bg-white shadow-md">
            <div className="border-b border-gray-300 pb-4 mb-4">
                <div className="text-sm font-normal flex items-center justify-between">
                    Play on next round
                    <div className="relative group">
                        <FaInfoCircle className="h-4 w-4 text-gray-500" />
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white text-black text-xs rounded p-2 shadow-lg">
                            Information about playing on the next round
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-lg mb-2 font-semibold">
                    How much do you want to bet?
                </h2>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 text-white">
                            <FaDollarSign />
                        </div>
                        <select
                            value={selectedCrypto.id}
                            onChange={(e) =>
                                setSelectedCrypto(
                                    data.find(
                                        (c) => c.id === parseInt(e.target.value)
                                    )
                                )
                            }
                            className="p-2 border rounded"
                        >
                            {data.map((crypto) => (
                                <option key={crypto.id} value={crypto.id}>
                                    {crypto.name}
                                </option>
                            ))}
                        </select>
                        <FaArrowRightArrowLeft className="h-4 w-4 ml-2 text-gray-500" />
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold mr-2">
                            Price:{" "}{selectedCrypto.price}
                        </span>
                        <span className="text-gray-500">Balance: 0</span>
                    </div>
                </div>
                <input
                    type="number"
                    value={betAmount}
                    onChange={handleBetAmountChange}
                    placeholder="Enter bet amount"
                    className="w-full p-2 mb-4 border rounded"
                />

                <div className="flex items-center justify-between mb-4">
                    <span>Ranking impact</span>
                    <div className="flex items-center">
                        <span className="text-yellow-500">
                            + 200 <FaTrophy className="inline-block" />
                        </span>
                        <span className="text-gray-500 ml-1">
                            (+ 200 🏆 if won)
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-green-500">UP odds</span>
                            <span>x 1</span>
                        </div>
                        <button
                            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                            onClick={() => handleBet("up")}
                            disabled={hasBet}
                        >
                            BET UP
                        </button>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-red-500">DOWN odds</span>
                            <span>x 1</span>
                        </div>
                        <button
                            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            onClick={() => handleBet("down")}
                            disabled={hasBet}
                        >
                            BET DOWN
                        </button>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span>Pool size</span>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mr-1 text-white">
                                <FaDollarSign />
                            </div>
                            <span>0.22</span>
                        </div>
                    </div>
                    <div className="text-center text-gray-500">
                        You didn't bet on this round
                    </div>
                    <div className="flex justify-between mt-2">
                        <div>
                            <div>UP odds</div>
                            <div>x 1.98</div>
                        </div>
                        <div className="text-right">
                            <div>DOWN odds</div>
                            <div>x 1.65</div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center text-gray-500">
                    Bet Duration: {betDuration} minutes
                </div>
            </div>
        </div>
    );
}
