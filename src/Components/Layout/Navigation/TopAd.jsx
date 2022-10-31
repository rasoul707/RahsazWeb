import { useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Drawer, useMediaQuery } from "@material-ui/core";
import InnerContainer from "Components/Layout/InnerContainer";
import Countdown from "react-countdown";
import moment from "jalali-moment";
// Icons
import CloseSvg from "Assets/img/icons/close-top-ad.svg";
import CallSvg from "Assets/img/icons/call-white.svg";
import { useEffect } from "react";
import { getSite } from "Services";

const useStyles = makeStyles(theme => ({
  topAdWrapper: {
    width: "100%",
    background: "#E67100",
    zIndex: 2,
  },
  topAd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > div": {
      display: "flex",
      alignItems: "center",
      gap: 14,
    },

    "& > h2": {
      padding: "14px 60px",
      background: "rgba(255, 255, 255, 0.2)",
      fontWeight: 800,
      fontSize: 20,
      color: "#ffffff",
      "@media only screen and (max-width: 960px)": {
        padding: "14px 15px",
        ...theme.font.s14w700,
      },
    },

    "& > button": {
      background: "none",
      border: "none",
      outline: "none",
      cursor: "pointer",
    },

    "& span": {
      color: "#ffffff",
    },
  },
  countDown: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
    gap: 8,
    "@media only screen and (max-width: 960px)": {
      gap: 5,
    },
    "& > div": {
      padding: "8px 8px 4px",
      borderRadius: 8,
      background: "#CA6400",
      fontWeight: 700,
      fontSize: 16,
      minWidth: 40,
      maxWidth: 40,
      justifyContent: "center",
      display: "flex",
      textAlign: "center",
      "@media only screen and (max-width: 960px)": {
        minWidth: 35,
        maxWidth: 35,
        fontSize: 14,
      },
    },
    "& b": {
      color: "#fff",
    },
  },
}));

const TopAd = ({ setShowTopAd }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:960px)");
  const [banner, setBanner] = useState([]);

  function filterByStr(str, arr) {
    return arr?.filter(banner => banner.key == str)?.[0];
  }

  let title = filterByStr("above_header_banner_title", banner)?.value;
  let href = filterByStr("above_header_banner_href", banner)?.value;
  let status = filterByStr("above_header_banner_status", banner)?.value;
  let expired = filterByStr(
    "above_header_banner_expired_at",
    banner,
  )?.value?.split("-");
  let started = filterByStr(
    "above_header_banner_started_at",
    banner,
  )?.value?.split("-");
  let fullEx = `${expired?.[0]}/${expired?.[1]}/${expired?.[2]}`;
  let fullSt = `${started?.[0]}/${started?.[1]}/${started?.[2]}`;

  let ExSeconds = +new Date(
    moment(fullEx, "jYYYY/jM/jD").local("en").format("YYYY/MM/DD"),
  );
  let StSeconds = +new Date(
    moment(fullSt, "jYYYY/jM/jD").local("en").format("YYYY/MM/DD"),
  );
  const handleClose = () => {
    setShowTopAd(false);
  };

  const calculateTimeLeft = () => {
    let difference = ExSeconds - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours:
          Math.floor((difference / (1000 * 60 * 60)) % 24) +
          Math.floor(difference / (1000 * 60 * 60 * 24)) * 24,
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    if (difference < 0) {
    }

    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    let timer;
    if (ExSeconds) {
      timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, ExSeconds]);

  useEffect(() => {
    let isRemoved = false;
    const fetchData = async () => {
      const getBanner = await getSite().catch(err => console.log(err));
      if (!isRemoved) {
        let getStatus = filterByStr(
          "above_header_banner_status",
          getBanner?.banners,
        )?.value;

        setBanner(getBanner?.banners);
        setShowTopAd((getStatus == "disable"||StSeconds- +new Date()>0) ? false : true);
      }
    };
    if (!isRemoved) {
      fetchData();
    }
    return () => {
      isRemoved = true;
    };
  }, []);

  return (
    <div className={classes.topAdWrapper}>
      <InnerContainer>
        <div className={classes.topAd}>
          <button onClick={handleClose}>
            <CloseSvg />
          </button>
          <h2>{title}</h2>
          <div className={classes.countDownWrapper}>
            {isDesktop && <span>زمان پایان تخفیف: </span>}
            <div className={classes.countDown}>
              {/* <div>
                <span>{timeLeft?.days}</span>
              </div> */}
              <div>
                <span>{timeLeft?.hours?.toLocaleString("fa-IR")}</span>
              </div>
              <b>:</b>
              <div>
                <span>{timeLeft?.minutes?.toLocaleString("fa-IR")}</span>
              </div>
              <b>:</b>
              <div>
                <span>{timeLeft?.seconds?.toLocaleString("fa-IR")}</span>
              </div>
            </div>
          </div>
        </div>
      </InnerContainer>
    </div>
  );
};

export default TopAd;
