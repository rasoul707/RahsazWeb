import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useState } from "react";
import CloseIcon from "Assets/img/icons/Xicon.svg";
import CetegoryFilter from "../CategoryFilter";
const useStyles = makeStyles(theme => ({
  main: {
    border: "1px solid #EBEBEB",
    width: "100%",
    padding: "12px 0",
    borderRadius: "8px",
    zIndex: 101,
    background: "#fff",
    display: "flex",
    flexDirection:"column",
   gap:30
  },
  root: {
    "& p": {
      color: "#616161",
      ...theme.s14w700,
      textAlign: "center",
      width: "100%",
    },
    "& span": {
      display: "flex",
      alignItems: "center",
      paddingLeft: "20px",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mask: {
    background: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 50,
  },
}));

const CategoryMobile = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.root} onClick={() => setOpen(!open)}>
        {open && (
          <span>
            <CloseIcon />
          </span>
        )}
        <p>جستجو پیشرفته محصولات</p>
      </div>
      {open && (
        <div className={classes.products}>
          <CetegoryFilter setOpen={setOpen}/>
        </div>
      )}
      {/* {open && <div className={classes.mask} />} */}
    </div>
  );
};

export default CategoryMobile;
