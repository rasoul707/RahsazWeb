import React from "react";
import { makeStyles } from "@material-ui/styles";
import NextImage from "next/image";

const useStyle = makeStyles((theme) => ({
  imageWrapper: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
}));

const Image = ({
  className = "",
  src,
  imageProps,
  objectFit = "cover",
  alt,
  ...restProps
}) => {
  const classes = useStyle();
  return (
    <div className={`${classes.imageWrapper} ${className}`} {...restProps}>
      <NextImage
        src={src}
        objectFit={objectFit}
        // loading="lazy"
        alt={alt}
        // placeholder="blur"
        // blurDataURL="data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=="
        // layout="responsive"
        fill
        priority
        {...imageProps}
      />
    </div>
  );
};

export default Image;