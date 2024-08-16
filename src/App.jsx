import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
    const handleWallet = () => {
        window.onload = async () => {
            if (!window.owallet) {
                alert("Please install owallet extension");
            } else {
                const chainId = "Oraichain";
                await window.owallet.enable(chainId);
            }
        };
    };

    return (
        <>
            <div className="bg-background text-foreground min-h-screen flex flex-col">
                <header className="bg-card py-4 shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <a className="text-2xl font-bold" href="#">
                                Crypto Predictor
                            </a>
                            <nav className="hidden md:flex items-center gap-4">
                                <a
                                    className="text-primary-foreground hover:text-primary"
                                    href="#"
                                >
                                    Leaderboard
                                </a>
                                <a
                                    className="text-primary-foreground hover:text-primary"
                                    href="#"
                                >
                                    How to Play
                                </a>
                                <a
                                    className="text-primary-foreground hover:text-primary"
                                    href="#"
                                >
                                    Supported Tokens
                                </a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3"
                                onClick={handleWallet}
                            >
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 py-10">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PredictionCard
                            name="Bitcoin"
                            symbol="BTC"
                            price="29,500"
                            timeFrame="1 minute"
                        />
                        <PredictionCard
                            name="Ethereum"
                            symbol="ETH"
                            price="1,800"
                            timeFrame="3 minutes"
                        />
                    </div>
                </main>
                <footer className="bg-card py-4 shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="text-muted-foreground">
                            © 2024 Crypto Predictor. All rights reserved.
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                className="text-muted-foreground hover:text-primary"
                                href="#"
                            >
                                Terms of Service
                            </a>
                            <a
                                className="text-muted-foreground hover:text-primary"
                                href="#"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

function PredictionCard({ name, symbol, price, timeFrame }) {
    const [betAmount, setBetAmount] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Select Currency");
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-card rounded-lg shadow-md p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    {name} ({symbol})
                </h2>
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-muted-foreground"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-muted-foreground">{timeFrame}</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">${price}</div>
                <div className="flex items-center gap-2">
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                        Predict Higher
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                        Predict Lower
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Locked Price</div>
                <div className="text-muted-foreground">
                    Time Remaining: ${timeFrame}
                </div>
            </div>
            <div
                data-orientation="horizontal"
                role="none"
                className="shrink-0 bg-border h-[1px] w-full"
            ></div>
            <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Your Bet</div>
                <div className="flex items-center gap-2">
                    <input
                        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-24 text-right"
                        placeholder="Enter amount"
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                    />

                    <div
                        ref={dropdownRef}
                        className="relative inline-block text-left"
                    >
                        <button
                            onClick={toggleDropdown}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md focus:outline-none"
                        >
                            {selectedOption}
                        </button>
                        {isOpen && (
                            <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                                <button
                                    onClick={() => selectOption("USDC")}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    USDC
                                </button>
                                <button
                                    onClick={() => selectOption("USDT")}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    USDT
                                </button>
                                <button
                                    onClick={() => selectOption("BTC")}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    BTC
                                </button>
                                <button
                                    onClick={() => selectOption("ORAI")}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    ORAI
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                Place Bet
            </button>
        </div>
    );
}

export default App;
