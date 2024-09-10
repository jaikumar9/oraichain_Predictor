import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-card py-4 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                    <p className="text-xs text-muted-foreground">
                        © 2024 Crypto Predictor. All rights reserved.
                    </p>
                    <nav className="flex gap-4 sm:gap-6">
                        <Link className="text-xs hover:underline text-muted-foreground" to="/about">
                            About
                        </Link>
                        <Link className="text-xs hover:underline text-muted-foreground" to="/terms">
                            Terms of Service
                        </Link>
                        <Link className="text-xs hover:underline text-muted-foreground" to="/privacy">
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
                <div className="flex gap-4 justify-center">
                    <a href="#" className="text-muted-foreground hover:text-primary">
                        <FaTwitter />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                        <FaFacebook />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
