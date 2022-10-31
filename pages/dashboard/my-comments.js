import React from "react";
import LayoutDash from "Components/PageComponent/Dashboard/LayoutDash";
import Comments from "Components/PageComponent/Dashboard/Comments";
import { useState } from "react";
import { useEffect } from "react";
import { getComments } from "Services/dashboard.api";
import { Spin } from "antd";
import Head from "next/head";

const MyComments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getComments()
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
        نظرات من
      </title>
    </Head>
    <LayoutDash>
      <Spin spinning={loading}>
        {loading && <div style={{ height: "500px" }} />}
        {!loading && <Comments data={data} />}
      </Spin>
    </LayoutDash>
    </>
  );
};

export default MyComments;
