import { useEffect, useState } from "react";
import ModalHeader from "./ModalHeader";
import ModalWrapperCustom from "./ModalWrapperCustom";
import { makeStyles, Grid } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { CheckboxInput } from "Components/Inputs";
import { Button } from "Components/Button";
import { useSelector } from "react-redux";
import { sendAlert } from "Services";
import { Reoverlay } from 'reoverlay';


const useStyles = makeStyles(theme => ({
  inventoryNotification: {},
  formFooter: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 24,
  },
}));

export default function InventoryNotificationModal({id}) {
  const classes = useStyles();
  const methods = useForm();
  const state = useSelector(state => state.user);
console.log('id',id);
  const onSubmit = async formData => {
    let data={}
    for (const [key, value] of Object.entries(formData)) {
      data[key]=+!!value
    }
    await sendAlert(id,data).then(res=>{
      Reoverlay.hideAll()
    })
  };

  return (
    <ModalWrapperCustom>
      <ModalHeader title="درخواست اطلاع رسانی موجودی" />
      <div className={classes.inventoryNotification}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CheckboxInput
              name="via_email"
              label={`اطلاع رسانی به ایمیل من: ${state?.user?.email}`}
              //   defaultValue={
              //     defaultValues?.price_depends_on_currency
              //   }
              //   onClick={e =>
              //     setIsPriceDependsOnCurrency(e.target.checked)
              //   }
            />
            <div style={{ height: "12px" }} />
            <CheckboxInput
              name="via_phone"
              label={`اطلاع رسانی به شماره همراه: ${state?.user?.phone_number}`}
            />
            <div style={{ height: "12px" }} />
            <CheckboxInput
              name="via_notification"
              label="اطلاع رسانی در قسمت پیام‌ها"
            />

            <div className={classes.formFooter}>
              <Button type="submit" width="140px">ثبت درخواست</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </ModalWrapperCustom>
  );
}
