import { makeStyles } from "@material-ui/styles";
import { Pagination } from "antd";
import React from "react";
import ArrowLeft from "Assets/img/icons/arrow-left.svg";
import ArrowRight from "Assets/img/icons/rightP.svg";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& .ant-pagination-item": {
      border: "none",
      background: "transparent",
    },
    "& a": {
      color: "black",
    },
    "& a[disabled]": {
      color: "rgba(0, 0, 0, 0.25) !important",
      background: "transparent !important",
    },
    "& .ant-pagination-item-active": {
      backgroundColor: theme.color.boldOrange,
      borderColor: theme.color.boldOrange,
    },
    "& .ant-pagination-item-active a": {
      color: "#fff",
    },
    "& .ant-pagination-item:focus-visible, .ant-pagination-item:hover": {
      borderColor: theme.color.boldOrange,
    },
    "& .ant-pagination-item:focus-visible a, .ant-pagination-item:hover a": {
      backgroundColor: theme.color.boldOrange,
      color: "#fff",


    },
  },
  page: {
    fontFamily: 'Iran Yekan',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    borderRadius: 4,
    ...theme.font.s12w600,
    width: 90,
    gap:5
    // height: 36,
  },
}));

const Pagintaion = ({ ...rest }) => {
  const classes = useStyles();

  function itemRender(current, type, originalElement, ...re) {
    if (type === "prev") {
      return (
        <a>
          <span className={classes.page}>
            {" "}
            <ArrowRight />
            صفحه قبل{" "}
          </span>
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <span className={classes.page}>
            صفحه بعد <ArrowLeft />{" "}
          </span>
        </a>
      );
    }
    return originalElement;
  }
  return (
    <div className={classes.root}>
      <Pagination {...rest} itemRender={itemRender} />{" "}
    </div>
  );
};

export default Pagintaion;
