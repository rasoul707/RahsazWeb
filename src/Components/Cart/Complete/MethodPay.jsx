import React from "react";
import { makeStyles } from "@material-ui/core";
import CollapseForm from "Components/PageComponent/Dashboard/CollapseForm";
import { useState } from "react";
const MethodForm = dynamic(() => import("./MethodForm"));
import dynamic from "next/dynamic";
import { orderPay } from "Services/order.api";
import { filterByStr } from "Utils/helperFunction";
const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    padding: 20,
    marginTop: 16,
    "@media(max-width: 960px)": {
      padding: "0px",
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
    padding: "20px",
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
  bank_details: {
    display: "flex",
    paddingTop: "40px",
    gap: "10px",
    flexDirection: "column",
    "& h3":{
      ...theme.font.s14w700,
    }
  },
  bank_items: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    "@media(max-width: 960px)": {
      flexDirection:'column',
      gap:10
    },
  },
  bank_item: {
    display: "flex",
    flexDirection: "column",
    gap:5,
    "& p":{
      color:"#616161",
    ...theme.font.s14w400
    },
    "& h5":{
      color:"#616161",
      ...theme.font.s14w400
    }
  },
}));
const MethodPay = ({ active, state, about }) => {
  const classes = useStyles({ active });
  const [selected, setSelected] = useState(null);
  console.log(about);

  let sheba = filterByStr("sheba_number", "field_key", about)?.field_value;
  let bankNumber = filterByStr("bank_number", "field_key", about)?.field_value;
  let bankName = filterByStr("bank_name", "field_key", about)?.field_value;
  let accName= filterByStr("account_holder_name", "field_key", about)?.field_value;

  
  let methods = [
    {
      id: 1,
      name: "درگاه آنلاین",
    },
    {
      id: 2,
      name: "فیش بانکی",
    },
  ];

  const clickHandler = async name => {
    setSelected(name);
    try {
      await orderPay(state?.currentOrder, name)
        .then(res => res)
        .catch(err => {
          const error = err.response && (err.response || err.message);
          throw error;
        });
    } catch (error) {}
  };

  return (
    <div className={classes.root}>
      <CollapseForm header="شیوه پرداخت سفارش" number={3} open>
        <div className={classes.actions}>
          {methods?.map(method => (
            <div
              key={method.id}
              className={`${classes.item} ${
                selected == method.name ? classes.active : ""
              }`}
              onClick={() => clickHandler(method.name)}
            >
              {method.name}
            </div>
          ))}
        </div>
        {selected == "فیش بانکی" && (
          <div className={classes.bank_details}>
            <h3>مشخصات حساب</h3>
            <div className={classes.bank_items}>
              <div className={classes.bank_item}>
                <h5>اطلاعات حساب شماره شبا</h5>
                <p>{sheba}</p>
              </div>
              <div className={classes.bank_item}>
                <h5>شماره حساب</h5>
                <p>{bankNumber}</p>
              </div>
              <div className={classes.bank_item}>
                <h5>{bankName}</h5>
                <p>{accName}</p>
              </div>
            </div>
          </div>
        )}
        {selected == "فیش بانکی" && <MethodForm />}
      </CollapseForm>
    </div>
  );
};

export default MethodPay;
