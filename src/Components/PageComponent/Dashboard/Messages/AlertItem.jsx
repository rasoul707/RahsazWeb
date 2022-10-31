import React from "react";
import Alert from "@material-ui/lab/Alert";
import Bell from "Assets/img/icons/bell.svg";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  main: {
    "& path": {
      fill: theme.color.boldOrange,
    },
  },
  root: {
    background: "rgba(246, 137, 31, 0.03);",
  },
  text:{
    ...theme.font.s14w700
  }
}));
const AlertItem = ({text}) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Alert icon={<Bell />} classes={{ root: classes.root }}>
       <p className={classes.text}>{text}</p> 
      </Alert>
    </div>
  );
};

export default AlertItem;
