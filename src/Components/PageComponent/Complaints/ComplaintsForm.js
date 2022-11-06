import React from "react";
import { makeStyles } from "@material-ui/core";
import { Col, Form, Row } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import AntTextArea from "Components/Inputs/AntTextArea";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useState } from "react";
import { sendForms } from "Services";
import { Select } from "antd";

const { Option } = Select;

const useStyles = makeStyles(theme => ({
  root: {
    "& .ant-select-selector": {
      borderRadius: "12px !important",
      height: "44px !important",
      boxShadow: "none !important"
    },
    "& .ant-select:not(.ant-select-disabled):hover .ant-select-selector": {
      // borderColor:theme.color.boldOrange
    },
  },
  label: {
    ...theme.font.s14w700,
  },
  select: {},
}));

const ComplaintsForm = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { width } = useWindowDimensions();

  const onFinish = async values => {
    setLoading(true);
    console.log(values);
    let dataSend = {
      ...values,
      user_id: null,
      form_type: "انتقادات، پیشنهادات و شکایات",
    };
    const res = await sendForms(dataSend);
    form.resetFields();
    setLoading(false);
    console.log("res", res);
  };

  return (
    <div className={classes.root}>
      <Form
        name="cooperation"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        initialValues={{
          phone_number: null,
          request_type: "شکایت",
          section_type: "واحد فروش"
        }}
        requiredMark={false}
      >
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
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
              <AntInput placeholder="شماره تماس خود را وارد کنید " maxLength={11} minLength={11} />
            </Form.Item>
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
          </Col>
          <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
                <Form.Item
                  name="request_type"
                  label={<div className={classes.label}>نوع درخواست</div>}
                  rules={[
                    {
                      required: true,
                      message: "لطفا درخواست خود را وارد کنید",
                    },
                  ]}
                >
                  <Select
                    defaultValue="شکایت"
                    style={{ width: "100%" }}
                    size="large"
                  >
                    <Option value="شکایت">
                      شکایت
                    </Option>
                    <Option value="انتقاد">
                      انتقاد
                    </Option>
                    <Option value="پیشنهاد">
                      پیشنهاد
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} xl={12} xxl={12}>
                <Form.Item
                  name="section_type"
                  label={<div className={classes.label}>واحد مورد نظر</div>}
                  rules={[
                    {
                      required: true,
                      message: "لطفا واحد مورد نظر خود را وارد کنید",
                    },
                  ]}
                >
                  <Select
                    defaultValue="واحد فروش"
                    style={{ width: "100%" }}
                    size="large"
                    className={classes.select}
                  >
                    <Option value="واحد فروش" children="واحد فروش" />
                    <Option value="واحد حسابداری" children="واحد حسابداری" />
                    <Option value="واحد فنی" children="واحد فنی" />
                    <Option value="واحد انبار" children="واحد انبار" />
                    <Option value="مدیریت" children="مدیریت" />
                  </Select>
                </Form.Item>
              </Col>
            </Row>
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
              <AntTextArea
                placeholder="توضیحات خود را اینجا وارد کنید"
                rows={6}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="submit"
            width={width > 768 ? "25%" : "50%"}
            loading={loading}
          >
            ارسال درخواست
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ComplaintsForm;
