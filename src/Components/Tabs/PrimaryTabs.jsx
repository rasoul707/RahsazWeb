import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    position: "relative",

    padding: 6,
    "& button": {
      position: "relative",
      width: 200,
      margin: "1px",
      fontWeight: 400,
      fontSize: 14,
      border: "none",
      color: "#fff",
      // borderBottom: "40px solid #474747",
      // borderLeft: "25px solid transparent",
      // borderRight: "25px solid transparent",
      background: "url(/images/backbtn.png)",
      backgroundSize:"cover",
      backgroundRepeat:"round",
      // clipPath:"polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
      height: 45,
      cursor: "pointer",
      "@media only screen and (max-width: 760px)": {
        fontSize: 12,

      },
      "&>span": {
        display: "block",
        marginTop: 10,
      },
      "& > div.line": {
        width: 40,
        height: 2,
        margin: "5px auto 0",
      },
    },
    "& button.activeButton>span": {},
  },
}));

export default function PrimaryTabs({ buttons, active, setActive, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.buttonWrapper, className)}  style={{left:`${+buttons?.length*3}px`}}>
      {buttons.map((button,i) => (
        <button
          key={button.value}
          className={clsx(active === button.value && "activeButton")}
          onClick={() => setActive(button.value, button)}
          style={{right:buttons.length-i==1?'':`${(10/(i+1))*2}px`,zIndex:`${(10/(i+1))*2}`}}
          type="button"
        >
          <span>{button.label}</span>
          {active === button.value ? <div style={{background: "#F6891F",}} className="line" />:<div className="line" />}
        </button>
      ))}
    </div>
  );
}


