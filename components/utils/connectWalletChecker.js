import checkWallet from "./checkWallet"
import { ethers } from "ethers"


const network = {
    polygon: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon Testnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimal: 18
        },
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
    },
};



const connectWallet = async () => {
    if (checkWallet) {

        try {

            // const providerWallet = await new ethers.providers.Web3Provider(await window.ethereum, "any");

            const providerWallet = await new ethers.providers.Web3Provider(window.ethereum);
            await providerWallet.send('eth_requestAccounts', []);

            if (providerWallet.network != 'matic') {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            ...network['polygon']
                        }
                    ]
                })

            }
            return providerWallet

        } catch (error) {
            try {
                const providerWallet = await new ethers.providers.Web3Provider(window.ethereum);
                await providerWallet.send('eth_requestAccounts', []);

                if (providerWallet.network != 'matic') {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                ...network['polygon']
                            }
                        ]
                    })}
                return providerWallet
            } catch (error) {
                return false
            }
        }

    }
}

const connectWalletChecker = async () => {
    let provider = await connectWallet();
    return provider;
}




export default connectWalletChecker;