import { Col, Row } from "antd";
import MyDivider from "Components/ui/MyDivider";
import React from "react";
import CommentItem from "./CommentItem";

const Comments = ({ data }) => {
  console.log("data", data);
  return (
    <div>
      <Row>
        {data?.length ? (
          data?.map((item, i) => (
            <Col span={24} key={item.id}>
              <CommentItem item={item}/>
              {data.length - i != 1 && <MyDivider />}
            </Col>
          ))
        ) : (
          <h3 style={{ textAlign: "center", padding: "20px 0" }}>
            دیدگاهی وجود ندارد
          </h3>
        )}
      </Row>
    </div>
  );
};

export default Comments;
