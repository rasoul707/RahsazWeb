import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: ({ full }) => (full ? "100%" : "auto"),
    whiteSpace: "nowrap",
  },
  tab: {
    ...theme.s14w400,
    color: "#151515",
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#151515",
    color: "#fff",
    padding: "7px 20px",
    borderRadius: 8,
  },
}));

const DynamicTabs = ({
  tabs = [],
  onChange = () => null,
  value = "در حال پردازش",
  full = true,
}) => {
  const classes = useStyles({ full: !!full });
  const [state, setState] = useState(value);

  return (
    <div className={classes.main}>
      <div className={classes.root}>
        {tabs?.map(tab => (
          <div
            className={`${classes.tab} ${
              state == tab.name ? classes.active : ""
            }`}
            key={tab.id}
            onClick={() => {
              setState(tab.name);
              onChange(tab.name);
            }}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicTabs;
