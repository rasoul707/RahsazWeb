import React from "react";
import { Divider } from "antd";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& .ant-divider-horizontal": {
      margin:"16px 0"
    },
  },
}));
const MyDivider = () => {
    const classes=useStyles()
  return (
    <div className={classes.root}>
      <Divider />
    </div>
  );
};

export default MyDivider;
