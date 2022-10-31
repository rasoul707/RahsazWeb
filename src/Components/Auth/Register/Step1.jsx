import { makeStyles } from "@material-ui/core";
import { Checkbox, Form } from "antd";
import AntInput from "Components/Inputs/AntInput";
import { AntPass } from "Components/Inputs/AntInput";
import DynamicTabs from "Components/PageComponent/Dashboard/DynamicTabs";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "Components/Button";
import { Reoverlay } from "reoverlay";

const useStyles = makeStyles(theme => ({
  header: {
    ...theme.font.s18w700,
    margin:0,
    marginBottom: 20,
    "@media only screen and (max-width: 768px)": {
      ...theme.font.s16w700,
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
  register: {
    ...theme.font.s14w700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    gap: "5px",
    "& span": {
      color: theme.color.boldOrange,
      cursor: "pointer",
    },
  },
  check: {
    "& span": {
      color: "#1F75F6",
      borderBottom: "1px solid #1F75F6",
      cursor: "pointer",
    },
  },
}));
const Step1 = ({ tabs, setTabs, setStep, dispatch, state }) => {
  const classes = useStyles();
  const [checkRole, setCheckRole] = useState(false);

  const tabsNames = [
    {
      name: "مشتری",
      id: 1,
    },
    {
      name: "همکار",
      id: 2,
    },
    {
      name: "شرکت",
      id: 3,
    },
  ];
  function onChange(value) {
    setTabs(value);
  }

  const onFinish = values => {
    console.log("form", values);
    dispatch({
      type: "ADD",
      payload: { ...values, role: tabs },
    });
    setStep(2);
  };

  const checkRoleHand = e => {
    setCheckRole(e.target.checked);
  };

  return (
    <div>
      <h1 className={classes.header}>ثبت نام کنید </h1>
      <DynamicTabs tabs={tabsNames} onChange={onChange} value={tabs} />
      <Form
        layout="vertical"
        name="normal_login"
        onFinish={onFinish}
        requiredMark={false}
        style={{ width: "100%", marginTop: "30px" }}
        initialValues={{
          phone_number: state?.phone_number,
          password: state?.password,
        }}
      >
        <Form.Item
          name="phone_number"
          label={<div className={classes.label}>شماره همراه</div>}
          rules={[
            {
              required: true,
              message: "شماره همراه را وارد کنید",
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
        <Form.Item
          name="password"
          label={<div className={classes.label}>گذرواژه</div>}
          rules={[
            {
              required: true,
              message: "گذرواژه را وارد کنید",
            },
          ]}
        >
          <AntPass
            className={classes.input}
            placeholder="گذرواژه خود را وارد کنید"
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item>
            <Checkbox className={classes.checkbox} onChange={checkRoleHand}>
              <div className={classes.check}>
                با <span onClick={()=>Reoverlay.showModal("ModalRules")}>شرایط و قوانین </span> سایت عرشیا راهساز موافق هستم
              </div>
            </Checkbox>
          </Form.Item>
        </div>
        <div className={classes.actions}>
          <Button
            width="100%"
            className={classes.btn_login}
            type="submit"
            disabled={!checkRole}
          >
            مرحله بعد
          </Button>
          <div className={classes.register}>
            قبلا ثبت نام کرده اید؟
            <Link href={"/auth/login"}>
              <span>ورود</span>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Step1;
