import { makeStyles } from "@material-ui/core";
import { Form } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import { useRouter } from "next/router";
import React from "react";
import ArrowIcon from "Assets/img/icons/arrow-right.svg";
import CountDown from "./CountDown";
import { loginViaOtp, sendSmsLogin } from "Services/auth.api";
import { useDispatch } from "react-redux";
import { loginAction } from "ReduxWrapper/actions";
import { getCart } from "Services/order.api";
import { initialCart } from "ReduxWrapper/actions/order.action";
import { useState } from "react";
import { toFarsiNumber } from "Utils/helperFunction";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "& label": {
      width: "100%",
    },
    "&>h2": {
      ...theme.font.s18w800,
      marginBottom: "30px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    "& .ant-form-item": {
      margin: 0,
    },
  },
  info: {
    display: "flex",
    paddingBottom: "60px",
    gap: 6,
    "@media only screen and (max-width: 1350px)": {
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "40px",
      gap: 10,
    },
    "& p": {
      ...theme.font.s14w300,
      "& b": {
        fontWeight: 700,
      },
    },
    "& span": {
      color: "#1F75F6",
      borderBottom: "1px solid #1F75F6",
      cursor: "pointer",
    },
  },
  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",
    "& input": {
      backgroundColor: "#FAFAFA",
    },
  },
  counter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",
    gap: "5px",
  },
  time: {
    color: "#1F75F6",
    display: "flex",
  },
  reSend: {
    color: "#1F75F6",

    cursor: "pointer",
  },
}));

const Step2 = ({ phone, setStep }) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [timeDone, setTimeDone] = useState(false);
  const [seconds, setSeconds] = useState(60);



  const onFinish = async value => {
    setLoading(true);

    try {
      await loginViaOtp(phone, value.code)
        .then(res => {
          console.log(res);
          dispatch(loginAction(res.data));
        })
        .then(async res => {
          return await getCart()
            .then(async res => {
              await dispatch(initialCart(res));
              setLoading(false);
            })
            .then(res => {
              router.push("/");
            });
        })
        .catch(err => {
          setLoading(false);
        });
    } catch (error) {}
  };

  const reSendHand = async () => {
    try {
      await sendSmsLogin({
        phone_number: phone,
      })
        .then(res => {
          setSeconds(60)
        })
        .then(res=>{
          setTimeDone(false)
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  };

  return (
    <div className={classes.root}>
      <h2 onClick={() => router.back()}>
        {" "}
        <ArrowIcon /> ???????????? ???? ?????????? ??????{" "}
      </h2>

      <div className={classes.info}>
        <p>
          ???? ?????????? ???? ?????????? ?????????? <b>{toFarsiNumber(phone)}</b> ?????????????? ?????? ??????
        </p>
        <span onClick={() => setStep(1)}>?????????? ??????????</span>
      </div>
      <Form
        name="otp1"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: "???? ???? ???????? ????????",
            },
            {
              type: "number",
              message: "???? ?????????? ????????",
              transform: value => Number(value),
            },
          ]}
        >
          <AntInput
            className={classes.input}
            placeholder="???? ???? ?????????? ???????? ????????"
          />
        </Form.Item>
        <div className={classes.counter}>
          {!timeDone && (
            <>
              ???????? ?????????? ???? ????{" "}
              <CountDown
                className={classes.time}
                timeDown={timeDone}
                setTimeDone={setTimeDone}
                seconds={seconds}
                setSeconds={setSeconds}
              />{" "}
              ????????
            </>
          )}
          {timeDone && (
            <span className={classes.reSend} onClick={reSendHand}>
              ?????????? ???????? ????
            </span>
          )}
        </div>

        <Form.Item>
          <Button width="100%" type="submit" loading={loading}>
            ????????
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Step2;
