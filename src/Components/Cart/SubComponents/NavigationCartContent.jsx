import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { Button } from "Components/Button";
import clsx from "clsx";

// Icons
import EmptyIcon from "Assets/img/icons/empty-cart.svg";
import ArrowLeft from "Assets/img/icons/arrow-left.svg";
import DeleteSvg from "Assets/img/icons/delete.svg";
import SampleProduct from "Assets/img/sample-images/product.svg";
import { Spin } from "antd";
import { toFarsiNumber, toToman } from "Utils/helperFunction";
import { deleteToCart } from "Services/order.api";

const useStyles = makeStyles(theme => ({
  navigationCartContentWrapper: {
    position: "absolute",
    top: "50%",
    width: 340,
    right: 0,
    margin: "30px auto 0",
    zIndex: 5,
    "@media(max-width: 960px)": {
      position: "relative",
      top: "unset",
      width: "100%",
      right: "unset",
      margin: "0",
    },
  },
  empty: {
    padding: "80px 0 40px ",
    background: "#ffffff",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    "& > h4": {
      marginBottom: 24,
    },

    "& > a": {
      color: "#FFAC2F",
      marginTop: 8,
      display: "flex",
      alignItems: "center",
      "& path": {
        fill: "#FFAC2F",
        stroke: "#FFAC2F"
      },
    },
  },
  full: {
    padding: "16px",
    background: "#ffffff",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    "& > header": {
      width: "100%",
      paddingBottom: 14,
      borderBottom: "1px solid #F9F9FB",
      "& strong": {
        textAlign: "right",
      },
    },

    "& > footer": {
      width: "100%",
      display: "flex",
      gap: 12,
      alignItems: "center",
      paddingTop: 14,
      borderTop: "1px solid #F9F9FB",
    },
  },
  productsList: {
    width: "100%",
    maxHeight: 320,
    overflowY: "auto",
    padding: "0 12px",
    "@media(max-width: 960px)": {
      maxHeight: "50vh",
    },
  },
  productItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingBottom: 12,
    marginTop: 8,
    borderBottom: "1px solid #F9F9FB",
    "& > img": {
      width: 80,
      height: 64,
      objectFit: "cover",
      borderRadius: 20,
    },

    "& > div": {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      flexDirection: "column",
      gap: "10px",
      "& > div": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& > button": {
          border: "none",
          background: "none",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          "& > span": {
            color: "#FF0000",
          },
        },
        "& > span": {
          display: "block",
          fontSize: 12,
          fontWeight: 300,
        },
        "& > strong": {
          display: "block",
          fontSize: 14,
          fontWeight: 500,
        },
        "& > p": {
          display: "block",
          fontSize: 12,
          fontWeight: 900,
          color: "#666666",
        },
      },
    },
  },
  price: {
    width: "100%",
  },
  item_price: {
    color: "#1F75F6 !important",
  },
}));

export default function NavigationCart({ cart, loading }) {
  const classes = useStyles();

  const deleteHand = id => {
    try {
      deleteToCart(id)
        .then(res => console.log(res))
        .catch(err => {
          const error = err.response && (err.response || err.message);

          throw error;
        });
    } catch (err) {
      console.log("err__", err);
    }
  };

  return (
    <div className={classes.navigationCartContentWrapper}>
      <Spin spinning={loading}>
        {!loading ? (
          <>
            {!cart?.items?.length ? (
              <div className={classes.empty}>
                <EmptyIcon />
                <h4>متاسفانه سبد خرید شما خالی می‌باشد</h4>
                <p>البته می‌تونی با یه سفارش خوب پرش کنی :)</p>
                <Link href="/products" style={{ display: "flex", gap: 5 }}>
                  برو به پر فروش‌ ترین‌ها
                  <ArrowLeft />
                </Link>
              </div>
            ) : (
              <div className={classes.full}>
                <header>
                  <strong>سبد خرید من</strong>
                </header>
                <div className={clsx(classes.productsList, "custom-scrollbar")}>
                  {cart?.items?.map(item => (
                    <div className={classes.productItem} key={item.id}>
                      <img
                        src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${item?.product?.cover_image?.image?.path}`}
                        alt=""
                      />
                      <div>
                        <strong>{item?.product?.name}</strong>
                        <div>
                          <p className={classes.item_price}>
                            {toFarsiNumber(item?.count)} عدد
                          </p>
                          <button onClick={() => deleteHand(item.product.id)}>
                            <DeleteSvg />
                            <span>حذف</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <footer>
                  <div className={classes.price}>
                    <p>مبلغ خرید من</p>
                    <p>{toToman(cart?.total_price)} </p>
                  </div>
                  <Button width="70%" isLink href="/cart">
                    ثبت سفارش
                  </Button>
                </footer>
              </div>
            )}
          </>
        ) : (
          <div style={{ minHeight: "150px", background: "#fff" }} />
        )}
      </Spin>
    </div>
  );
}
