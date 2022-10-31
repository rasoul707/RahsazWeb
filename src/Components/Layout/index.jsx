import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { drawerWidth } from "Utils/theme";

import { getAbout, getMegaMenu, getMap } from "Services";
import { useEffect } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import BottomNav from "./BottomNav";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  main_wrapper: {
    // position: "relative",
    // top: "0",
    // height: "100vh",
    backgroundColor: "#ffffff",
  },
  main_panel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    maxHeight: "100%",
    width: "100%",
    overflowX: "hidden",
    ...theme.transition,
  },
  content: {
    marginTop: "0px",
    minHeight: "calc(100vh - 123px)",
    background: "#fafafa",
  },
  container: {
    ...theme.container,
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  // global states
  const showLayout = useSelector(state => state.general.showMainOverlay);

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const handleDrawerToggle = () => {
    setToggleDrawer(!toggleDrawer);
  };

  const [routes, setRoutes] = useState([]);
  const [about, setAbout] = useState([]);
  const { width } = useWindowDimensions();
  const [status, setStatus] = useState("category");
  const [loading, setLoading] = useState(false);
  const { query, pathname } = useRouter();

  useEffect(() => {
    let isRemoved = false;

    const fetchRoutes = async () => {
      setLoading(true);
      let api = status == "technical-maps" ? getMap : getMegaMenu;
      const res = await api();
      const about = await getAbout();
      if (!isRemoved) {
        setRoutes(res);
        setAbout(about);
        setLoading(false);
      }
    };
    fetchRoutes();
    return () => {
      isRemoved = true;
    };
  }, [status]);

  if (pathname.includes("/auth") || pathname.includes("/factor")) {
    return (
      <React.Fragment>
        {children}
        {width <= 900 && pathname.includes("/auth") && <BottomNav />}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.main_wrapper}>
      {/*________sidebar________*/}
      <SideBar
        routes={routes}
        handleDrawerToggle={handleDrawerToggle}
        open={toggleDrawer}
        mode="pc"
        status={status}
        setStatus={setStatus}
        loading={loading}
      />
      {/*________end sidebar________*/}
      <div className={classes.main_panel}>
        {/*________navbar________*/}
        <Navigation about={about} />
        {/* Main overlay  */}
        {showLayout && <div className={classes.overlay} />}
        {/*________end navbar________*/}
        <div className={classes.content}>
          <div>
            {" "}
            {React.Children.map(children, child => {
              return React.cloneElement(child, { about });
            })}
          </div>
          <Footer about={about} />
          {width <= 900 && (
            <div
              style={{
                height: query.productId ? "160px" : "80px",
                width: "100%",
              }}
            />
          )}
          {width <= 900 && <BottomNav />}
        </div>
      </div>
    </div>
  );
}
