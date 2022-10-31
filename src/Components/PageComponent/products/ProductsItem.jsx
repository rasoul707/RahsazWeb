import { makeStyles } from "@material-ui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toFarsiNumber } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    gap: 12,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    "& h4": {
      ...theme.font.s14w500,
      color: "#333333",
      textAlign: "center",
    },
    "& span": {
      ...theme.font.s14w700,
      color: theme.color.boldOrange,
    },
    "& div": {
      backgroundColor: "#fff",
      padding: "5px",
      borderRadius: 8,
      width: "100%",
      height: "100%",
    },
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  img_wrap: {
    maxHeight: "170px",
    minHeight: "170px",
    position: "relative",
    "& span": {
      position: "absolute",
      backgroundColor: theme.color.boldOrange,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      width: 30,
      height: 30,
      borderRadius: "50%",
      top: 5,
      left: 5,
    },
  },
}));

const ProductsItem = ({ name, price, image, id, numeric, alt }) => {
  const classes = useStyles();
  const router = useRouter();
  const alt_tag = (alt != null) ? alt : name;
  return (
    <div
      className={classes.root}
      onClick={() => router.push(`/products/${id}`)}
    >
      <div className={classes.img_wrap}>
        <img
          src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${image}`}
          alt={alt_tag}
          className={classes.img}
        />
        {numeric && <span>{toFarsiNumber(numeric)}</span>}
      </div>
      <h4>{name}</h4>
      <span>
        {price ? price.toLocaleString("fa-IR") : "به زودی"} {price && "تومان"}
      </span>
    </div>
  );
};

export default ProductsItem;
