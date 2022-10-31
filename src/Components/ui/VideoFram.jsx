import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 15px",
    overflow: "hidden",
    maxWidth:"400px"
  },
  iframe: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
}));

const VideoFram = ({ src }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <iframe
        height="200"
        width="400"
        src={src}
        className={classes.iframe}
        frameBorder="0"
        allowFullScreen={true}
        webkitallowfullscreen='true'
        mozallowfullscreen='true'
      ></iframe>
    </div>
  );
};

export default VideoFram;
