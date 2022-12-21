import { useEffect, useState } from "react";
import { Hidden, List, Drawer, makeStyles } from "@material-ui/core";
import { drawerWidth } from "Utils/theme";
import { RadioButton } from "Components/Button";
import Link from "next/link";

// helper function
import MenuItem from "./MenuItem";

// redux
import { useDispatch } from "react-redux";
import { Spin } from "antd";

const useStyles = makeStyles(theme => ({
  sidebarWrapper: {
    "& .MuiPaper-root": {
      background: "#ffffff !important",
      position: ({ phone }) => (phone ? "" : "fixed"),
    },
    "& .ant-spin-nested-loading": {
      overflowX: "hidden !important"
    },
    "& .ant-spin-container": {
      overflowX: "hidden !important"

    }
  },
  drawerPaper: {
    width: ({ phone }) => (phone ? "100%" : drawerWidth),
    "& .ant-spin-nested-loading": {
      overflowX: "hidden !important"
    },
    "& .ant-spin-container": {
      overflowX: "hidden !important"

    },
    border: "none",
    background: "#ffffff ",
    // position: "fixed",
    // top: "0",
    // bottom: "0",
    // left: "0",
    // zIndex: "1",
    [theme.breakpoints.up("md")]: {
      width: ({ phone }) => (phone ? "100%" : drawerWidth),
      position: ({ phone }) => (phone ? "unset" : "fixed"),
      height: "100%",
      boxShadow: "none",
    },
    [theme.breakpoints.down("sm")]: {
      width: ({ phone }) => (phone ? "100%" : drawerWidth),
      position: ({ phone }) => (phone ? "unset" : "fixed"),
      // display: "block",
      // top: "0",
      // right: "0",
      // left: "auto",
      height: ({ phone }) => (phone ? "auto" : "100vh"),
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      transform: ({ phone }) =>
        phone ? "" : `translate3d(${drawerWidth}px, 0, 0)`,
      ...theme.transition,
    },
  },
  logoWrapper: {
    padding: "20px 57px",
    display: ({ phone }) => phone && "none",
    cursor: "pointer",
    // borderBottom: "1px solid #EBEBEB",
    marginBottom: 14,
    "& > img": {
      width: "100%",
    },
  },
  statusWrapper: {},
  sidebarWrapper: {
    position: "relative",
    // height: "calc(100vh - 75px)",
    overflow: "auto",
    width: ({ phone }) => (phone ? "100%" : "260px"),
    zIndex: "1",
    overflowScrolling: "touch",
  },
  logoutButton: {
    position: "absolute",
    left: 0,
    right: 0,
    margin: "auto",
    bottom: 16,
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    "& path": {
      fill: "#ff0000",
    },
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset",
    // "& .MuiCollapse-entered": {
    "& .MuiCollapse-wrapperInner": {
      "& .MuiListItem-root": {
        marginLeft: 35,
      },
    },
  },
  drawerRoot: {
    position: ({ phone }) => (phone ? "" : "fixed"),
    "& .ant-spin-nested-loading": {
      overflowX: "hidden !important"
    },
    "& .ant-spin-container": {
      overflowX: "hidden !important"

    }
  },
}));

export default function SideBar(props) {
  const classes = useStyles({ phone: props.mode == "phone" });
  const dispatch = useDispatch();

  const links = (
    <List className={classes.list}>
      {props.routes?.map((item, index) => (
        <MenuItem
          {...item}
          key={item.id}
          id={item.id}
          handleDrawerToggle={props.handleDrawerToggle}
          status={props.status}
        />
      ))}
    </List>
  );



  return (
    <div className={classes.sidebarWrapper}>
      <Hidden mdUp={props.mode == "pc"} implementation="css">

        <Drawer
          variant="temporary"
          anchor={"left"}
          open={props.open}
          classes={{
            paper: classes.drawerPaper,
            root: classes.drawerRoot,
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.logoWrapper}>
            <Link href="/">
              <img src="/images/logo.png" alt="" />
            </Link>
          </div>
          <div className={classes.statusWrapper}>
            <RadioButton
              buttons={[
                { label: "دسته اصلی", value: "category" },
                { label: "نقشه‌های فنی", value: "technical-maps" },
              ]}
              active={props.status}
              setActive={value => {
                props.setStatus(value);
              }}
            />
          </div>
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
      <Hidden smDown={props.mode == "pc"} implementation="css">
        <Drawer
          variant="permanent"
          anchor={"left"}
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.logoWrapper}>
            <Link href="/">
              <img src="/images/logo.png" alt="" />
            </Link>
          </div>
          <div className={classes.statusWrapper}>
            <RadioButton
              buttons={[
                { label: "دسته اصلی", value: "category" },
                { label: "نقشه‌های فنی", value: "technical-maps" },
              ]}
              active={props.status}
              setActive={value => {
                props.setStatus(value);
              }}
            />
          </div>
          <Spin spinning={props?.loading}>
            <div
              className={classes.sidebarWrapper}
              style={{ minHeight: "300px" }}
            >
              {links}
            </div>
          </Spin>
        </Drawer>
      </Hidden>
    </div>
  );
}
