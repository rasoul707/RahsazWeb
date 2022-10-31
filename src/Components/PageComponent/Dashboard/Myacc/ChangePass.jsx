import React from "react";
import { Col, Form, Row, Input } from "antd";
import { makeStyles } from "@material-ui/styles";
import CollapseForm from "../CollapseForm";

const useStyles = makeStyles(theme => ({
  label: {
    ...theme.font.s14w700,
  },
  input: {
    height: "44px ",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",
    "& input": {
      backgroundColor: "#FAFAFA",
    },
  },
}));

const ChangePass = () => {
  const classes = useStyles();
  return (
    <div>
      <CollapseForm header="تغییر گذرواژه">
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="old_password"
              label={<div className={classes.label}>گذرواژه پیشین</div>}
            >
              <Input.Password className={classes.input} />
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="new_password"
              label={<div className={classes.label}>گذرواژه جدید</div>}
            >
              <Input.Password className={classes.input} />
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="new_password_confirmation"
              dependencies={["new-pass"]}
              label={<div className={classes.label}>تکرار گذرواژه جدید</div>}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("گذرواژه مطابقت ندارد"));
                  },
                }),
              ]}
            >
              <Input.Password className={classes.input} />
            </Form.Item>
          </Col>
        </Row>
      </CollapseForm>
    </div>
  );
};

export default ChangePass;
