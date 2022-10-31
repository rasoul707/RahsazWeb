import { makeStyles } from "@material-ui/core";
import { Form } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import { useRouter } from "next/router";
import React from "react";
import { forgetPassSms } from "Services/auth.api";
import { toast } from "Utils/toast";

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


const ForgetPassCode = () => {
    const classes = useStyles();
    const router=useRouter()

  const onFinish = async value => {
    console.log("value",value);

    try {
      await forgetPassSms(value)
        .then(res => {
          router.push("/auth/login")
        }).then(res=>{
            toast.success("رمز جدید ارسال شد")
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  };
  return (
    <div className={classes.root}>
      <h2>فراموشی رمز عبور</h2>

      <Form
        name="forget"
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
            ارسال رمز عبور
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgetPassCode