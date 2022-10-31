import { Button } from "Components/Button";
import React from "react";

import FactorIcon from "Assets/img/icons/pre-factor.svg";
import { makeStyles } from "@material-ui/styles";
import { toToman } from "Utils/helperFunction";
import AntInput from "Components/Inputs/AntInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { finalCart, orderCoupon } from "Services/order.api";
import { toast } from "Utils/toast";
import Link from "next/link"
const useStyles = makeStyles(theme => ({
  checkoutBox: {
    padding: "24px 20px",
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    "& > hr": {
      color: "rgba(0, 0, 0, 0.2)",
      margin: "24px 0",
    },
    "& .text-item": {
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > strong": {
        color: "#151515",
        fontSize: 14,
        fontWeight: 700,
      },
      "& > span": {
        color: "#151515",
        fontSize: 14,
        fontWeight: 400,
      },
    },
    "& .text-item:nth-child(2)": {
      "& > strong": {
        color: "#FF0000",
      },
      "& > span": {
        color: "#FF0000",
      },
    },
  },
  coupon: {
    cursor: "pointer",
    ...theme.fonts14w700,
    color: "#1F75F6",
  },
  text_co: {
    ...theme.fonts14w700,
    color: "green",
    marginTop: "15px",
  },
}));

const CheckoutBox = ({ cart, state, setFull, currentOrder }) => {
  const classes = useStyles();

  const [input, setInput] = useState("");
  const [err, setErr] = useState(false);

  const couponHand = async () => {
    console.log("clicked");
    try {
      await orderCoupon(state.currentOrder, input)
        .then(res => {
          console.log(res);
          setFull(pre => !pre);
          toast.success("با موفقیت اعمال شد");
        })
        .catch(err => {
          const error = err.response && (err.response || err.message);
          throw error;
        });
    } catch (error) {}
  };

  const finalHand = async () => {
    console.log("click");
  };

  return (
    <div>
      <div className={classes.checkoutBox}>
        {/* <div className="text-item">
          <span>قیمت کالا</span>
          <strong>{toToman(cart?.total_price || 0)} تومان</strong>
        </div>
        <div className="text-item">
          <span>مقدار تخفیف</span>
          <strong>0 تومان</strong>
        </div>
        <hr /> */}
        <div className="text-item">
          <span>جمع قابل پرداخت</span>
          <strong>{toToman(cart?.total_amount || 0)} تومان</strong>
        </div>
        <AntInput
          placeholder="کد تخفیف خود را وارد کنید"
          suffix={
            <span onClick={couponHand} className={classes.coupon}>
              اعمال
            </span>
          }
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        {/* <Button
          width="100%"
          style={{ marginBottom: "12px", marginTop: "12px" }}
          onClick={finalHand}
          disabled
        >
          ادامه پرداخت
        </Button> */}

        <Link href={`/factor/${currentOrder}`} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <Button
              width="100%"
              color="#333333"
              iconColor="#333333"
              background="transparent"
              border="none"
            >
              <FactorIcon />
              مشاهده پیش فاکتور
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutBox;
