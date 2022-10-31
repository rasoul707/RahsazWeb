import { makeStyles } from "@material-ui/styles";
import { useRouter } from "next/router";
import React from "react";
import { toToman } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    "& img": {
      border: " 1px solid #EBEBEB",
      borderRadius: 8,
      width: 70,
      height: 70,
      objectFit: "cover",
    },
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    "& h3": {
      ...theme.font.s14w700,
      margin: 0,
    }
  },
  priceBox: {
    color: "#616161",
    ...theme.font.s14w400,
  },
  price: {
    ...theme.font.s16w700,
    color: theme.color.boldOrange
  }
}));

const ViewItem = ({ img, name, price, id }) => {
  const classes = useStyles();
  const router = useRouter()
  return (
    <div className={classes.root} onClick={() => router.push(`/products/${id}`)}>
      <img src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${img}`} />
      <div className={classes.info}>
        <h3>{name}</h3>
        <div className={classes.priceBox}>
          <span> قیمت کالا : </span>
          <span className={classes.price}> {toToman(price || 0)} تومان</span>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
