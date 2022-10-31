import { useState } from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { makeStyles, Grid } from "@material-ui/core";
import { Spin } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { NormalInput, TextareaInput, SelectInput } from "Components/Inputs";
import { Button } from "Components/Button";

const useStyles = makeStyles(theme => ({
  contact: {
    "& h3": {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 32,
    },
    "& p": {
      fontSize: 16,
      fontWeight: 400,
      marginBottom: 12,
    },
  },
}));

export default function Suggestions() {
  const classes = useStyles();
  const methods = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async formData => {
    console.log("formData: ", formData);
  };
  return (
    <>
      <main>
        <InnerContainer>
          <PageTemplate
            breadcrumbs={[
              { text: "صفحه اصلی", link: "/" },
              { text: "انتقادات ، پیشنهادات و شکایات", link: null },
            ]}
          >
            <div className={classes.contact}>
              <h3>انتقادات ، پیشنهادات و شکایات</h3>
              <Spin spinning={loading}>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <NormalInput
                          name="name"
                          label="نام و نام خانوادگی"
                          placeholder="نام را وارد کنید"
                        />
                        <NormalInput
                          name="phone"
                          label="شماره تماس"
                          placeholder="شماره تماس را وارد کنید"
                        />
                        <NormalInput
                          name="email"
                          label="ایمیل"
                          placeholder="ایمیل را وارد کنید"
                          type="email"
                        />
                        <Button>ارسال درخواست</Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <SelectInput
                              name="request_type"
                              label="نوع درخواست"
                              placeholder="نوع درخواست را انتخاب کنید"
                              options={[
                                { label: "انتقاد", value: "انتقاد" },
                                { label: "پیشنهاد", value: "پیشنهاد" },
                                { label: "شکایت", value: "شکایت" },
                              ]}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <SelectInput
                              name="section"
                              label="واحد مورد نظر"
                              placeholder="واحد مورد نظر را انتخاب کنید"
                              options={[
                                { label: "انبار", value: "انبار" },
                                { label: "فروش", value: "فروش" },
                                { label: "پشتیبانی", value: "پشتیبانی" },
                              ]}
                            />
                          </Grid>
                        </Grid>
                        <TextareaInput
                          name="description"
                          label="توضیحات"
                          placeholder="توضیحات را وارد کنید"
                          rows={7}
                        />
                      </Grid>
                    </Grid>
                  </form>
                </FormProvider>
              </Spin>
            </div>
          </PageTemplate>
        </InnerContainer>
      </main>
    </>
  );
}
