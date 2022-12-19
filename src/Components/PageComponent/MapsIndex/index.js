import { makeStyles } from "@material-ui/core";
import { Col, Row } from "antd";
import Image from "Components/Image";
import PageTemplate from "Components/Layout/PageTemplate";
import useWindowDimensions from "hooks/useWindowDimensions";
import React from "react";
import ProductsItem from "../products/ProductsItem";
import MapProduct from "./MapProduct";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "10px 20px",
    "@media only screen and (max-width: 960px)": {
      padding: "10px",

    },
  },
  main: {
    // display: "flex",
    // alignItems: "flex-start",
    // gap: 60,
    paddingRight: "10px",

    "@media only screen and (max-width: 960px)": {
      paddingRight: "0",
    },

  },
  img_wrapper: {
    width: "100%",
    height: "auto",
    "& h2": {
      ...theme.font.s16w700,
      textAlign: "center",
      marginTop: "10px",
    },
    "@media only screen and (max-width: 768px)": {
      width: "100%",
      height: "100%",
    },
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    "& h2": {
      ...theme.font.s16w700,
    },
  },
  product: {
    width: "100%",
  },
  wrap: {
    width: "100%",
    paddingRight: "10px",
    overflowX: "hidden",
    overflowY: "auto",
    position: "absolute",
    maxHeight: "100%",
    "@media only screen and (max-width: 960px)": {
      position: "relative",
      paddingRight: "0",

    },
  }
}));

const MapsIndex = ({ map, items }) => {
  const classes = useStyles();
  const { width } = useWindowDimensions()
  if (items?.length <= 0) {
    return (
      <h2 style={{ textAlign: "center", padding: "60px" }}>
        این نقشه محصولی ندارد
      </h2>
    );
  }
  return (
    <div className={classes.root}>
      <PageTemplate
        breadcrumbs={[
          { text: "صفحه اصلی", link: "/" },
          { text: "محصولات", link: "/products" },
          { text: map?.name, link: null },
        ]}
        color="transparent"
        padding={"0px"}
      >
        <div className={classes.main}>
          <Row gutter={width > 960 ? [20, 20] : [0, 20]}>
            <Col xs={24} sm={24} lg={12}>
              <section className={classes.img_wrapper}>
                <img
                  src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${map?.image?.path}`}
                  alt={map?.name}
                // objectFit={width <= 960 ? "fill" : "cover"}
                // imageProps={{ fill: false, width: 200, height: 500 }}
                />
              </section>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <div className={classes.wrap}>
                <Row gutter={[24, 24]}>
                  {items?.map(item => {
                    return (
                      <Col sm={24} xs={24} xl={24} xxl={24} key={item.id}>
                        <MapProduct {...item} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </PageTemplate>
    </div>
  );
};

export default MapsIndex;
