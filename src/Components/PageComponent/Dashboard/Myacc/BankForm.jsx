import { makeStyles } from "@material-ui/styles";
import { Col, Form, Row } from "antd";
import AntInput from "Components/Inputs/AntInput";
import React from "react";
import CollapseForm from "../CollapseForm";

const useStyles = makeStyles(theme => ({
  label: {
    ...theme.font.s14w700,
  },
  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",
    "& input": {
      backgroundColor: "#FAFAFA",
    },
  },
}));

const BankForm = () => {
  const classes = useStyles();
  return (
    <div>
      <CollapseForm header="اطلاعات بازگشت وجه">
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="refund_info_bank_name"
              label={<div className={classes.label}>نام بانک</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا نام بانک  خود را وارد کنید",
                // },
              ]}
            >
              <AntInput className={classes.input}/>
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="refund_info_account_holder_name"
              label={<div className={classes.label}>نام دارنده حساب </div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا نام دارنده حساب را وارد کنید",
                // },
              ]}
            >
              <AntInput className={classes.input}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="refund_info_cart_number"
              label={<div className={classes.label}>شماره کارت</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا شماره کارت  خود را وارد کنید",
                // },
                {
                  type: "number",
                  message: "شماره کارت  معتبر وارد کنید ",
                  transform: value => Number(value),
                },
              ]}
            >
              <AntInput className={classes.input}/>
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="refund_info_account_number"
              label={<div className={classes.label}>شماره حساب</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا شماره حساب را وارد کنید",
                // },
                {
                  type: "number",
                  message: "شماره کارت  معتبر وارد کنید ",
                  transform: value => Number(value),
                },
              ]}
            >
              <AntInput className={classes.input}/>
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="refund_info_sheba_number"
              label={<div className={classes.label}>شماره شبا</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا شماره شبا را وارد کنید",
                // },
                {
                  type: "number",
                  message: "شماره شبا  معتبر وارد کنید ",
                  transform: value => Number(value),
                },
              ]}
            >
              <AntInput className={classes.input}/>
            </Form.Item>
          </Col>
        </Row>
      </CollapseForm>
    </div>
  );
};

export default BankForm;
