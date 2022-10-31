import { useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Drawer, useMediaQuery } from "@material-ui/core";
import InnerContainer from "Components/Layout/InnerContainer";
import { NavigationCategory } from "Components/Category";
import { NavigationSearchInput } from "Components/Search";
import { NavigationProfile } from "Components/Profile";
import { NavigationCart } from "Components/Cart";
import { Reoverlay } from "reoverlay";
import ContactInfo from "./ContactInfo";
import TopAd from "./TopAd";

// Icons
import LogoSvg from "Assets/img/icons/logo.svg";
import ProfileSvg from "Assets/img/icons/profile.svg";
import CategorySvg from "Assets/img/icons/category.svg";
import CartSvg from "Assets/img/icons/cart.svg";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useRouter } from "next/router";
import CategoryMobile from "./CategoryMobile";

const useStyles = makeStyles(theme => ({
  nav_root: {
    padding: " 21px 0px",
    background: "#ffffff",
    color: "#0A194B",
    zIndex: 2,
    position: "relative",
    "@media(max-width: 960px)": {
      padding: "15px 0px",
    },
  },
  desktopNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
  },
  right: {
    display: "flex",
    alignItems: "center",
    flex: 2.5,
    position: "relative",
    "@media only screen and (max-width: 1350px)": {
      flex: 1.5,
    },
  },
  left: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuIcon: {
    cursor: "pointer",
    "& path": {
      fill: "#fff",
    },
  },
  logo: {
    marginRight: 40,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
    "& svg": {
      marginBottom: -7,
    },
  },
  category: {
    display: "flex",
    alignItems: "center",
    ...theme.font.s18w700,
    "& > span": {
      marginLeft: 8,
    },
  },
  listDrawer: {
    width: 320,
    zIndex: 99,
  },
  closeHeader: {
    ...theme.font.s16w700,
    display: "flex",
    alignItems: "center",
    padding: 30,
    background: theme.palette.primary.main,
    color: "#fff",
    boxShadow: theme.shadows[4],
    "& i": {
      display: "flex",
      marginRight: "3rem",
      cursor: "pointer",
      "& path": {
        fill: "#fff",
      },
    },
  },
  paperDrawer: {
    backgroundColor: theme.palette.background.default,
  },

  "@media(max-width: 1100px)": {
    right: {
      flex: 3,
    },
    center: {
      flex: 4,
    },
    left: {
      flex: 3,
    },
  },

  mobileMenu: {
    paddingTop: 12,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 12,
    "@media(max-width: 960px)": {
      gap: 20,
    },
  },

  mobileLeft: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mobilecenter: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  mobileRight: {},
  mobileSearch: {},
}));

const Navigation = ({ about }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:960px)");
  const router = useRouter();


  const [showTopAd, setShowTopAd] = useState(true);
  const { width } = useWindowDimensions();

  return (
    <>
      {(showTopAd && router.pathname === "/") && (
        <TopAd setShowTopAd={setShowTopAd} />
      )}
      <ContactInfo about={about} />
      <nav className={classes.nav_root}>
        <InnerContainer>
          {isDesktop ? (
            <>
              <div className={classes.desktopNav}>
                <div className={classes.right}>
                  <NavigationSearchInput />
                </div>
                <div className={classes.left}>
                  <NavigationProfile />
                  <NavigationCart />
                </div>
              </div>
            </>
          ) : (
            <div className={classes.mobileMenu}>
              {/* <div className={classes.mobileRight}>
                <CategorySvg
                  onClick={() => Reoverlay.showModal("MobileCategory")}
                />
              </div> */}
              <div className={classes.mobilecenter}>
                <NavigationSearchInput />
              </div>
              {width < 960 && <CategoryMobile />}
              {/* <div className={classes.mobileLeft}>
                <Link href="/">
                  <a style={{ marginLeft: "22px" }}>
                    <ProfileSvg />
                  </a>
                </Link>
                <a onClick={() => Reoverlay.showModal("MobileCart")}>
                  <CartSvg />
                </a>
              </div> */}
            </div>
          )}
        </InnerContainer>
      </nav>
    </>
  );
};

export default Navigation;
