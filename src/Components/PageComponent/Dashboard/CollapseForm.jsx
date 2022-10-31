import { makeStyles } from "@material-ui/styles";
import { Collapse } from "antd";
const { Panel } = Collapse;

import React from "react";
import { toFarsiNumber } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  header: {
    ...theme.font.s18w700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    "@media(max-width: 960px)": {
      ...theme.font.s14w700,
    },
  },
  number: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#FAFAFA",
    width: 30,
    height: 30,
    "@media(max-width: 960px)": {
      width: 20,
      height: 20,
      ...theme.font.s14w700,
    },
  },
}));

const CollapseForm = ({ header, children, number ,open}) => {
  const classes = useStyles();
  return (
    <Collapse ghost defaultActiveKey={open?["1"]:[]}>
      <Panel
        key={1}
        header={
          <span className={classes.header}>
            {number && (
              <span className={classes.number}>{toFarsiNumber(number)}</span>
            )}{" "}
            {header}{" "}
          </span>
        }
      >
        {children}
      </Panel>
    </Collapse>
  );
};

export default CollapseForm;
