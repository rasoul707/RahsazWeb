import { useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Drawer, useMediaQuery } from "@material-ui/core";
import InnerContainer from "Components/Layout/InnerContainer";
import { Badge } from "@material-ui/core";
import BellSvg from "Assets/img/icons/bell.svg";

// Icons
import EmailSvg from "Assets/img/icons/email-white.svg";
import CallSvg from "Assets/img/icons/call-white.svg";
import { filterByStr, toFarsiNumber } from "Utils/helperFunction";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  contactInfoWrapper: {
    width: "100%",
    background: "#151515",
    padding: "7px 0",
    zIndex: 2,
  },
  contactInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > div": {
      display: "flex",
      alignItems: "center",
      gap: 14,
      width: "100%",
      justifyContent: "flex-end",
      "& > div": {
        display: "flex",
        alignItems: "center",
        gap: 3,
      },
    },

    "& span": {
      color: "#ffffff",
    },
  },
  text: {
    width: "100%",
  },
  logoWrapper: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 20px",
    "& .box": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
  bell: {
    backgroundColor: theme.color.boldOrange,
    color: "#fff",
    height: "17px",
    width: "16px",
  },
}));

const ContactInfo = ({ about }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:960px)");
  const { width } = useWindowDimensions();
  let phone = filterByStr("header_phone", "field_key", about)?.field_value;
  let email = filterByStr("header_email", "field_key", about)?.field_value;
  let text = filterByStr("header_text", "field_key", about)?.field_value;


  const state = useSelector(state => state.user);

  return (
    <>
      <div className={classes.contactInfoWrapper}>
        <InnerContainer>
          <div className={classes.contactInfo}>
            {isDesktop && (
              <span className={classes.text}>
               {text}
              </span>
            )}

            <div>
              <div>
                <span>{email}</span>
                <EmailSvg />
              </div>
              <div>
                <a href={`tel:${phone}`} style={{display:"flex",gap:5}}>
                  <span>{phone?.toLocaleString("fa-IR")}</span>
                  <CallSvg />
                </a>
              </div>
            </div>
          </div>
        </InnerContainer>
      </div>
      {width <= 900 && (
        <div className={classes.logoWrapper}>
          <div className="box">
            <Link href={"/"}>
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>

          <Link href={"/dashboard/messages"}>
            <Badge
              badgeContent={toFarsiNumber(state?.unread_message_count)}
              classes={{ badge: classes.bell }}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <BellSvg />
            </Badge>
          </Link>
        </div>
      )}
    </>
  );
};

export default ContactInfo;
