import React, { useState, useEffect } from "react";
import style from "../styles/app.module.css";
import Coin from "../components/Coin";
import { ethers } from "ethers"
import connectWalletChecker from "../components/utils/connectWalletChecker";
import contractSignerChecker from "../components/utils/contractSignerChecker";

import data from "../components/utils/data.json"
import { TOASTS } from "../components/utils/constants";
import toastFunction from "../components/utils/spinners.js/ToastShow";

const Index = () => {

  const [btc, setBtc] = useState(null);
  const [eth, setEth] = useState(null);
  const [matic, setMatic] = useState(null);

  const [shib, setShib] = useState(null);
  const [doge, setDoge] = useState(null);
  const [babyDoge, setBabydoge] = useState(null);

  const [address, setAddress] = useState(null)
  const [showing, setShowing] = useState(false)

  const [loadingPerc, setLoadingPerc] = useState({
    "perc": 10,
    "title": "BTC",
    "num": 1
  })




  useEffect(() => {
    try {
      ethereum?.on("accountsChanged", AccountChanged);
      return () => {
        ethereum?.removeListener("accountsChanged", AccountChanged);
      };
    } catch (e) {
      console.log(e.message);
     
    }
  });



  const AccountChanged = async () => {
    toastFunction(TOASTS.INFO, "Wallet changed");
    await connectWallet();
  }




  const connectWallet = async () => {
    try {
      toastFunction(TOASTS.INFO, "Connecting....");
      let provider = await connectWalletChecker();
      if (provider) {
        const wallet = await provider.getSigner();
        let addressCheck = await wallet.getAddress();
        setAddress(addressCheck);
        toastFunction(TOASTS.SUCCESS, "Wallet Connected");
      }
    } catch (error) {
      console.log("Wallet Connectio Error ...", error.message);
      toastFunction(TOASTS.WARNING, "Something went wrong");
    }

  }


  const voteToCoin = async (_token, _updown) => {
    console.log(_token, _updown);
    try {
    if (address) {
      const contractSigner = await contractSignerChecker();
      if (contractSigner) {
        try {
           toastFunction(TOASTS.INFO, "loading....");
          const k = await contractSigner.setVote(_token, _updown);
          toastFunction(TOASTS.INFO, "Transaction is in pending....");
          toastFunction(TOASTS.INFO, " Please wait ...");
          await k.wait();
           toastFunction(TOASTS.SUCCESS, "Successfully voted");
          return k;
        } catch (error) {
          console.log("error", error.message);
          toastFunction(TOASTS.WARNING, "Something went wrong");
          toastFunction(TOASTS.WARNING, "Please add some gas fee in wallet to work");
          return false
        }
      }
    } else {
      connectWallet();
    }
    } catch (error) {
      toastFunction(TOASTS.WARNING, "Something went wrong");
      return false;
    }
  }





  const getUpDownData = async (_coin) => {

    const providerLink = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_PROVIDER_HTTP_URL
    );



    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      data.abi,
      providerLink // use link also for first event checks and work on it
    );

    let [getup, getDown] = await contract.getCoinUpDown(_coin);
    console.log("it is up ", parseInt(getup._hex, 16));
    console.log("it is down ", parseInt(getDown._hex, 16));

    let up = parseInt(getup._hex, 16)
    let down = parseInt(getDown._hex, 16)
    if (!up) {
      up = 0
    }
    if (!down) {
      down = 0
    }
    console.log("up and down", up, down);
    if (up != 0 || down != 0) {
      let sum = up + down;
      let avrg = up / sum;

      console.log(avrg * 100);
      return { up: up, down: down, avrg: avrg };
    }
    else {
      return { up: 0, down: 0, avrg: 0 };
    }
  }





  const contractEvent = async () => {


    setLoadingPerc(
      {
        "perc": (1 * 100) / 6,
        "title": "BTC",
        "num": 1
      }
    )
    setBtc(await getUpDownData("BTC"));

    setLoadingPerc(
      {
        "perc": (2 * 100) / 6,
        "title": "ETH",
        "num": 2
      }
    )
    setEth(await getUpDownData("ETH"));

    setLoadingPerc(
      {
        "perc": (3 * 100) / 6,
        "title": "MATIC",
        "num": 3
      }
    )

    setMatic(await getUpDownData("MATIC"));

    setLoadingPerc(
      {
        "perc": (4 * 100) / 6,
        "title": "SHIB",
        "num": 4
      }
    )
    setShib(await getUpDownData("SHIB"));
    setLoadingPerc(
      {
        "perc": (5 * 100) / 6,
        "title": "DOGE",
        "num": 5
      }
    )

    setDoge(await getUpDownData("DOGE"));

    setLoadingPerc(
      {
        "perc": (5.99 / 6) * 100,
        "title": "BABYDOGE",
        "num": 6
      }
    )
    setBabydoge(await getUpDownData("BABYDOGE"));


    setShowing(true);

  }


  useEffect(() => {
    contractEvent();
  }, [])



  return (
    <>
      {showing ?
        <>
          <div className={style.header}>
            <div className={style.logo}>
              <img src={"/avtar.gif"} alt="logo" height="50px" />
              Sentiments
            </div>

            {address ? <div className={style.connectwalletTrue} >Connected</div> : <div> <button className={style.connectwallet} onClick={connectWallet}>Wallet</button> </div>}


          </div>

          <div className={style.instructions}>
            Where do you think these tokens are going? Up or Down?
          </div>




          <div className={style.list}>
            <Coin
              token={"BTC"}
              vote={voteToCoin}
              perc={btc}
            />
            <Coin
              token={"ETH"}
              vote={voteToCoin}
              perc={eth}
            />
            <Coin
              token={"MATIC"}
              vote={voteToCoin}
              perc={matic}
            />



          </div>


          <div className={style.list}>
            <Coin
              token={"SHIB"}
              vote={voteToCoin}
              perc={shib}
            />
            <Coin
              token={"DOGE"}
              vote={voteToCoin}
              perc={doge}
            />
            <Coin
              token={"BABYDOGE"}
              vote={voteToCoin}
              perc={babyDoge}
            />



          </div>
        </>
        :
        <div className={style.loadingBox}>

          <div className={style.loadingTitle}>
            <div>Collecting Data ({loadingPerc.num}/6) ...</div>
            <div>{loadingPerc.title} </div>
          </div>

          <div className={style.loadingCircle}>
            <div
              className={style.loadingWave}
              style={{
                marginTop: `${100 - loadingPerc.perc}%`,
              }}
            ></div>


            <div className={style.loadingPercentage} >

              {parseInt(loadingPerc.perc)} %
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Index;
