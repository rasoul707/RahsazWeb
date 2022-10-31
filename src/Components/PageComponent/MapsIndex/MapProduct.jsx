import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { toFarsiNumber, toToman } from "Utils/helperFunction";
import ShopIcon from "Assets/img/icons/Add_Shopping.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addToCart } from "Services/order.api";
import { addToBasket } from "ReduxWrapper/actions/order.action";
import { Spin } from "antd";

const useStyles = makeStyles(theme => ({
  root: {
    background: "#fff",
    borderRadius: "8px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "24px",
    "& img": {
      width: "100px",
    },
    "@media only screen and (max-width: 960px)": {
      flexDirection: "column",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 20,
  },
  two_part: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    "& .price": {
      color: theme.color.boldOrange,
      ...theme.font.s14w700,
    },
    "& .basket": {
      padding: "8px 12px",
      borderRadius: 8,
      alignItems: "center",
      display: "flex",
      gap: 5,
      color: "#1F75F6",
      backgroundColor: "rgba(31, 117, 246, 0.05);",
      ...theme.font.s14w400,
      cursor: "pointer",
    },
    "& .number": {
      padding: "5px 12px",
      borderRadius: 8,
      backgroundColor: "#FAFAFA",
      ...theme.font.s12w700,
    },
  },
  mobile: {
    // "@media only screen and (max-width: 960px)": {
    //   flexDirection: "column",
    // },
  },
}));
const MapProduct = ({ cover_image, name, map_info, id, purchase_price }) => {
  console.log(cover_image);
  const classes = useStyles();
  const state = useSelector(state => state.user);
  const router = useRouter();
  const [order, setOrder] = useState(false);
  const dispatch = useDispatch();

  const orderHand = async () => {
    if (!state?.token) {
      return router.push("/auth/login");
    }

    try {
      setOrder(true);
      await addToCart({
        product_id: id,
        count: 1,
      })
        .then(res => {
          console.log(res);
          dispatch(
            addToBasket({
              product_id: id,
              count: 1,
            }),
          );
          setOrder(false);
        })
        .catch(err => {
          const error = err.response && (err.response || err.message);
          setOrder(false);
          throw error;
        });
    } catch (err) {
      console.log("err__", err);
    }
  };

  return (
    <div className={classes.root}>
      <img
        src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${cover_image?.image?.path}`}
      />

      <section className={classes.content}>
        <div className={classes.two_part}>
          <span className="number">
            محصول {toFarsiNumber(map_info?.product_number_in_map)}
          </span>
          <span>شناسه کالا : {toFarsiNumber(id)}</span>
        </div>
        <div>{name}</div>
        <div className={`${classes.two_part} ${classes.mobile}`}>
          <span className="basket" onClick={orderHand}>
            {order ? (
              <Spin spinning={order} />
            ) : (
              <>
                <ShopIcon /> اضافه به سبد خرید
              </>
            )}
          </span>
          <span className="price">{toToman(purchase_price ?? 0)} تومان </span>
        </div>
      </section>
    </div>
  );
};

export default MapProduct;
