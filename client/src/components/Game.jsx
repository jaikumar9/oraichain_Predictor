import React, { useState } from "react";
import { connectWallet } from "../utils";
import Bet from "./Bet";
import Footer from "./Footer";
import { useContract } from "../hooks/useContract";

function Game() {
    const [connectionStatus, setConnectionStatus] = useState("disconnected");
    const { address } = useContract();

    const handleConnectWallet = async () => {
        setConnectionStatus("connecting");
        try {
            await connectWallet();
            setConnectionStatus("connected");
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            setConnectionStatus("disconnected");
        }
    };

    return (
        <>
            <div className="bg-background text-foreground min-h-screen flex flex-col">
                <header className="bg-card py-4 shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <a className="text-2xl font-bold" href="/">
                                Crypto Predictor
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 h-10 rounded-full px-6 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                onClick={handleConnectWallet}
                                disabled={
                                    connectionStatus === "connecting" ||
                                    connectionStatus === "connected"
                                }
                            >
                                <span className="mr-2">🔗</span>
                                {connectionStatus === "disconnected" &&
                                    "Connect Wallet"}
                                {connectionStatus === "connecting" &&
                                    "Connecting..."}
                                {connectionStatus === "connected" &&
                                    `Connected: ${
                                        address
                                            ? `${address.slice(
                                                  0,
                                                  6
                                              )}...${address.slice(-4)}`
                                            : ""
                                    }`}
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <Bet />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Game;
