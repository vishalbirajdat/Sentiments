import React, { useEffect, useState } from "react";
import style from "../styles/coin.module.css";

function Coin({ perc, token, vote}) {

    const [color, setColor] = useState();
    const [isHovering, setIsHovering] = useState(false);
    const [isVoting, setIsVoting] = useState(false);
    const [perData, setPerData] = useState(perc);

    useEffect(() => {
        if ((perData.avrg * 100) < 50) {
            setColor("#c43d08");
        } else {
            setColor("green");
        }
    }, [perData]);




    const setVoteUp = async (e)=>{
        e.preventDefault();
        setIsVoting(true);
        const voted = await vote(token, 1);
        if (voted) {
            const newUp = perData.up + 1;
            const down = perData.down;
            const sum = newUp + down;
            const avrg = newUp/sum;
            setPerData({
                up:newUp,
                down:down,
                avrg:avrg
            })
        }
        setIsVoting(false);
    }

    const setVoteDown = async (e)=>{
        e.preventDefault();
        setIsVoting(true);
        const voted = await vote(token,0);
        if (voted) {
            const newDown = perData.down + 1;
            const up = perData.up;
            const sum = up + newDown;
            const avrg = up / sum;
            setPerData({
                up: up,
                down: newDown,
                avrg: avrg
            })
        }
        setIsVoting(false);
    }

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }


 
    return (
        <>
            <div>
                {
                    isVoting ? <div className={style.avtarToken} >
                     <div>
                        <img src="/avtar.gif"  alt="avtar" width={"50px"} />
                    </div> 
                    </div>:
                        isHovering ?
                            <div className={style.avtarToken} > 
                            <div><img src="/avtar.gif"  alt="avtar" width={"50px"} />
                         </div> 
                         </div> 
                         :
                <div className={style.token} >{token}</div>
                }

                <div className={style.circle} onMouseEnter={handleMouseOver} 
                    onMouseLeave={handleMouseOut} style={{ boxShadow: `0 0 20px ${color}` }}>
                    <div
                        className={style.wave}
                        style={{
                            marginTop: `${(1 - perData.avrg)* 100}%`,
                            boxShadow: `0 0 20px ${color}`,
                            backgroundColor: isHovering ? "#000015" : color,
                        }}
                    ></div>

                  
                    <div className={style.percentage} >

                        {isVoting ? <>
                            <div className={style.pendingTitle}>Pending...</div>
                            <div className={style.pendingMessage}>It take only 30s</div>
                            </> : 
                            isHovering ?  (
                            <div className={style.votes}>
                                    <div className={style.up} onClick={setVoteUp}>Up ({perData.up})</div>
                                    <div className={style.down} onClick={setVoteDown}>Down ({perData.down})</div>
                        </div>
                            ) : (
                                    <div className={style.perc}>{parseInt(perData.avrg * 100)}%</div>
                            )


                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Coin;