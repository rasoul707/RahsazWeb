import React from "react";
import LayoutDash from "Components/PageComponent/Dashboard/LayoutDash";
import MyMessages from "Components/PageComponent/Dashboard/Messages/MyMessages";
import { getMessages } from "Services/dashboard.api";
import { useState } from "react";
import { useEffect } from "react";
import { Spin } from "antd";
import Head from "next/head";

const Messages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("data", data);
  useEffect(() => {
    setLoading(true);
    getMessages()
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
       پیغام ها
     </title>
   </Head>
    <LayoutDash>
      <Spin spinning={loading}>
      {loading&&<div style={{height:"500px"}} />}
        {!loading && <MyMessages data={data} />}</Spin>
    </LayoutDash>
    </>
  );
};

export default Messages;
