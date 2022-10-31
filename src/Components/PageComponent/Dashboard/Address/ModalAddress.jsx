import React from "react";

import { Col, Form, Row, Select } from "antd";
import { makeStyles } from "@material-ui/core";
import AntInput from "Components/Inputs/AntInput";
import Modal from "Components/ui/Modal";
import { Button } from "Components/Button";
import { useState } from "react";
import { editAddress, postAddress } from "Services/dashboard.api";
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
  modal_title: {
    ...theme.font.s16w700,
    fontFamily: "Iran Yekan",
    // textAlign: "center",
    margin: 0,
  },
  actions: {
    display: "flex",
    gap: "20px",
    justifyContent: "flex-end",
  },
  input: {
    backgroundColor: "#FAFAFA",
    border: "1px solid #FAFAFA",
    "& input": {
      backgroundColor: "#FAFAFA",
    },
  },
}));
const ModalAddress = ({
  modal,
  modalHand,
  setUpdate,
  editMode = { show: false, id: "" },
}) => {
  const classes = useStyles();
  const onFinish = async values => {
    try {
      if (editMode?.show) {
        await editAddress(editMode?.id, values)
          .then(res => {
            setUpdate(pre => !pre);
            modalHand();
          })
          .catch(err => err);
      } else {
        await postAddress(values)
          .then(res => {
            setUpdate(pre => !pre);
            modalHand();
          })
          .catch(err => err);
      }
    } catch (error) {}
  };

  const [selcetedOstanId, setSelectedOstanId] = useState("");

  const selectHand = value => {
    let findId = ostan.filter(os => os.name == value)?.[0]?.id;
    setSelectedOstanId(findId);
  };

  return (
    <Modal
      isVisible={modal || editMode.show}
      handleCancel={modalHand}
      title={
        <h1 className={classes.modal_title}>
          {editMode.show ? "ویرایش آدرس" : "اضافه کردن آدرس"}
        </h1>
      }
    >
      <div className={classes.root}>
        <Form
          name="form-dash"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            country: editMode?.item?.country,
            city: editMode?.item?.city,
            location: editMode?.item?.location,
          }}
          requiredMark={false}
        >
          <Row gutter={24}>
            <Col sm={24} xs={24} md={12}>
              <Form.Item
                name="country"
                label={<div className={classes.label}>استان</div>}
                rules={[
                  {
                    required: true,
                    message: "لطفا استان خود را وارد کنید",
                  },
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
            <Col sm={24} xs={24} md={12}>
              <Form.Item
                name="city"
                label={<div className={classes.label}>شهر</div>}
                rules={[
                  {
                    required: true,
                    message: "لطفا شهر خود را وارد کنید",
                  },
                ]}
              >
                <Select
                  style={{
                    width: "100%",
                    height: "44px",
                    borderRadius: 12,
                  }}
                  placeholder={
                    <div className={classes.label}>شهر را انتخاب کنید</div>
                  }
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
            <Col span={24}>
              <Form.Item
                name="location"
                label={<div className={classes.label}>آدرس</div>}
                rules={[
                  {
                    required: true,
                    message: "لطفا آدرس خود را وارد کنید",
                  },
                ]}
              >
                <AntInput
                  className={classes.input}
                  placeholder="آدرس خود را وارد کنید"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col sm={24} xs={24} md={12}>
              <div className={classes.actions}>
                <Button bordered black onClick={modalHand}>
                  لغو کن
                </Button>
                <Button type="submit">ذخیره آدرس</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalAddress;
