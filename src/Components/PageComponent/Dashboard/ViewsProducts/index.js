import { Col, Divider, Row } from "antd";
import useWindowDimensions from "hooks/useWindowDimensions";
import React from "react";
import ViewItem from "./ViewItem";

const ViewProducts = ({ data }) => {
  const { width } = useWindowDimensions();
  return (
    <div>
      <Row>
        {data?.map((item, i) => {
          return (
            <>
              <Col xs={24} sm={24} md={24} lg={12} key={item?.product_id}>
                <ViewItem
                  img={item?.product?.cover_image?.image?.path}
                  name={item?.product?.name}
                  price={item?.product?.purchase_price}
                  id={item?.product_id}
                />
              </Col>
              {(i + 1) % 2 == 0 && width > 960 && <Divider />}
              {width < 960 && <Divider />}
            </>
          );
        })}

        {/* {width < 960 && <Divider />}
        <Col xs={24} sm={24} md={24} lg={12}>
          <ViewItem />
        </Col>
        <Divider />
        <Col xs={24} sm={24} md={24} lg={12}>
          <ViewItem />
        </Col>
        {width < 960 && <Divider />}
        <Col xs={24} sm={24} md={24} lg={12}>
          <ViewItem />
        </Col> */}
      </Row>
    </div>
  );
};

export default ViewProducts;
