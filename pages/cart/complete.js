import CompletePage from "Components/Cart/Complete/CompletePage";
import React from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { Spin } from "antd";
import { getOrders } from "Services/order.api";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const complete = () => {
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const { currentOrder } = useSelector(state => state.cart);
  const [cart, setCart] = useState({});
  console.log("cart", cart);

  useEffect(() => {
    setLoading(true);
    getOrders(currentOrder)
      .then(res => {
        setCart(res);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [update]);

  return (
    <main>
      <InnerContainer>
        <PageTemplate title="فرایند تکمیل سفارش">
          <Spin spinning={loading}>
             <CompletePage cart={cart} setFull={setUpdate} currentOrder={currentOrder}/>
          </Spin>
        </PageTemplate>
      </InnerContainer>
    </main>
  );
};

export default complete;
