import { makeStyles } from "@material-ui/core";
import { Col, Form, Row, Select } from "antd";
import React, { useRef } from "react";
import AddressInfo from "./AddressInfo";
import Plus from "Assets/img/icons/plus.svg";
import { useState } from "react";
import ModalAddress from "./ModalAddress";
const { Option } = Select;

const useStyles = makeStyles(theme => ({
  root: {
    "& .ant-select-selector": {
      width: "100%",
      height: "44px !important",
      borderRadius: "12px !important",
    },
  },
  left: {
    border: "1px dashed #EBEBEB",
    boxSizing: " border-box",
    borderRadius: 8,
    padding: 20,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div": {
      cursor: "pointer",
      ...theme.font.s14w500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
  },
}));

const MyAddress = ({ address, setUpdate }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const refForm = useRef();
  const [editMode, setEditMode] = useState({
    show: false,
    id: "",
  });
  console.log("editMode", editMode);

  const modalHand = () => {
    setModal(false);
    setEditMode({
      show: false,
      id: "",
    });
  };

  return (
    <div className={classes.root}>
      <Row gutter={[24, 24]}>
        {address?.map((item, i) => (
          <Col key={item.id} sm={24} xs={24} md={24} xl={12} xxl={12}>
            <AddressInfo
              refForm={refForm}
              item={item}
              setEditMode={setEditMode}
              index={i}
            />
          </Col>
        ))}
        <Col sm={24} xs={24} md={24} xl={12} xxl={12}>
          <div className={classes.left} onClick={modalHand}>
            <div>
              {" "}
              <Plus /> اضافه کردن آدرس جدید{" "}
            </div>
          </div>
        </Col>
      </Row>
      <>
        {(editMode?.show || modal) && (
          <ModalAddress
            modal={modal}
            modalHand={modalHand}
            setUpdate={setUpdate}
            editMode={editMode}
            refForm={refForm}
          />
        )}
      </>
    </div>
  );
};

export default MyAddress;
