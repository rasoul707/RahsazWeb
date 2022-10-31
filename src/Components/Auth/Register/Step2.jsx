import { makeStyles } from "@material-ui/core";
import { Col, Form, Row, Select } from "antd";
import { Button } from "Components/Button";
import AntInput from "Components/Inputs/AntInput";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ostan, shahr } from "iran-cities-json";
import React from "react";
import { useState } from "react";
import { dynamicInfo } from "Utils/registerForms";
const { Option } = Select;
import ArrowIcon from "Assets/img/icons/arrow-right.svg";

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
    "& .ant-select-rtl.ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-rtl.ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder":
      {
        display: "flex",
        alignItems: "center",
      },
  },
  header: {
    ...theme.font.s18w700,
    marginTop:"20px",
    cursor:"pointer",
    display:"flex",
    alignItems:"center",
    gap:"8px"
  },
  subheader:{
    ...theme.font.s16w700,
    marginTop:"30px"
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
  form_wrapper: {
    width: "100%",
    maxHeight: "450px",
    overflowY: "auto",
    overflowX: "hidden",
    paddingRight: "10px",
    marginBottom: "20px",
    "@media only screen and (max-width: 960px)": {
      maxHeight: "100%",
      padding: "0",
      marginBottom: "0px",
    },
  },
}));

const Step2 = ({ dynamicForm, tabs, dispatch,setStep,state }) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  console.log("dynamicForm", dynamicForm);
  const [selcetedOstanId, setSelectedOstanId] = useState("");

  const selectHand = value => {
    let findId = ostan.filter(os => os.name == value)?.[0]?.id;
    setSelectedOstanId(findId);
  };

  const onFinish = values => {
    console.log("dynamic submit", values);
    dispatch({
      type: "ADD",
      payload:values
    });
    setStep(3)
  };
  return (
    <div className={classes.root}>
        <h2 onClick={() => setStep(pre=>pre-1)} className={classes.header}>
        {" "}
        <ArrowIcon /> بازگشت به مرحله قبل{" "}
      </h2>
      <h3  className={classes.subheader}>
        {tabs == "شرکت"
          ? "اطلاعات شرکت "
          : tabs == "همکار"
          ? "اطلاعات فروشگاه"
          : "اطلاعات شخصی"}
      </h3>
      <Form
        layout="vertical"
        name="normal_reg"
        onFinish={onFinish}
        requiredMark={false}
        style={{ width: "100%", marginTop: "20px" }}
       initialValues={state}
      >
        <div className={classes.form_wrapper}>
          <Row gutter={[20]}>
            {dynamicForm?.map(form => {
              return (
                <Col key={form} sm={24} xs={24} md={dynamicInfo[form]?.span}>
                  <Form.Item
                    name={form}
                    label={
                      <div className={classes.label}>
                        {dynamicInfo[form]?.label}
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: dynamicInfo[form]?.placeholder,
                      },
                      dynamicInfo[form]?.rules,
                    ]}
                  >
                    {form.includes("state") || form.includes("city") ? (
                      <Select
                        style={{
                          width: "100%",
                          height: "44px",
                          borderRadius: 12,
                        }}
                        onChange={
                          form.includes("state") ? selectHand : () => null
                        }
                        className={classes.input}
                        placeholder={
                          <div className={classes.label}>
                            {dynamicInfo[form]?.placeholder}
                          </div>
                        }
                      >
                        {form.includes("state")
                          ? ostan.map(item => (
                              <Option
                                key={item.id}
                                value={item.name}
                                className={classes.input}
                              >
                                {item.name}
                              </Option>
                            ))
                          : shahr
                              .filter(ct => ct.ostan == selcetedOstanId)
                              ?.map(item => (
                                <Option key={item.id} value={item.name}>
                                  {item.name}
                                </Option>
                              ))}
                      </Select>
                    ) : (
                      <AntInput
                        className={classes.input}
                        placeholder={dynamicInfo[form]?.placeholder}
                      />
                    )}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        </div>

        <div className={classes.actions}>
          <Button width="100%" className={classes.btn_login} type="submit">
            مرحله بعد
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step2;
