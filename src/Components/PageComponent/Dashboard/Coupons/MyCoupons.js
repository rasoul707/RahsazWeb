import { Col, Row } from "antd";
import React from "react";
import CouponItem from "./CouponItem";

const MyCoupons = ({ data }) => {
  return (
    <div>
      <Row gutter={[20,20]}>
        {data.length ? (
          data.map(item => (
            <Col span={24} key={item.id}>
              <CouponItem {...item} />
            </Col>
          ))
        ) : (
          <h3 style={{ textAlign: "center", padding: "20px 0" }}>
            کد تخفیفی وجود ندارد
          </h3>
        )}
      </Row>
    </div>
  );
};

export default MyCoupons;
