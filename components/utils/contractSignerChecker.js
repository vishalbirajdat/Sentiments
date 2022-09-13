import connectWalletChecker from "./connectWalletChecker"
import { ethers } from "ethers"
import data from "./data.json"

const Contract = async () => {
  let provider = await connectWalletChecker();
  if (provider) {
    let walletSigner = await provider.getSigner()
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      data.abi,
      walletSigner
    );
    return contract;
  } else {
    return false
  }
}


const contractSignerChecker = async () => {
  let contract = await Contract();
  return contract;
}

export default contractSignerChecker;