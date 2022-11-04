import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Carousel } from "antd";
import Link from "next/link";

// Icons
import NextSvg from "Assets/img/icons/carousel-next.svg";
import PrevSvg from "Assets/img/icons/carousel-prev.svg";
import Image from "Components/Image";
import useWindowDimensions from "hooks/useWindowDimensions";

const useStyles = makeStyles(theme => ({
  topBannersWrapper: {
    width: "100%",
    overflow: "hidden",
    marginTop: 40,
    position: "relative",
    "& > button": {
      position: "absolute",
      top: "45%",
      background: "red",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      background: "none",
      cursor: "pointer",
      borderRadius: 30,

      "& > span": {
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(60,60,60,0.44) 0%, rgba(44,44,44,0.22) 35%, rgba(180,180,180,0.1) 100%)",
        width: 42,
        height: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    "& > button.next": {
      right: 32,
      "@media only screen and (max-width: 960px)": {
        right: "-3px !important",
      },
    },
    "& > button.prev": {
      left: 32,
      "@media only screen and (max-width: 960px)": {
        left: "-3px !important",
      },
    },
  },
  carouselItem: {
    display: "block",
    position: "relative",
    width: "100%",
  },
  image: {
    height: 450,
    "@media only screen and (max-width: 960px)": {
      height: 210,
    },
    "& > img": {
      width: "100%",
      height: "100%",
      position: "absolute",
      bottom: 0,
      right: 0,
      borderRadius: 8,
      "@media only screen and (max-width: 960px)": {
        objectFit: "contain",
        borderRadius: 8,
      },
    },
  },
}));

export default function TopBanners({ images }) {
  const classes = useStyles();
  const carouselRef = useRef(null);
  const { width } = useWindowDimensions();

  const goToNext = e => {
    e.isPropagationStopped();
    carouselRef.current.next();
  };

  const goToPrev = e => {
    e.isPropagationStopped();
    carouselRef.current.prev();
  };

  return (
    <div className={classes.topBannersWrapper}>
      <button onClick={goToNext} className="next">
        <span>
          <PrevSvg />
        </span>
      </button>
      <button onClick={goToPrev} className="prev">
        <span>
          <NextSvg />
        </span>
      </button>
      <Carousel rtl={true} ref={carouselRef} autoplay>
        {images?.map(image => {
          return (
            <div key={image.id}>
              {/* {image.href != null ?
                (
                  <a
                    href={
                      image.href?.includes("http")
                        ? image.href
                        : "https://" + image.href
                    }
                    className={classes.carouselItem}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${image["image"].path}`}
                      alt={image["image"].path || ""}
                      className={classes.image}
                      objectFit={width <= 960 ? "fill" : "cover"}
                    />
                  </a>
                )
                :
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${image["image"].path}`}
                  alt={image["image"].path || ""}
                  className={classes.image}
                  objectFit={width <= 960 ? "fill" : "cover"}
                />
              } */}

            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
