import { makeStyles } from "@material-ui/core";
import React from "react";
import { toFarsiNumber, toToman } from "Utils/helperFunction";
import Link from "next/link";
import useWindowDimensions from "hooks/useWindowDimensions";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    padding: "16px 24px",
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    "@media only screen and (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "16px 10px",

      gap: 20,
    },
  },
  right: {
    display: "flex",
    gap: 16,
    "& p": {
      ...theme.font.s14w400,
    },
    "& >div": {
      "&:first-child": {
        border: "1px solid #EBEBEB",
        borderRadius: 8,
        padding: 2,
      },
    },
    "& section": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      "& >div": {
        display: "flex",
        gap: 20,
      },
      "& b": {
        ...theme.font.s14w700,
      },
    },
    "& img": {
      width: "90px",
      height: "80px",
      objectFit: "cover",
      "@media only screen and (max-width: 768px)": {
        width: "130px",
      },
    },
  },
  left: {
    color: "#616161",
    ...theme.font.s14w400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    "& span": {
      color: theme.color.boldOrange,
      ...theme.font.s16w700,
    },
  },
  desc: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "300px",
    "@media only screen and (max-width: 768px)": {
      width: "170px",
    },
  },
}));

const ItemDetails = ({ product, count, product_id }) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  return (
    <div className={classes.root}>
      <div className={classes.right}>
        <Link href={`/products/${product_id}`}>
          <div>
            <img
              src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${product?.cover_image?.image?.path || ""
                }`}
              alt={product?.name}
            />
          </div>
        </Link>
        <section>
          <b>{product?.name}</b>
          {width >= 960 && (
            <div>
              <p>{toFarsiNumber(count)} عدد</p>
              <p className={classes.desc}>{product?.description}</p>
            </div>
          )}
        </section>
      </div>
      {width < 960 && (
        <div style={{ display: "flex", gap: 10 }}>
          <p>{toFarsiNumber(count)} عدد</p>
          <p className={classes.desc}> {product?.description}</p>
        </div>
      )}
      <div className={classes.left}>
        <p>
          قیمت کالا : <span> {toToman(product?.purchase_price)} تومان</span>
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
