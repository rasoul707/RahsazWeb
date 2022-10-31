import { makeStyles } from "@material-ui/styles";
import CollapseForm from "Components/PageComponent/Dashboard/CollapseForm";
import React from "react";
import Plus from "Assets/img/icons/plus.svg";
import AddressInfo from "Components/PageComponent/Dashboard/Address/AddressInfo";
import { Col, Row, Spin } from "antd";
import ModalAddress from "Components/PageComponent/Dashboard/Address/ModalAddress";
import { useState } from "react";
import { orderAddress } from "Services/order.api";
import { useSelector } from "react-redux";
import { Button } from "Components/Button";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    padding: 20,
    "@media(max-width: 960px)": {
      padding: 0,
    },
  },
  left: {
    border: "1px dashed #1F75F6",
    background: "rgba(31, 117, 246, 0.05)",
    cursor: "pointer",
    boxSizing: " border-box",
    borderRadius: 8,
    padding: 10,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div": {
      color: "#1F75F6",
      ...theme.font.s14w500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      "& path": {
        fill: "#1F75F6",
      },
    },
  },
  row: {
    "@media(max-width: 960px)": {
      paddingTop: 20,
    },
  },
}));

const AddressCard = ({
  active,
  address,
  setSteps,
  setUpdate,
  loading,
  state,
}) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const modalHand = () => {
    setModal(!modal);
  };

  const clickHandler = async id => {
    setSelected(id);
    try {
      await orderAddress(state?.currentOrder, id)
        .then(res => {})
        .catch(err => err);
    } catch (error) {}
  };
  const nextHand = () => {
    if (selected) {
      setSteps(1)
    }
  };

  return (
    <div className={classes.root}>
      <CollapseForm header={"انتخاب آدرس ارسال"} number={1} open>
        <Spin spinning={loading}>
          <Row gutter={[24, 24]} className={classes.row}>
            {address?.map((item, i) => (
              <Col key={item.id} sm={24} xs={24} md={24} xl={12} xxl={12}>
                <AddressInfo
                  edit={false}
                  onClick={() => clickHandler(item.id)}
                  active={selected == item.id}
                  cart
                  item={item}
                  index={i}
                />
              </Col>
            ))}
            <Col sm={24} xs={24} md={24} xl={12} xxl={12}>
              <div className={classes.left} onClick={modalHand}>
                <div>
                  <Plus /> اضافه کردن آدرس جدید{" "}
                </div>
              </div>
            </Col>
            <Col sm={24} xs={24} md={24} xl={12} xxl={12}>
              <Button width="100%" onClick={nextHand} disabled={!selected}>
                مرحله بعد
              </Button>
            </Col>
          </Row>
        </Spin>

        <>
          <ModalAddress
            modal={modal}
            modalHand={modalHand}
            setUpdate={setUpdate}
          />
        </>
      </CollapseForm>
    </div>
  );
};

export default AddressCard;
