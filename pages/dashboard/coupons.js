import { Spin } from "antd";
import MyCoupons from "Components/PageComponent/Dashboard/Coupons/MyCoupons";
import LayoutDash from "Components/PageComponent/Dashboard/LayoutDash";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getCoupons } from "Services/dashboard.api";
import Head from "next/head";

const Coupons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("data", data);
  useEffect(() => {
    setLoading(true);
    getCoupons()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Head>
      <title>
        تخفیف ها
      </title>
    </Head>
    <LayoutDash>
      <Spin spinning={loading}>
        {loading && <div style={{ height: "500px" }} />}
        {!loading && <MyCoupons data={data} />}
      </Spin>
    </LayoutDash>
    </>
  );
};

export default Coupons;
