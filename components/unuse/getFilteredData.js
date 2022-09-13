const getFilteredData = async (_coin) => {

    const providerLink = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_PROVIDER_URL
    );



    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        process.env.NEXT_PUBLIC_ABI,
        providerLink // use link also for first event checks and work on it
    );

    let getallFilteredCoin = contract.filters.CoinDetails();
    if (_coin) {
        getallFilteredCoin = contract.filters.CoinDetails("SHIB", null, null, null);
    }
    const getCoins = await contract.queryFilter(getallFilteredCoin);
    const getCoin = getCoins.map((e) => {
        return {
            coin: e.args.coin,
            user: e.args.user,
            up: e.args.up,
            down: e.args.down,
        }
    });

    return getCoin
}