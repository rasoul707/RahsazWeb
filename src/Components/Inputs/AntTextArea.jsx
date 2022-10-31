import { makeStyles } from "@material-ui/core";
import { Input } from "antd";
import React from "react";
const { TextArea } = Input;

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: "12px",
    borderColor: theme.color.lightDark,
    height: "100%",
    resize: "none",
  },
}));

const AntTextArea = ({ className, rows = 6, ...rest }) => {
  const classes = useStyles();

  return (
    <TextArea
      className={`${classes.root} ${className}`}
      {...rest}
      rows={rows}
    />
  );
};

export default AntTextArea;
