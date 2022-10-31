import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "Components/Button";

// Assets
import { counterStyle } from "Components/Counter/styles/counter.style";
import PlusIcon from "Assets/img/icons/plus.svg";
import MinusIcon from "Assets/img/icons/minus.svg";
import { toFarsiNumber } from "Utils/helperFunction";

const useStyles = makeStyles(counterStyle);
export default function Counter({ number, setNumber }) {
  const classes = useStyles();

  const handleClickOnMinus = () => {
    if (number === 1) return;
    setNumber(number - 1);
  };
  const handleClickOnPlus = () => {
    setNumber(number + 1);
  };
  return (
    <div className={classes.root}>
      <button onClick={handleClickOnPlus}>
        <PlusIcon />
      </button>
      <span>{toFarsiNumber(number) }</span>

      <button onClick={handleClickOnMinus}>
        <MinusIcon />
      </button>
    </div>
  );
}
