import { makeStyles } from "@material-ui/core";
import { Form } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import React from "react";
import ArrowIcon from "Assets/img/icons/arrow-right.svg";
import { useState } from "react";
import { sendRegisterCode } from "Services/auth.api";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "40px",
    "& label": {
      width: "100%",
    },
  },
  header: {
    ...theme.font.s18w700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  subheader: {
    ...theme.font.s16w700,
    marginTop: "30px",
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

const Step3 = ({ phone, setStep, dispatch }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const onFinish = async value => {
    try {
      setLoading(true);
      await sendRegisterCode(value.phone_number)
        .then(res => {
          dispatch({
            type: "EDIT_NUMBER",
            payload: value.phone_number,
          });
          setStep(4);
          setLoading(false);
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
  return (
    <div className={classes.root}>
      <h2 onClick={() => setStep(pre => pre - 1)} className={classes.header}>
        {" "}
        <ArrowIcon /> بازگشت به مرحله قبل{" "}
      </h2>
      <h3 className={classes.subheader}>شماره همراه خود را تایید کنید</h3>

      <Form
        name="reg_step_3"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        style={{ width: "100%", marginTop: "20px" }}
        initialValues={{
          phone_number: phone,
        }}
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
          <Button width="100%" type="submit" loading={loading}>
            مرحله بعد
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Step3;
