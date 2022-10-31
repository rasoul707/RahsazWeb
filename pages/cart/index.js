import { useEffect, useState } from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { makeStyles, Grid } from "@material-ui/core";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { Button } from "Components/Button";
import CartPageProductItem from "Components/Cart/SubComponents/CartPageProductItem";

// Assets
import FactorIcon from "../../src/Assets/img/icons/pre-factor.svg";
import { useDispatch, useSelector } from "react-redux";
import { finalCart, getCart } from "Services/order.api";
import { toFarsiNumber, toToman } from "Utils/helperFunction";
import { useRouter } from "next/router";
import { emptyBasket, setOrder } from "ReduxWrapper/actions/order.action";
import Head from "next/head";

const useStyles = makeStyles(theme => ({
  products: {
    "& > div:last-child": {
      borderBottom: "none",
    },
  },
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
}));

export default function Cart() {
  const classes = useStyles();
  const basket = useSelector(state => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCart()
      .then(res => {
        setCart(res);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [update]);

  const finalHand = async () => {
    await finalCart()
      .then(res => {
        console.log("res", res);
        dispatch(emptyBasket());
        dispatch(setOrder(res.data.id));
      })
      .then(res => {
        router.push("/cart/complete");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Head>
        <title>سبد خرید</title>
      </Head>
      <main>
        <InnerContainer>
          <PageTemplate
            title={`سبد خرید من (${toFarsiNumber(basket?.items?.length||0)})`}
          >
            <Spin spinning={loading}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                  {cart?.items?.length ? (
                    <div className={classes.products}>
                      {cart?.items?.map(item => (
                        <CartPageProductItem
                          setUpdate={setUpdate}
                          key={item.id}
                          {...item}
                        />
                      ))}
                    </div>
                  ) : (
                    <h3 style={{ textAlign: "center" }}>
                      سبد خرید شما خالی است{" "}
                    </h3>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
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
                      <strong>{toToman(cart?.total_price || 0)} تومان</strong>
                    </div>
                    <Button
                      onClick={finalHand}
                      width="100%"
                      style={{ marginBottom: "12px", marginTop: "12px" }}
                      disabled={cart?.items?.length<=0}
                    >
                      نهایی کردن سبد خرید
                    </Button>
                    {/* <Button
                      width="100%"
                      color="#333333"
                      iconColor="#333333"
                      background="transparent"
                      border="none"
                    >
                      <FactorIcon />
                      مشاهده پیش فاکتور
                    </Button> */}
                  </div>
                </Grid>
              </Grid>
            </Spin>
          </PageTemplate>
        </InnerContainer>
      </main>
    </>
  );
}
