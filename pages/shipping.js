import { useState } from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { makeStyles, Grid } from "@material-ui/core";
import { Spin } from "antd";
import clsx from "clsx";
import { useForm, FormProvider } from "react-hook-form";
import { NormalInput } from "Components/Inputs";
import { Button } from "Components/Button";
import UploadFile from "Components/Uploader/UploadFile";

// Assets
import FactorIcon from "Assets/img/icons/pre-factor.svg";
import NumberOneIcon from "Assets/img/icons/persian-number-1.svg";
import NumberTwoIcon from "Assets/img/icons/persian-number-2.svg";
import NumberThreeIcon from "Assets/img/icons/persian-number-3.svg";
import PlusIcon from "Assets/img/icons/plus-blue.svg";
import DeliveryOneIcon from "Assets/img/icons/delivery-1.svg";
import DeliveryTwoIcon from "Assets/img/icons/delivery-2.svg";
import DeliveryThreeIcon from "Assets/img/icons/delivery-3.svg";

const useStyles = makeStyles(theme => ({
  box: {
    padding: "24px 20px",
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    marginBottom: 16,
    "& > h3": {
      color: "#333333",
      fontSize: 16,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 16,
    },
    "& .active": {
      border: "2px solid #F6891F",
      color: "#F6891F",
      "& path": {
        fill: "#F6891F",
      },
      "& h3": {
        color: "#F6891F",
      },
    },
  },
  addressBox: {
    padding: "20px",
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    cursor: "pointer",
    "& > h3": {
      color: "#333333",
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 16,
    },
  },
  selectAddressBox: {
    width: "100%",
    height: "100%",
    minHeight: 120,
    border: "1px dashed #1F75F6",
    borderRadius: 8,
    background: "rgba(31, 117, 246, 0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "& span": {
      color: "#1F75F6",
    },
  },
  deliveryBox: {
    padding: "20px 0px",
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
  },
  peymentBox: {
    padding: "24px 20px",
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
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
  voucher: {
    position: "relative",
    "& > .submitted": {
      position: "absolute",
      top: 6,
      right: 0,
      width: "100%",
      height: "58%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(76, 175, 80,0.4)",
      color: "rgba(76, 175, 80,1)",
      fontWeight: 700,
      borderRadius: 8,
    },
  },
  bankForm: {
    marginTop: 24,
    "& .bank-details": {
      "& > p": {
        fontSize: 14,
        fontWeight: 400,
        color: "#616161",
      },
    },
  },
}));

