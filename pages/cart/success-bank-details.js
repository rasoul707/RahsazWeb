import { makeStyles } from "@material-ui/core";
import React from "react";
import TikIcon from "Assets/img/icons/green-tik.svg";
import Link from "next/link";
import { Button } from "Components/Button";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    height:"70vh",
    justifyContent: "center",
    alignItems:'center',
    "&>div": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      "& p": {
        color: "#2DBD4D",
        ...theme.font.s16w700,
      },
    },
  },
  actions: {
    display: "flex",
    gap: 20,
  },
}));

const SuccessBank = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <span>
          <TikIcon />
        </span>
        <p>اطلاعات شما با موفقیت ثبت شد</p>
        <div className={classes.actions}>
          <Link href={"/dashboard/my-order"}>
            <Button>سفارشات من</Button>
          </Link>
          <Link href={"/"}>
            <Button bordered>خانه</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessBank;
