import { makeStyles } from "@material-ui/core";
import { Col, Form, Row, Select } from "antd";
import AntInput from "Components/Inputs/AntInput";
import React from "react";
import { useState } from "react";
import CollapseForm from "../CollapseForm";
const { shahr, ostan } = require("iran-cities-json");

const { Option } = Select;

const useStyles = makeStyles(theme => ({
  root: {
    "& .ant-select-selector": {
      width: "100%",
      height: "44px !important",
      borderRadius: "12px !important",
    },
    "& .ant-select-selection-item": {
      display: "flex",
      alignItems: "center",
    },
  },
  label: {
    ...theme.font.s14w700,
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",
    "& input": {
      backgroundColor: "#FAFAFA",
    },
  },
}));

const PersonInfo = () => {
  const classes = useStyles();
  const [selcetedOstanId, setSelectedOstanId] = useState("");

  const selectHand = value => {
    let findId = ostan.filter(os => os.name == value)?.[0]?.id;
    setSelectedOstanId(findId);
  };

  return (
    <div className={classes.root}>
      <CollapseForm header="اطلاعات اشخاص حقوقی">
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="legal_info_melli_code"
              label={<div className={classes.label}>شناسه ملی</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا شناسه ملی  خود را وارد کنید",
                // },
              ]}
            >
              <AntInput className={classes.input}/>
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="legal_info_economical_code"
              label={<div className={classes.label}>کد اقتصادی</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا کد اقتصادی  خود را وارد کنید",
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
              name="legal_info_registration_number"
              label={<div className={classes.label}>شماره ثبت</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا شماره ثبت خود را وارد کنید",
                // },
              ]}
            >
              <AntInput className={classes.input}/>
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="legal_info_company_name"
              label={<div className={classes.label}>نام کامل شرکت</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا نام کامل شرکت را وارد کنید",
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
              name="legal_info_state"
              label={<div className={classes.label}>استان</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا استان خود را وارد کنید",
                // },
              ]}
            >
             <Select
                  style={{
                    width: "100%",
                    height: "44px",
                    borderRadius: 12,
                  }}
                  onChange={selectHand}
                  placeholder={
                    <div className={classes.label}>استان را انتخاب کنید</div>
                  }
                >
                  {ostan.map(item => (
                    <Option key={item.id} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="legal_info_city"
              label={<div className={classes.label}>شهر</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا شهر خود را وارد کنید",
                // },
              ]}
            >
              <Select
                  style={{
                    width: "100%",
                    height: "44px",
                    borderRadius: 12,
                  }}
                >
                  {shahr
                    .filter(ct => ct.ostan == selcetedOstanId)
                    ?.map(item => (
                      <Option key={item.id} value={item.name}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="legal_info_address"
              label={<div className={classes.label}>آدرس</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا آدرس خود را وارد کنید",
                // },
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

export default PersonInfo;
