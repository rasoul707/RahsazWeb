import { makeStyles } from "@material-ui/styles";
import CopyBtn from "Components/Button/CopyBtn";
import React from "react";
import { dateFA } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    padding: 20,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media only screen and (max-width: 1200px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 20,
    },
  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 24,
    "@media only screen and (max-width: 1200px)": {
      gap: 18,
    },
    "& h1": {
      ...theme.font.s18w700,
      margin: 0,
      "@media only screen and (max-width: 1200px)": {
        ...theme.font.s14w700,
      },
    },
    "& p": {
      ...theme.font.s14w400,
      margin: 0,
    },
  },
  left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 15,
    "@media only screen and (max-width: 1200px)": {
      alignItems: "flex-start",
      width: "100%",
    },
  },
  code: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#FFF7EF",
    borderRadius: 8,
    padding: 4,
    "@media only screen and (max-width: 1200px)": {
      width: "100%",
    },
    "& span": {
      background: "#FFE9D5",
      borderRadius: 8,
      height: "100%",
      padding: "8px 16px",
      "@media only screen and (max-width: 1200px)": {
        width: "80%",
        textAlign:'center'
      },
    },
  },
  date_box: {
    ...theme.font.s14w400,
  },
  date: {
    color: theme.color.boldRed,
  },
}));
const CouponItem = ({ code, type, description, expired_at = " " }) => {
  const classes = useStyles();

  let date = expired_at.split(" ")?.[0];
  let times = date.split("-");
  console.log(times);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.right}>
          <h1>{type}</h1>
          <p>{description} </p>
        </div>
        <div className={classes.left}>
          <div className={classes.date_box}>
            <span>
              انقضا تا تاریخ :{" "}
              <span className={classes.date}>
                {" "}
                {dateFA(`${times[0]}/${times[1]}/${times[2]}`)}
              </span>{" "}
            </span>
          </div>
          <div className={classes.code}>
            <span>{code}</span>
            <CopyBtn code={code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponItem;
