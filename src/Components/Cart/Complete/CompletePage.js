import { Col, Row } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getAbout } from "Services";
import { getAddress } from "Services/dashboard.api";
import AddressCard from "./AddressCard";
import CheckoutBox from "./CheckoutBox";
import MethodPay from "./MethodPay";
import Sending from "./Sending";
import { Steps } from "antd";
import Bus2 from "Assets/img/icons/bus2.svg";
import BankIcon from "Assets/img/icons/bookmark.svg";
import AddressIcon from "Assets/img/icons/address.svg";

import { makeStyles } from "@material-ui/styles";

const { Step } = Steps;

const useStyles = makeStyles(theme => ({
  icons: {
    "& path": {
      fill: "black",
    },
  },
  stepper: {
    "@media only screen and (max-width: 768px)": {
     height:"300px"
    },
  },
}));

const CompletePage = ({ cart, setFull,currentOrder }) => {
  const [steps, setSteps] = useState(0);
  const classes = useStyles();
  const [address, setAddress] = useState([]);
  const [about, setAbout] = useState([]);

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const state = useSelector(state => state.cart);

  useEffect(() => {
    setLoading(true);
    getAddress()
      .then(res => {
        setAddress(res);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });

    getAbout()
      .then(res => {
        setAbout(res);
      })
      .catch(err => err);
  }, [update]);


  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col sm={24} xs={24} md={16}>
          <div style={{ marginBottom: "20px" }}>
            <Steps current={steps} className={classes.stepper} progressDot >
              <Step
                title="انتخاب آدرس"
                // icon={
                //   <span className={classes.icons}>
                //     <AddressIcon />
                //   </span>
                // }
              />
              <Step
                title="نحوه ارسال"
                // icon={
                //   <span className={classes.icons}>
                //     <Bus2 />
                //   </span>
                // }
              />
              <Step
                title="پرداخت"
                // icon={
                //   <span className={classes.icons}>
                //     <BankIcon />
                //   </span>
                // }
              />
            </Steps>
          </div>

          {steps == 0 && (
            <AddressCard
              address={address}
              setSteps={setSteps}
              loading={loading}
              setUpdate={setUpdate}
              state={state}
            />
          )}
          {steps == 1 && <Sending setSteps={setSteps} state={state} />}
          {steps == 2 && (
            <MethodPay setSteps={setSteps} state={state} about={about} />
          )}
        </Col>
        <Col sm={24} xs={24} md={8}>
          <CheckoutBox cart={cart} state={state} setFull={setFull} currentOrder={currentOrder} />
        </Col>
      </Row>
    </div>
  );
};

export default CompletePage;
