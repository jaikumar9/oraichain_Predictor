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
    const index = data.findIndex(item => item.name === symbol);
    if (index !== -1) {
        data[index].price = newPrice;
    }
}

export { randomPrice, data,updateDataPrice };
