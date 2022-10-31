import { makeStyles } from "@material-ui/core";
import { Form } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import React from "react";
import { useState } from "react";
import { registerReq, sendSmsLogin, verifyRegisterCode } from "Services/auth.api";
import { toFarsiNumber } from "Utils/helperFunction";
import ArrowIcon from "Assets/img/icons/arrow-right.svg";
import CountDown from "../Login/otp/CountDown";
import { useDispatch } from "react-redux";
import { registerAction } from "ReduxWrapper/actions";

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
    "& .ant-form-item": {
      margin: 0,
    },
  },
  info: {
    display: "flex",
    paddingBottom: "60px",
    marginTop: "30px",
    gap: 6,
    "@media only screen and (max-width:1350px)": {
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
    header: {
      ...theme.font.s18w700,
      marginTop: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
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
  header: {
    ...theme.font.s18w700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
}));

const Step4 = ({ setStep, phone,state }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [timeDone, setTimeDone] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const dispatch = useDispatch();
  console.log('deepp',state);
  const onFinish = async values => {
    try {
      setLoading(true);
      await verifyRegisterCode(phone, values.code)
        .then(async res => {
          await registerReq(state).then(res => {
            dispatch(registerAction(res));
            setStep(5);
            setLoading(false);
          });
        })
        .catch(err => {
          const error = err.response && (err.response || err.message);
          setLoading(false);
          throw error;
        });
    } catch (error) {
      console.log("err__", error);
    }
  };

  const reSendHand = async () => {
    try {
      await sendSmsLogin({
        phone_number: phone,
      })
        .then(res => {
          setSeconds(60);
        })
        .then(res => {
          setTimeDone(false);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  };

  return (
    <div className={classes.root}>
      <h2 onClick={() => setStep(pre => pre - 1)} className={classes.header}>
        {" "}
        <ArrowIcon /> بازگشت به مرحله قبل{" "}
      </h2>

      <div className={classes.info}>
        <p>
          کد تایید به شماره همراه <b>{toFarsiNumber(phone)}</b> فرستاده شده است
        </p>
        <span onClick={() => setStep(pre => pre - 1)}>تغییر شماره</span>
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
              message: "کد را وارد کنید",
            },
            {
              type: "number",
              message: "کد معتبر نیست",
              transform: value => Number(value),
            },
          ]}
        >
          <AntInput
            className={classes.input}
            placeholder="کد را اینجا وارد کنید"
          />
        </Form.Item>
        <div className={classes.counter}>
          {!timeDone && (
            <>
              زمان تایید کد تا{" "}
              <CountDown
                className={classes.time}
                timeDown={timeDone}
                setTimeDone={setTimeDone}
                seconds={seconds}
                setSeconds={setSeconds}
              />{" "}
              دیگر
            </>
          )}
          {timeDone && (
            <span className={classes.reSend} onClick={reSendHand}>
              ارسال مجدد کد
            </span>
          )}
        </div>

        <Form.Item>
          <Button width="100%" type="submit" loading={loading}>
            ورود
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Step4;
