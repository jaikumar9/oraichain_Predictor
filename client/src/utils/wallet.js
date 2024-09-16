const connectWallet = async () => {
    if (!window.keplr) {
        throw new Error("Please install Keplr extension");
    }

<<<<<<< HEAD
    const chainId = "injective-1";
=======
    const chainId = "osmo-test-5";
>>>>>>> ad1779e138ae6b6e2f8b8729473b8d793121466e
    const keplr = await getKeplr();

    if (keplr) {
        await keplr.enable(chainId);
        console.log("Connected to Keplr with chain ID:", chainId);
    } else {
        throw new Error("Keplr not found.");
    }

    function getKeplr() {
        if (window.keplr || document.readyState === "complete") {
            return Promise.resolve(window.keplr);
        }

        return new Promise((resolve) => {
            const documentStateChange = (event) => {
                if (event.target && event.target.readyState === "complete") {
                    resolve(window.keplr);
                    document.removeEventListener(
                        "readystatechange",
                        documentStateChange
                    );
                }
            };

            document.addEventListener("readystatechange", documentStateChange);
        });
    }

    getKeplr().then(async (keplr) => {
        if (keplr) {
            await keplr.enable(chainId);
            console.log("Connected to Keplr with chain ID:", chainId);
        } else {
            console.error("Keplr not found.");
        }
    });
};

export { connectWallet };
