import { makeStyles } from "@material-ui/styles";
import { Col, Form, Row, Select} from "antd";
import AntInput from "Components/Inputs/AntInput";
import React from "react";
import CollapseForm from "../CollapseForm";
import { useState } from "react";
const { shahr, ostan } = require("iran-cities-json");
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
const { Option } = Select;

const useStyles = makeStyles(theme => ({
  root: {
    "& .DatePicker": {
      width:"100%"
    },
    "& .ant-picker-suffix": {
      "& path": {
        fill: theme.color.boldOrange,
      },
    },
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
  picker: {
    width: "100%",
    borderRadius: 12,
    height: "44px",
    direction: "ltr !important",
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",
    textAlign: "left",
  },
  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",
    "& input": {
      backgroundColor: "#FAFAFA",
    },
  },
}));

const InfoForm = ({ setDate, date }) => {
  const classes = useStyles();
  const [selcetedOstanId, setSelectedOstanId] = useState("");

  const selectHand = value => {
    let findId = ostan.filter(os => os.name == value)?.[0]?.id;
    setSelectedOstanId(findId);
  };
  console.log("date in down", date);

  return (
    <div className={classes.root}>
      <CollapseForm header="اطلاعات شخصی">
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="first_name"
              label={<div className={classes.label}>نام</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا نام  خود را وارد کنید",
                // },
              ]}
            >
              <AntInput className={classes.input} />
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="last_name"
              label={<div className={classes.label}>نام خانوادگی </div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا نام خانوادگی  خود را وارد کنید",
                // },
              ]}
            >
              <AntInput className={classes.input} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              // name="birthdays"
              label={<div className={classes.label}>تاریخ تولد</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا تاریخ تولد  خود را وارد کنید",
                // },
              ]}
            >
              <DatePicker
                inputClassName={classes.picker}
                value={date}
                shouldHighlightWeekends
                locale="fa"
                onChange={setDate}
              />
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="phone_number"
              label={<div className={classes.label}>شماره همراه </div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا شماره همراه خود را وارد کنید",
                // },
                {
                  type: "number",
                  message: "شماره تماس معتبر وارد کنید ",
                  transform: value => Number(value),
                },
              ]}
            >
              <AntInput className={classes.input} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={24}>
            <Form.Item
              name="email"
              label={<div className={classes.label}>ایمیل</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا ایمیل خود را وارد کنید",
                // },
                {
                  type: "email",
                  message: "ایمیل معتبر وارد کنید",
                },
              ]}
            >
              <AntInput className={classes.input} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="state"
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
                className={classes.input}
                placeholder={
                  <div className={classes.label}>استان را انتخاب کنید</div>
                }
              >
                {ostan.map(item => (
                  <Option
                    key={item.id}
                    value={item.name}
                    className={classes.input}
                  >
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sx={24} xs={24} md={24} lg={12}>
            <Form.Item
              name="city"
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
          <Col sx={24} xs={24} md={24} lg={24}>
            <Form.Item
              name="address"
              label={<div className={classes.label}>آدرس</div>}
              rules={[
                // {
                //   required: true,
                //   message: "لطفا آدرس خود را وارد کنید",
                // },
              ]}
            >
              <AntInput className={classes.input} />
            </Form.Item>
          </Col>
        </Row>
      </CollapseForm>
    </div>
  );
};

export default InfoForm;
