const data = [
    { id: 1, name: "Bitcoin", price: 50000 },
    { id: 2, name: "Ethereum", price: 2500 },
    { id: 3, name: "Solana", price: 150 },
    { id: 4, name: "BNB", price: 500 },
];

function randomPrice(currentPrice) {
    const sign = Math.random() < 0.5 ? -1 : 1;
    const value = Math.random();
    const newPrice = currentPrice + sign * value;

    return Math.max(0, newPrice);
}

function updateDataPrice(symbol, newPrice) {
<<<<<<< HEAD
    const index = data.findIndex(item => item.name === symbol);
=======
    const index = data.findIndex((item) => item.name === symbol);
>>>>>>> ad1779e138ae6b6e2f8b8729473b8d793121466e
    if (index !== -1) {
        data[index].price = newPrice;
    }
}

<<<<<<< HEAD
export { randomPrice, data,updateDataPrice };
=======
export { randomPrice, data, updateDataPrice };
>>>>>>> ad1779e138ae6b6e2f8b8729473b8d793121466e
