import { Divider } from "antd";
import React from "react";
import OrderItem from "./OrderItem";

const MyOrdersPage = ({ data }) => {
  console.log("orders", data);
  return (
    <div>
      {data?.items?.map((item, i) => {
        return (
          <React.Fragment key={item.id}>
            <OrderItem {...item} />
            {data?.items?.length - i != 1 && <Divider />}
          </React.Fragment>
        );
      })}
      {data?.items?.length==0&&<h3 style={{
        textAlign:"center",
        paddingTop:"50px",
        fontSize:"14px",
        fontWeight:700
      }}>سفارشی وجود ندارد</h3>}
    </div>
  );
};

export default MyOrdersPage;
