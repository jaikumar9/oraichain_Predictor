import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaCoins,
    FaLock,
    FaTwitter,
    FaFacebook,
    FaLinkedin,
} from "react-icons/fa";
import { LuLineChart } from "react-icons/lu";
import Footer from "./Footer";

const Home = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonials = [
        {
            text: "Oraichain Predictor has revolutionized how I interact with prediction markets. It's user-friendly and secure!",
            author: "Alice C., Crypto Enthusiast",
        },
        {
            text: "As a developer, I'm impressed by the seamless integration of React and CosmWasm. It's a powerful combination.",
            author: "Bob D., Blockchain Developer",
        },
        {
            text: "The decentralized nature of this dApp gives me confidence in the fairness of the prediction markets.",
            author: "Eve F., Regular User",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                    Crypto Predictor
                                </h1>
                                <p className="mx-auto max-w-[700px] md:text-xl">
                                    A decentralized prediction market platform
                                    built on Oraichain blockchain. Create,
                                    participate, and win in various prediction
                                    markets.
                                </p>
                            </div>
                            <Link
                                to="/app"
                                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800"
                            >
                                Go to App
                                <FaArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Key Features
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-3 text-center">
                                <LuLineChart className="h-12 w-12 text-black" />
                                <h3 className="text-xl font-bold">
                                    Decentralized Markets
                                </h3>
                                <p className="text-sm">
                                    Create and participate in fully
                                    decentralized prediction markets.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-3 text-center">
                                <FaLock className="h-12 w-12 text-black" />
                                <h3 className="text-xl font-bold">
                                    Blockchain Security
                                </h3>
                                <p className="text-sm">
                                    All transactions and predictions are secured
                                    on the Oraichain blockchain.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-3 text-center">
                                <FaCoins className="h-12 w-12 text-black" />
                                <h3 className="text-xl font-bold">
                                    Smart Contract Integration
                                </h3>
                                <p className="text-sm">
                                    Powered by CosmWasm smart contracts written
                                    in Rust for robust backend operations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Why We're Better
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-3 text-center">
                                <h3 className="text-xl font-bold">
                                    Unmatched Security
                                </h3>
                                <p className="text-sm">
                                    Leveraging Oraichain's robust blockchain for
                                    unparalleled security.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-3 text-center">
                                <h3 className="text-xl font-bold">
                                    True Decentralization
                                </h3>
                                <p className="text-sm">
                                    No central authority, ensuring fair and
                                    transparent markets.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-3 text-center">
                                <h3 className="text-xl font-bold">
                                    User-Centric Design
                                </h3>
                                <p className="text-sm">
                                    Intuitive interface for both novice and
                                    experienced users.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            What Users Say
                        </h2>
                        <div className="max-w-2xl mx-auto text-center">
                            <blockquote className="text-xl italic">
                                "{testimonials[currentTestimonial].text}"
                            </blockquote>
                            <p className="mt-4 font-semibold">
                                {testimonials[currentTestimonial].author}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Ready to predict the future?
                                </h2>
                                <p className="mx-auto max-w-[600px] md:text-xl">
                                    Join the Oraichain Predictor community and
                                    start participating in decentralized
                                    prediction markets today.
                                </p>
                            </div>
                            <Link
                                to="/app"
                                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800"
                            >
                                Launch App
                                <FaArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
<Footer/>
        </div>
    );
};

export default Home;
