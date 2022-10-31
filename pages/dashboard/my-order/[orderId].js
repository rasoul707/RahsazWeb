import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { getOrders } from "Services/order.api";
import OrderDetailsPage from "Components/PageComponent/Dashboard/MyOrders/Details/OrderDetailsPage";
import { Spin } from "antd";

import LayoutDash from "Components/PageComponent/Dashboard/LayoutDash";

const OrderDetail = () => {
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (router?.query?.orderId) {
      getOrders(router?.query?.orderId)
        .then(res => {
          setOrder(res);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    }
  }, [router?.query?.orderId]);
  return (
    <>
      <Head>
        <title>جزئیات سفارش</title>
      </Head>
      <LayoutDash noNav>
        <main>
          <Spin spinning={loading}>
            {!loading && <OrderDetailsPage order={order} />}
            {loading && <div style={{ height: "500px" }} />}
          </Spin>
        </main>
      </LayoutDash>
    </>
  );
};

export default OrderDetail;
