const checkWallet = () => {
  if (typeof window.ethereum !== 'undefined') {
    return true;
  } else {
    windows.alert("Install Metamask Wallet");
    return false;
  }
}

export default checkWallet;