export default function Cart() {
  const classes = useStyles();
  const methods = useForm();

  const [loading, setLoading] = useState(false);

  const [deliveryType, setDeliveryType] = useState("door"); // ["door", "truck", "bus"]
  const [paymentType, setPaymentType] = useState("online"); // ["online, bank"]

  // handle voucher
  const [voucherValue, setVoucherValue] = useState("");
  const handleVoucher = () => { };

  const onSubmit = async formData => {
    console.log("formData: ", formData);
  };

  return (
    <>
      <main>
        <InnerContainer>
          <PageTemplate title="فرایند تکمیل سفارش">
            <Spin spinning={loading}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                  <div className={classes.box}>
                    <h3>
                      <NumberOneIcon />
                      انتخاب آدرس ارسال
                    </h3>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <div className={classes.addressBox}>
                          <h3>آدرس شماره 1</h3>
                          <p>تهران، تهران پارس، فلکه دوم، کوچه سوم، پلاک 12</p>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className={clsx(classes.addressBox, "active")}>
                          <h3>آدرس شماره 1</h3>
                          <p>تهران، تهران پارس، فلکه دوم، کوچه سوم، پلاک 12</p>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className={classes.selectAddressBox}>
                          <PlusIcon />
                          <span>اضافه کردن آدرس جدید</span>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.box}>
                    <h3>
                      <NumberTwoIcon />
                      نحوه ارسال مرسوله
                    </h3>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <div
                          className={clsx(
                            classes.deliveryBox,
                            deliveryType === "door" && "active",
                          )}
                          onClick={() => setDeliveryType("door")}
                        >
                          <DeliveryOneIcon />
                          <span>تحویل درب انبار شرکت</span>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <div
                          className={clsx(
                            classes.deliveryBox,
                            deliveryType === "truck" && "active",
                          )}
                          onClick={() => setDeliveryType("truck")}
                        >
                          <DeliveryTwoIcon />
                          <span>باربری - پس کرایه</span>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <div
                          className={clsx(
                            classes.deliveryBox,
                            deliveryType === "bus" && "active",
                          )}
                          onClick={() => setDeliveryType("bus")}
                        >
                          <DeliveryThreeIcon />
                          <span>اتوبوس - پس کرایه</span>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.box}>
                    <h3>
                      <NumberThreeIcon />
                      شیوع پرداخت سفارش
                    </h3>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <div
                          className={clsx(
                            classes.peymentBox,
                            paymentType === "online" && "active",
                          )}
                          onClick={() => setPaymentType("online")}
                        >
                          <span>پرداخت آنلاین</span>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div
                          className={clsx(
                            classes.peymentBox,
                            paymentType === "bank" && "active",
                          )}
                          onClick={() => setPaymentType("bank")}
                        >
                          <span>پرداخت با فیش بانکی</span>
                        </div>
                      </Grid>
                    </Grid>
                    {paymentType === "bank" && (
                      <div className={classes.bankForm}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <div className="bank-details">
                              <p>اطلاعات حساب شماره شبا</p>
                              <p>۴۶۰۵۷۰۱۰۰۵۸۱۰۱۱۴۰۳۷۶۶۱۱۰۲</p>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <div className="bank-details">
                              <p>شماره حساب</p>
                              <p>۱۰۰۵-۸۱۰۰-۱۴۰۳-۷۶۶۱-۲</p>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <div className="bank-details">
                              <p>بانک پاسارگاد</p>
                              <p>راهساز ماشین عرشیا ایرانیان</p>
                            </div>
                          </Grid>
                        </Grid>
                        <FormProvider {...methods}>
                          <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Grid
                              style={{ marginTop: "24px" }}
                              container
                              spacing={2}
                            >
                              <Grid item xs={12} sm={6}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={4}>
                                    <NormalInput
                                      name="date_day"
                                      label="تاریخ سند"
                                      placeholder="روز"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <NormalInput
                                      name="date_month"
                                      label="‌"
                                      placeholder="ماه"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4}>
                                    <NormalInput
                                      name="date_year"
                                      label="‌"
                                      placeholder="سال"
                                    />
                                  </Grid>
                                </Grid>
                                <NormalInput
                                  name="date_year"
                                  label="شماره فیش"
                                  placeholder="شماره فیش خود را وارد کنید"
                                />
                                <NormalInput
                                  name="date_year"
                                  label="‌چهار رقم آخر شماره کارت"
                                  placeholder="چهار رقم آخر شماره کارت خود را وارد کنید"
                                />
                                <NormalInput
                                  name="شماره پیگیری"
                                  label="شماره پیگیری‌ را وارد کنید"
                                  placeholder="سال"
                                />
                                <NormalInput
                                  name="date_year"
                                  label="نام بانک‌"
                                  placeholder="نام بانک را وارد کنید"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <UploadFile
                                  fixHeight
                                  text="تصویر فیش بانکی خود را آپلود کنید"
                                />
                              </Grid>
                            </Grid>
                          </form>
                        </FormProvider>
                      </div>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className={classes.checkoutBox}>
                    <div className="text-item">
                      <span>قیمت کالا</span>
                      <strong>2,700,000 تومان</strong>
                    </div>
                    <div className="text-item">
                      <span>مقدار تخفیف</span>
                      <strong>300,000 تومان</strong>
                    </div>
                    <hr />
                    <div className="text-item">
                      <span>جمع قابل پرداخت</span>
                      <strong>300,000,000 تومان</strong>
                    </div>
                    <div className={classes.voucher}>
                      <div className="submitted">
                        <span>اعمال شد</span>
                      </div>
                      <Grid container spacing={2}>
                        <Grid item xs={8} sm={8}>
                          <NormalInput
                            placeholder="کد تخفیف"
                            value={voucherValue}
                            onChange={e => setVoucherValue(e.target.value)}
                            withoutControl
                          />
                        </Grid>
                        <Grid item xs={4} sm={4}>
                          <Button
                            width="100%"
                            background="transparent"
                            color="#F6891F"
                            border="1px solid #F6891F"
                            padding="8px 0"
                            type="button"
                            onClick={handleVoucher}
                          >
                            اعمال
                          </Button>
                        </Grid>
                      </Grid>
                    </div>

                    <Button
                      isLink
                      href="/"
                      width="100%"
                      style={{ marginBottom: "12px", marginTop: "12px" }}
                    >
                      نهایی کردن سبد خرید
                    </Button>
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
