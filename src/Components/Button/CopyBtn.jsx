import { makeStyles } from "@material-ui/core";
import React from "react";
import CopyIcon from "Assets/img/icons/copy.svg";
import useCopyToClipboard from "hooks/useCopyToClipboard";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
  icon: {
    marginLeft: "15px",
    cursor: "pointer",
    width: "80px",
    height: "36px",
    padding:"8px 12px ",
    borderRadius: 8,
    transition: "all 0.3s ease",
    background: theme.color.boldOrange,
    color:"#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...theme.font.s14w400,
    "& path": {
      fill: "#fff",
    },
    // animation: props =>
    //   props.clicked
    //     ? "$stretch 1.5s ease-out 0s alternate infinite none running"
    //     : " ",
    "&:hover": {
      background: theme.color.boldOrange,
    },
  },
  "@keyframes stretch": {
    "0%": {
      transform: "scale(.3)",
      background: theme.color.boldOrange,
    },
    "100%": {
      transform: " scale(1.2)",
    },
  },
}));

const CopyBtn = ({ code, setStatus = () => null }) => {
  const [copied, copy] = useCopyToClipboard(code);
  const [clicked, setClicked] = useCopyToClipboard(false);
  const classes = useStyles({ clicked });

  useEffect(() => {
    if (copied) {
      setStatus({ status: true, code });
    }
  }, [copied, clicked]);
  return (
    <div className={classes.icon} onClick={copy}>
      <CopyIcon /> کپی
    </div>
  );
};

export default CopyBtn;
