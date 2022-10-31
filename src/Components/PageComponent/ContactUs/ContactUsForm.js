import { makeStyles } from "@material-ui/core";
import { Col, Form, Row } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import AntTextArea from "Components/Inputs/AntTextArea";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sendForms } from "Services";

const useStyles = makeStyles(theme => ({
  root: {},
  label: {
    ...theme.font.s14w700,
  },
}));
const ContactUsForm = () => {
  const classes = useStyles();
  const { user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async values => {
    setLoading(true);
    console.log(values);
    let dataSend = { ...values, user_id:null, form_type: "تماس با ما" };
    const res = await sendForms(dataSend).catch(err=>setLoading(false));
    form.resetFields();
    setLoading(false);
    console.log("res", res);
  };

  return (
    <div className={classes.root}>
      <Form
        name="about-us"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        initialValues={{
          phone_number: null,
        }}
        requiredMark={false}
      >
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} xl={12} xxl={12} >
            <Form.Item
              name="full_name"
              label={<div className={classes.label}>نام و نام خانوادگی</div>}
              rules={[
                {
                  required: true,
                  message: "لطفا نام و نام خانوادگی خود را وارد کنید",
                },
              ]}
            >
              <AntInput placeholder="نام و نام خانوادگی خود را وارد کنید " />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} xl={12} xxl={12} >
            <Form.Item
              name="phone_number"
              label={<div className={classes.label}>شماره تماس</div>}
              rules={[
                {
                  required: true,
                  message: "لطفا شماره تماس خود را وارد کنید ",
                },
                {
                  type: "number",
                  message: "شماره تماس معتبر وارد کنید ",
                  transform: value => Number(value),
                },
              ]}
            >
              <AntInput placeholder="شماره تماس خود را وارد کنید " />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="email"
          label={<div className={classes.label}>ایمیل</div>}
          rules={[
            {
              required: true,
              message: "لطفا ایمیل خود را وارد کنید",
            },
            {
              type: "email",
              message: "لطفا ایمیل معتبر وارد کنید",
            },
          ]}
        >
          <AntInput placeholder="ایمیل خود را وارد کنید" />
        </Form.Item>
        <Form.Item
          name="description"
          label={<div className={classes.label}>توضیحات</div>}
          rules={[
            {
              required: true,
              message: "لطفا توضیحات خود را وارد کنید",
            },
          ]}
        >
          <AntTextArea placeholder="توضیحات خود را اینجا وارد کنید" />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item>
              <Button type="submit" width="100%" loading={loading}>
                ارسال درخواست
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactUsForm;
