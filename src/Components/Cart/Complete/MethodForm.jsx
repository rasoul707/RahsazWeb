import { makeStyles } from "@material-ui/styles";
import { Col, Form, Row, Upload } from "antd";
import React from "react";
import AntInput from "Components/Inputs/AntInput";
import { Button } from "Components/Button";
import { useState } from "react";
import UploadIcon from "Assets/img/icons/upload.svg";
import { DatePicker } from "jalali-react-datepicker";
import moment from "jalali-moment";
import { orderBank, uploadImage } from "Services/order.api";
import { useSelector } from "react-redux";
import { toast } from "Utils/toast";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: "28px",
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
    "& .ant-upload.ant-upload-drag .ant-upload-btn": {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  label: {
    ...theme.font.s14w700,
  },

  picker: {
    width: "100%",
    borderRadius: 12,
    height: "44px",
    direction: "ltr !important",
    border: "1px solid #EBEBEB",
  },

  upload: {
    "& .ant-upload.ant-upload-select-picture-card": {
      width: "100%",
      height: "318px",
    },
    "& .ant-upload-list-picture-card-container": {
      width: "100%",
      height: "100%",
    },
    "& .ant-upload.ant-upload-select-picture-card:hover": {
      borderColor: theme.color.boldOrange,
    },
  },
  upload_text: {
    "& p": {
      color: "#C4C4C4",
      ...theme.font.s14w400,
    },
  },
  input: {
    border: "1px solid #EBEBEB",
  },
}));

const MethodForm = () => {
  const { currentOrder } = useSelector(state => state.cart);
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  const onFinish = async values => {
    setLoading(true)
    let splitDate = date.split("/");
    let finalDate = `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`;
    try {
      const imageId = await uploadImage(values?.dragger?.[0]?.originFileObj).catch(err=>setLoading(false));
      let clone = { ...values };
      delete clone.dragger;
      await orderBank(currentOrder, {
        ...clone,
        document_created_at: finalDate,
        bank_receipt_image_id: imageId?.id,
      })
        .then(res => {
          setLoading(false);
          router.push("/cart/success-bank-details")
        })
        .catch(err => setLoading(false));
    } catch (error) {}
  };

  const [fileList, setFileList] = useState([]);
  const [date, setDate] = useState(
    moment().locale("fa").format("jYYYY/jMM/jDD"),
  );
  const classes = useStyles();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  function submitExample({ value }) {
    setDate(moment(value).locale("fa").format("jYYYY/jMM/jDD"));
  }

  return (
    <div className={classes.root}>
      <Form
        name="methodpay"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Row gutter={20}>
          <Col sm={24} xs={24} md={12}>
            <Form.Item
              name="document_created_at"
              label={<span className={classes.label}>تاریخ سند</span>}
            >
              <DatePicker
                className={classes.picker}
                placeholder="تاریخ سند خود را وارد کنید"
                timePicker={false}
                onClickSubmitButton={submitExample}
              />
            </Form.Item>
            <Form.Item
              name="bank_receipt_number"
              rules={[
                { required: true, message: "شماره فیش خود را وارد کنید " },
                {
                  type: "number",
                  message: "شماره فیش معتبر وارد کنید",
                  transform: value => Number(value),
                },
              ]}
              label={<span className={classes.label}>شماره فیش </span>}
            >
              <AntInput
                className={classes.input}
                placeholder="شماره فیش خود را وارد کنید"
              />
            </Form.Item>
            <Form.Item
              name="last_four_digit_of_card"
              rules={[
                {
                  required: true,
                  message: "4 رقم آخر شماره کارت خود را وارد کنید",
                },
                {
                  type: "number",
                  message: "شماره کارت معتبر وارد کنید",
                  transform: value => Number(value),
                },
              ]}
              label={
                <span className={classes.label}>4 رقم آخر شماره کارت</span>
              }
            >
              <AntInput
                maxLength={4}
                className={classes.input}
                placeholder="4 رقم آخر شماره کارت خود را وارد کنید"
              />
            </Form.Item>
            <Form.Item
              name="issue_tracking_number"
              rules={[
                { required: true, message: "شماره پیگیری خود را وارد کنید " },
                {
                  type: "number",
                  message: "شماره پیگیری معتبر وارد کنید ",
                  transform: value => Number(value),
                },
              ]}
              label={<span className={classes.label}>شماره پیگیری</span>}
            >
              <AntInput
                className={classes.input}
                placeholder="شماره پیگیری خود را وارد کنید "
              />
            </Form.Item>
            <Form.Item
              name="bank_name"
              rules={[{ required: true, message: "نام بانک را وارد کنید " }]}
              label={<span className={classes.label}>نام بانک </span>}
            >
              <AntInput
                className={classes.input}
                placeholder="نام بانک را وارد کنید "
              />
            </Form.Item>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className={classes.upload}
              rules={[
                {
                  required: true,
                  message: "عکس پرداختی فیش بانکی خود را آپلود کنید",
                },
              ]}
              // noStyle
            >
              <Upload
                name="files"
                listType="picture-card"
                accept=".png, .jpg, .jpeg,.bmp,.webm"
                onChange={onChange}
              >
                {fileList.length < 1 && (
                  <div className={classes.upload_text}>
                    <span>
                      <UploadIcon />
                    </span>
                    <p>عکس پرداختی فیش بانکی خود را آپلود کنید</p>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col sm={24} xs={24} md={12}>
            <Form.Item>
              <Button loading={loading} width="100%" type="submit">
                ثبت
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MethodForm;
