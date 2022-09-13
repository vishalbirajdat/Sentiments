import connectWalletChecker from "./connectWalletChecker"
import { ethers } from "ethers"
import data from "./data.json"

const Contract = async () => {
  let provider = await connectWalletChecker();
  if (provider) {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      data.abi,
      provider
    );
    return contract;
  } else {
   return false
  }
}


const contractProviderChecker = async ()=>{
  let contract = await Contract();
  return contract;
}

export default contractProviderChecker;