import React from "react";
import LayoutDash from "Components/PageComponent/Dashboard/LayoutDash";

import { useState } from "react";
import DynamicTabs from "Components/PageComponent/Dashboard/DynamicTabs";
import MyOrdersPage from "Components/PageComponent/Dashboard/MyOrders";
import { getAllOrders, getOrders } from "Services/order.api";
import { useEffect } from "react";
import { Spin } from "antd";
import Pagintaion from "Components/ui/Pagintaion";
import Head from "next/head";

const MyOrders = () => {
  const [tabs, setTabs] = useState("در حال پردازش");
  console.log("tabs", tabs);

  const tabsNames = [
    {
      name: "در حال پردازش",
      id: 1,
    },
    {
      name: "تکمیل شده",
      id: 2,
    },
    {
      name: "پرداخت نشده",
      id: 3,
    }
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  console.log("data", data);
  useEffect(() => {
    setLoading(true);
    getAllOrders({
      offset,
      overall_status: tabs,
    })
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [tabs,offset]);
  function onChange(value) {
    setTabs(value);
  }
  const hanldePaginationChange = page => {
    setOffset(page - 1);
  };
  return (
    <>
    <Head>
      <title>
        سفارشات من
      </title>
    </Head>
    <LayoutDash>
      <DynamicTabs full={false} tabs={tabsNames} onChange={onChange} />
      <Spin spinning={loading}>
        {!loading && <MyOrdersPage data={data} />}
        {loading&&<div style={{height:"500px"}} />}
        </Spin>
      <div
        style={{
          width: "100%",
          marginTop: 32,
          paddingBottom: 32,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagintaion
          total={data?.total_count}
          onChange={hanldePaginationChange}
          pageSize={25}
          current={+offset + 1}
        />
      </div>
    </LayoutDash>
    </>
  );
};

export default MyOrders;
