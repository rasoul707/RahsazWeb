import { makeStyles } from "@material-ui/core";
import CollapseForm from "Components/PageComponent/Dashboard/CollapseForm";
import React from "react";

import Pakage from "Assets/img/icons/pakage.svg";
import Bus2 from "Assets/img/icons/bus2.svg";
import Bus1 from "Assets/img/icons/bus1.svg";
import { useState } from "react";
import { orderDelivery } from "Services/order.api";
import { Button } from "Components/Button";
import { Col, Row } from "antd";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    padding: 20,
    marginTop: 16,
    "@media(max-width: 960px)": {
      padding: 0,
    },
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    "@media(max-width: 960px)": {
      flexDirection: "column",
      paddingTop: "20px",
    },
  },
  item: {
    border: " 1px solid #333333",
    borderRadius: 8,
    width: "100%",
    padding: "20px 10px",
    color: theme.color.black,
    cursor: "pointer",
    ...theme.font.s14w400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    "& path": {
      fill: "#333333",
    },
    whiteSpace: "nowrap",
  },
  active: {
    borderColor: theme.color.boldOrange,
    color: theme.color.boldOrange,
    "& path": {
      fill: theme.color.boldOrange,
    },
  },
}));

const Sending = ({ active, setSteps, state }) => {
  const classes = useStyles({ active });
  const [selected, setSelected] = useState(null);
  let methods = [
    {
      id: 1,
      name: "تحویل درب انبار شرکت",
      icon: <Pakage />,
    },
    {
      id: 2,
      name: "باربری - پس کرایه",
      icon: <Bus2 />,
    },
    {
      id: 3,
      name: "اتوبوس - پس کرایه",
      icon: <Bus1 />,
    },
  ];

  const nextHand = () => {
    if (selected) {
      setSteps(2);
    }
  };
  const clickHandler = async name => {
    setSelected(name);
    try {
      await orderDelivery(state.currentOrder, name)
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {}
  };

  return (
    <div className={classes.root}>
      <CollapseForm header="نحوه ارسال مرسوله" number={2} open>
        {/* <div className={classes.actions}>
          {methods?.map(method => (
            <div
              key={method.id}
              className={`${classes.item} ${
                selected == method.name ? classes.active : ""
              }`}
              onClick={() => clickHandler(method.name)}
            >
              {method.icon} {method.name}
            </div>
          ))}
        </div> */}

        <Row gutter={[20, 20]}>
          {methods?.map(method => (
            <Col sm={24} xs={24} md={24} xl={8} key={method.id}>
              <div
                className={`${classes.item} ${
                  selected == method.name ? classes.active : ""
                }`}
                onClick={() => clickHandler(method.name)}
              >
                {method.icon} {method.name}
              </div>
            </Col>
          ))}
          <Col sm={24} xs={24} md={24} xl={8}>
            <Button width="100%" onClick={nextHand} disabled={!selected}>
              مرحله بعد
            </Button>
          </Col>
        </Row>
      </CollapseForm>
    </div>
  );
};

export default Sending;
