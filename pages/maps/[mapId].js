import MapsIndex from "Components/PageComponent/MapsIndex";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import CategoryFilter from "Components/Layout/CategoryFilter";
import { getMapsWithId } from "Services";
import { useRouter } from "next/router";
import { Spin } from "antd";

const Maps = () => {
  const { width } = useWindowDimensions();
  const { query } = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("data", data);
  useEffect(() => {
    setLoading(true);
    if (query?.mapId) {
      getMapsWithId(query?.mapId)
        .then(res => {
          setData(res);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    }
  }, [query?.mapId]);

  return (
    <>
      {width >= 900 && <CategoryFilter />}

      <main>
        <Spin spinning={loading}>
          {!loading && <MapsIndex {...data} />}
          {loading && <div style={{ height: "500px" }} />}
        </Spin>
      </main>
    </>
  );
};

export default Maps;
