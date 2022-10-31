import { makeStyles } from "@material-ui/core";
import React from "react";
import ModalHeader from "./ModalHeader";
import ModalWrapperCustom from "./ModalWrapperCustom";

const useStyles = makeStyles(theme => ({
  root: {
    "& img": {
      borderRadius: 8,
      maxHeight: "400px",
      width: "100%",
      marginBottom: "20px",
    },
    "& span": {
      color: "gray",
      ...theme.s14w700,
      marginBottom: "20px",
    },
    "& p": {
      ...theme.s14w700,
    },
  },
}));

const BijakModal = ({ img, note }) => {
  const classes = useStyles();
  return (
    <ModalWrapperCustom>
      <ModalHeader title="بارنامه" />
      <div className={classes.root}>
        <img src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${img || ""}`} alt="" />
        <div>
          <span> نوشته مسئول ارسال مرسوله :</span>
          <p>{note}</p>
        </div>
      </div>
    </ModalWrapperCustom>
  );
};

export default BijakModal;
