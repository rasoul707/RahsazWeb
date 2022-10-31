import { Col, Form, Row, Spin } from "antd";
import { Button } from "Components/Button";
import LayoutDash from "Components/PageComponent/Dashboard/LayoutDash";
import Myacc from "Components/PageComponent/Dashboard/Myacc";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "Services/dashboard.api";
import Head from "next/head";

const Dashboard = () => {
  const [profile, setProfile] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [date, setDate] = useState({});
  console.log("profile", profile);
  console.log("date", date);

  const onFinish = async values => {
    setLoadingBtn(true);
    let cloneProf = { ...values };
    delete cloneProf.new_password;
    delete cloneProf.new_password_confirmation;
    delete cloneProf.old_password;

    let dataSend = {
      ...cloneProf,
      birthday: `${date?.year}-${date?.month}-${date?.day}`,
    };
    console.log("dataSend ", dataSend);
    try {
      await updateProfile(dataSend)
        .then(res => {
          setLoadingBtn(false);
        })
        .catch(err => {
          setLoadingBtn(false);
        });
      if (
        values?.old_password &&
        values?.new_password_confirmation &&
        values?.new_password
      ) {
        await updatePassword({
          old_password: values?.old_password,
          new_password: values?.new_password,
          new_password_confirmation: values?.new_password_confirmation,
        })
          .then(res => {
            setLoadingBtn(false);
          })
          .catch(err => {
            setLoadingBtn(false);
          });
      }
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    getProfile()
      .then(res => {
        setProfile(res);
        let birthDays = res?.birthday?.split(" ");
        let birthLetter = birthDays?.[0]?.split("-");
        setDate({
          year: +birthLetter?.[0],
          month: +birthLetter?.[1],
          day: +birthLetter?.[2],
        });
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>حساب کاربری</title>
      </Head>
      <LayoutDash>
        <Spin spinning={loading}>
          {loading && <div style={{ height: "500px" }} />}
          {!loading && "id" in profile && (
            <Form
              name="form-dash"
              onFinish={onFinish}
              layout="vertical"
              initialValues={{
                phone_number: null,
                ...profile,
              }}
              requiredMark={false}
            >
              <Myacc date={date} setDate={setDate} />
              <Row style={{ marginTop: "20px", padding: "16px" }}>
                <Col sx={24} xs={24} md={24} lg={6}>
                  <Form.Item>
                    <Button
                      width="100%"
                      type="submit"
                      bordered
                      loading={loadingBtn}
                    >
                      ذخیره تغییرات
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </Spin>
      </LayoutDash>
    </>
  );
};

export default Dashboard;
