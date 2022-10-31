import LayoutDash from "Components/PageComponent/Dashboard/LayoutDash";
import MyAddress from "Components/PageComponent/Dashboard/Address/MyAddress";
import React from "react";
import { getAddress } from "Services/dashboard.api";
import { useState } from "react";
import { useEffect } from "react";
import { Spin } from "antd";
import Head from "next/head";

const Address = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  console.log("add", address);
  useEffect(() => {
    setLoading(true);
    getAddress()
      .then(res => {
        setAddress(res);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [update]);

  return (
    <>
      <Head>
        <title>آدرس های من</title>
      </Head>
      <LayoutDash>
        <Spin spinning={loading}>
          {loading && <div style={{ height: "500px" }} />}
          {!loading && <MyAddress address={address} setUpdate={setUpdate} />}
        </Spin>
      </LayoutDash>
    </>
  );
};

export default Address;
