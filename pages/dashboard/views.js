import React from "react";
import LayoutDash from "Components/PageComponent/Dashboard/LayoutDash";
import ViewProducts from "Components/PageComponent/Dashboard/ViewsProducts";
import { useState } from "react";
import { useEffect } from "react";
import { getViews } from "Services/dashboard.api";
import { Spin } from "antd";
import Head from "next/head";

const Views = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("data", data);
  useEffect(() => {
    setLoading(true);
    getViews()
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
       محصولات بازدید شده
     </title>
   </Head>
    <LayoutDash>
      <Spin spinning={loading}>
        {!loading && <ViewProducts data={data} />}
        {loading && <div style={{ height: "500px" }} />}
      </Spin>
    </LayoutDash>
    </>
  );
};

export default Views;
