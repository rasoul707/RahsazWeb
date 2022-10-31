import React from "react";
import TikIcon from "Assets/img/icons/green-tik.svg";
import { makeStyles } from "@material-ui/styles";
import { Button } from "Components/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { toFarsiNumber } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
    "& span": {
      display: "flex",
      alignItems: "center",
    },
    "& h2": {
      ...theme.font.s18w700,
    },
    "& p": {
      display: "flex",
      gap: "8px",
      "& span": {
        color: "#1F75F6",
      },
    },
  },
}));

const Step5 = () => {
  const classes = useStyles();
  const router = useRouter();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let counter;
    if (timer > 0) {
      counter = setInterval(() => {
        setTimer(pre => pre - 1);
      }, 1000);
    } 
    if(timer==0) {
      router.push("/");
    }

    return () => {
      clearInterval(counter);
    };
  }, [timer]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <span>
          <TikIcon />
        </span>
        <h2>ثبت نام شما با موفقیت انجام شد</h2>
        <p>
          تا
          <span>{toFarsiNumber(timer)} ثانیه </span>
          وارد پنل کاربری خود می شوید
        </p>
        <Button bordered onClick={() => router.push("/")} width="100%">
          الان وارد شوید
        </Button>
      </div>
    </div>
  );
};

export default Step5;
