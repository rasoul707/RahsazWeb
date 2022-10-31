import React, { useRef, useState } from "react";
import AliceCarousel from "Assets/libs/react-alice-carousel/react-alice-carousel";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import NextSvg from "Assets/img/icons/carousel-next.svg";
import PrevSvg from "Assets/img/icons/carousel-prev.svg";

const useStyles = makeStyles(theme => ({
  carouselWrapper: {
    position: "relative",
    width: "98%",
    margin: "auto",
    "& > button": {
      position: "absolute",
      top: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      background: "none",
      cursor: "pointer",
      borderRadius: 30,

      "& > span": {
        borderRadius: "50%",
        background: "#FFF1E3",
        width: 42,
        height: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "@media only screen and (max-width: 960px)": {
          width: 39,
          height: 39,
        },
      },
    },
    "& > button.next": {
      right: -5,
      "@media only screen and (max-width: 960px)": {
        right: '-2px !important',
      },
    },
    "& > button.prev": {
      left: -5,
      "@media only screen and (max-width: 960px)": {
        left:'-2px !important',
      },
    },

    "@media(max-width: 576px)": {
      width: "94%",
    },
  },
}));

export default function PrimaryCarousel({ children, responsive }) {
  const classes = useStyles();
  const carouselRef = useRef(null);

  const [showNextButton, setShowNextButton] = useState(true);
  const [showPrevButton, setShowPrevButton] = useState(true);

  // const [responsive] = useState({
  //   0: { items: 2 },
  //   600: { items: 3 },
  //   960: { items: 4 },
  // });

  const goToNext = e => {
    // console.log("e: ", e);
    e.isPropagationStopped();
    carouselRef.current.slideNext(({ isNextDisable, isPrevDisable }) => {
      setShowPrevButton(!isPrevDisable);
      setShowNextButton(!isNextDisable);
    });
  };

  const goToPrev = e => {
    // console.log("e: ", e);
    e.isPropagationStopped();
    carouselRef.current.slidePrev(({ isNextDisable, isPrevDisable }) => {
      setShowPrevButton(!isPrevDisable);
      setShowNextButton(!isNextDisable);
    });
  };

  const handleInitialNextPrevButtons = ({ isNextDisable, isPrevDisable }) => {
    setShowPrevButton(!isPrevDisable);
    setShowNextButton(!isNextDisable);
  };

  return (
    <div className={classes.carouselWrapper}>
      <AliceCarousel
        autoPlay={false}
        autoPlayDirection="rtl"
        dotsDisabled={true}
        touchTrackingEnabled={true}
        duration={250}
        showSlideInfo={false}
        responsive={responsive}
        ref={carouselRef}
        isRTL={true}
        infinite={false}
        mouseTracking
        initailNextPrevButtons={handleInitialNextPrevButtons}
      >
        {children}
      </AliceCarousel>
      {showPrevButton && (
        <button onClick={goToNext} className="next">
          <span>
            <PrevSvg />
          </span>
        </button>
      )}

      {showNextButton && (
        <button onClick={goToPrev} className="prev">
          <span>
            <NextSvg />
          </span>
        </button>
      )}
    </div>
  );
}
