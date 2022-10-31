import { makeStyles } from "@material-ui/core";
import { Form } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import React from "react";
import { sendSmsLogin } from "Services/auth.api";

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
    },
  },
  label: {
    ...theme.font.s14w700,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",

    "& input": {
      backgroundColor: "#FAFAFA",
    },
  },
}));

const Step1 = ({ setPhone, setStep }) => {
  const classes = useStyles();

  const onFinish = async value => {
    console.log("value");

    try {
      await sendSmsLogin(value)
        .then(res => {
          console.log("res", res);
          setPhone(value.phone_number);
          setStep(2);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  };

  return (
    <div className={classes.root}>
      <h2>ورود با رمز یکبار مصرف</h2>

      <Form
        name="otp1"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone_number"
          label={<div className={classes.label}>شماره همراه</div>}
          rules={[
            {
              required: true,
              message: "لطفا شماره همراه خود را وارد کنید",
            },
            {
              type: "number",
              message: "شماره تلفن معتبر وارد کنید",
              transform: value => Number(value),
            },
          ]}
        >
          <AntInput
            className={classes.input}
            placeholder="شماره همراه خود را وارد کنید"
            maxLength={11}
          />
        </Form.Item>
        <Form.Item>
          <Button width="100%" type="submit">
            مرحله بعد
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Step1;
