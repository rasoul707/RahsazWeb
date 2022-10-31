import { makeStyles } from "@material-ui/core";
import { Form } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import { useRouter } from "next/router";
import React from "react";
import ArrowIcon from "Assets/img/icons/arrow-right.svg";
import { useState } from "react";
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
  },
  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",
    "& input": {
      backgroundColor: "#FAFAFA",
    },
  },
  label: {
    ...theme.font.s14w700,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));


const ForgetPassword = () => {
    const classes = useStyles();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const onFinish=()=>{

    }
  return (
    <div className={classes.root}>
      <h2 onClick={() => router.back()}>
        {" "}
        <ArrowIcon /> بازگشت به مرحله قبل{" "}
      </h2>
      <Form
        name="otp1"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="new_pass"
          label={<div className={classes.label}>گذرواژه جدید</div>}
          rules={[
            {
              required: true,
              message: "لطفا گذرواژه جدید را وارد کنید",
            },
          ]}
        >
          <AntInput
            className={classes.input}
            placeHolder="گذرواژه جدید را وارد کنید"
          />
        </Form.Item>
        <Form.Item
          name="new_pass_re"
          label={<div className={classes.label}>تایید گذرواژه جدید</div>}

          rules={[
            {
              required: true,
              message: "لطفا گذرواژه جدید را وارد کنید",

            },
          ]}
        >
          <AntInput
            className={classes.input}
            placeHolder="گذرواژه جدید را مجدد وارد کنید"
          />
        </Form.Item>
        <Form.Item>
          <Button width="100%" type="submit" loading={loading}>
            تایید گذرواژه
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgetPassword