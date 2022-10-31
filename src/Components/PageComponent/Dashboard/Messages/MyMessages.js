import { Col, Row } from "antd";
import React from "react";
import AlertItem from "./AlertItem";

const MyMessages = ({ data }) => {
  return (
    <div>
      <Row gutter={[24,24]}>
        {data.length ? (
          data.map(item => (
            <Col span={24} key={item.id} >
              <AlertItem text={item.text}/>
            </Col>
          ))
        ) : (
          <h3 style={{ textAlign: "center", padding: "20px 0" }}>
            {" "}
            پیغامی وجود ندارد{" "}
          </h3>
        )}
      </Row>
    </div>
  );
};

export default MyMessages;
