import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import clsx from "clsx";
import Zoom from "@material-ui/core/Zoom";
// Assets
import InfoIcon from "Assets/img/icons/info.svg";
import DeleteIcon from "Assets/img/icons/delete-red.svg";
import React, { useState } from "react";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  featureCard: {
    width: "100%",
    background: "#ffffff",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 16,
    "@media only screen and (max-width: 960px)": {
      gap: 10,
      padding: "8px 5px",
    },
    "& span": {
      display: "block",
      fontSize: 12,
      fontWeight: 400,
      "@media only screen and (max-width: 960px)": {
        fontSize: 11,
      },
    },
    "&>div": {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
  },
  tooltip: {
    background: "#ccc",
    color: "black",
  },
  arrow: {
    color: "#ccc",
  },
}));

export const FeatureCard = React.forwardRef(function (
  { icon, title, text, data },
  ref,
) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      open={open}
      title={data}
      arrow
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
      TransitionComponent={Zoom}
    >
      <div
        className={classes.featureCard}
        ref={ref}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(!open)}
        onMouseLeave={() => setOpen(false)}
      >
        {icon}
        <div>
          <strong>{title}</strong>
          <span>{text}</span>
        </div>
      </div>
    </Tooltip>
  );
});

export default FeatureCard;
