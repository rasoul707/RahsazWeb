import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toFarsiNumber, toToman } from "Utils/helperFunction";

const CountDown = ({ className ,timeDone,setTimeDone,seconds,setSeconds}) => {

  useEffect(() => {
    let timer;
    if (seconds) {
      timer = setInterval(() => {
        setSeconds(pre => pre - 1);
      }, 1000);
    }
    if (seconds==0) {
      setTimeDone(true)
    }

    return () => {
      clearInterval(timer);
    };
  }, [seconds,timeDone]);

  return <div className={className}>{` ${toFarsiNumber('00')}:${seconds?.toLocaleString("fa-IR")}`}</div>;
};

export default CountDown;
