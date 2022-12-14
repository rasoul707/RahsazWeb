import { makeStyles } from "@material-ui/core";
import { Checkbox, Form, Input } from "antd";
import AntInput from "Components/Inputs/AntInput";
import React from "react";
import Link from "next/link";
import { AntPass } from "Components/Inputs/AntInput";
import { Button } from "Components/Button";
import { useState } from "react";
import { loginViaPhone } from "Services/auth.api";
import { useDispatch } from "react-redux";
import { loginAction } from "ReduxWrapper/actions";
import { getCart } from "Services/order.api";
import { useRouter } from "next/router";
import { initialCart } from "ReduxWrapper/actions/order.action";

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
  actions: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
  },
  forget: {
    ...theme.font.s14w500,
    color: theme.color.boldOrange,
    cursor: "pointer",
  },
  register: {
    ...theme.font.s14w700,
    display: "flex",
    alignItems: "center",
    gap: "5px",
    "& span": {
      color: theme.color.boldOrange,
      cursor: "pointer",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async values => {
    setLoading(true);
    try {
      await loginViaPhone(values.phone_number, values.password)
        .then(async res => {
          await dispatch(loginAction(res.data));
        })
        .then(async res => {
          return await getCart().then(async res => {
            await dispatch(initialCart(res));
            setLoading(false);

            return router.push("/");
          });
        })
        .catch(err => {
          setLoading(false);
        });
    } catch (error) {}
  };
  return (
    <div className={classes.root}>
      <h2>???????? ???? ???????? ????</h2>
      <Form
        layout="vertical"
        name="normal_login"
        initialValues={{
          rememberMe: true,
          requiredMarkValue: false,
        }}
        onFinish={onFinish}
        requiredMark={false}
        style={{ width: "100%" }}
      >
        <Form.Item
          name="phone_number"
          label={<div className={classes.label}>???????? ???? ?????????? ??????????</div>}
          rules={[
            {
              required: true,
              message: "?????????? ?????????? ???? ???????? ????????",
            },
            {
              type: "number",
              message: "?????????? ???????? ?????????? ???????? ????????",
              transform: value => Number(value),
            },
          ]}
        >
          <AntInput
            className={classes.input}
            placeholder="?????????? ?????????? ?????? ???? ???????? ????????"
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div className={classes.label}>
              ??????????????
              <Link href={"/auth/forget"}>
                <span className={classes.forget}>?????????????? ?????? ????????</span>
              </Link>
            </div>
          }
          rules={[
            {
              required: true,
              message: "?????????????? ???? ???????? ????????",
            },
          ]}
        >
          <AntPass
            className={classes.input}
            placeholder="?????????????? ?????? ???? ???????? ????????"
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox className={classes.checkbox}>?????? ?????????? ??????????</Checkbox>
          </Form.Item>
        </div>
        <div className={classes.actions}>
          <Button
            width="100%"
            loading={loading}
            className={classes.btn_login}
            type="submit"
          >
            ????????
          </Button>
          <Button
            width="100%"
            isLink
            href="/auth/login/otp"
            bordered
            className={classes.btn_login}
          >
            ???????? ???? ?????? ???????? ?????????? ????????
          </Button>
          <div className={classes.register}>
            ?????? ?????? ?????????? ????????
            <Link href={"/auth/register"}>
              <span>??????????</span>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
