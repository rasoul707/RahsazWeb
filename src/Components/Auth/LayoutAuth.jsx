import { makeStyles } from "@material-ui/styles";
import { Col, Row } from "antd";
import React from "react";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      background: "#fff",
    },
  },
  root: {
    height: "100vh",
    width:"100%",
    position:"relative",
    overflowX:"hidden"
  },
  right: {
    padding: "20px 50px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height:"100%",
    "@media only screen and (max-width: 768px)": {
      padding: "0",
      paddingTop:'20px',
      overflowY:"hidden"
    },
  },
  leftImg: {
    width: "100%",
    height: "100vh",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  child: {
    padding: "20px 80px",
    width: "100%",
    height:"100%",
    "@media only screen and (max-width: 768px)": {
      padding: "20px",
      paddingTop: "20px",
      overflowY:"hidden"

    },
  },
  img:{
cursor:"pointer"
  }
}));

const LayoutAuth = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Row>
        <Col  xs={24} sm={24} md={24} lg={12}>
          <div className={classes.right}>
            <div className={classes.img}>
              <Link href="/">
              <img src={"/images/logo.png"} />

              </Link>
            </div>
            <div className={classes.child}>{children}</div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={12}>
          <div className={classes.leftImg}>
            <img src={"/images/auth.png"} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LayoutAuth;
