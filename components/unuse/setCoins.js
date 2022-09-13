
const setCoins = async () => {
    const contractSigner = await contractSignerChecker();
    if (contractSigner) {
        try {


            console.log("loading SHIB......");
            const SHIB = await contractSigner.setCoin("SHIB");
            console.log("please wait a transaction pending .....");
            await SHIB.wait();
            console.log("transcation is completed");

            console.log(await contractSigner.coinsArray(0));

            console.log("loading ETH......");
            const ETH = await contractSigner.setCoin("ETH");
            console.log("please wait a transaction pending .....");
            await ETH.wait();
            console.log("transcation is completed");

            console.log(await contractSigner.coinsArray(1));

            console.log("loading MATIC ......");
            const eth = await contractSigner.setCoin("MATIC");
            console.log("please wait a transaction pending .....");
            await eth.wait();
            console.log("transcation is completed");

            console.log(await contractSigner.coinsArray(2));

            console.log("loading BTC......");
            const BTC = await contractSigner.setCoin("BTC");
            console.log("please wait a transaction pending .....");
            await BTC.wait();
            console.log("transcation is completed");

            console.log(await contractSigner.coinsArray(3));


            console.log("loading DOGE ......");
            const DOGE = await contractSigner.setCoin("DOGE");
            console.log("please wait a transaction pending .....");
            await DOGE.wait();
            console.log("transcation is completed");

            console.log(await contractSigner.coinsArray(4));

            console.log("loading BABYDOGE ......");
            const BABYDOGE = await contractSigner.setCoin("BABYDOGE");
            console.log("please wait a transaction pending .....");
            await BABYDOGE.wait();
            console.log("transcation is completed");

            console.log(await contractSigner.coinsArray(5));

            console.log("Success");
        } catch (error) {
            console.log(error);
        }
    }
}
