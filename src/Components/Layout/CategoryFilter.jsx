import { useState, useEffect } from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import { makeStyles, Grid } from "@material-ui/core";
import { Spin } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "Components/Button";

// Components
import { RelatedInputs } from "Components/Inputs";

// Assets

// Services
import { getProductCategoriesApi } from "Services";
import { useRouter } from "next/router";


const useStyles = makeStyles(theme => ({
  wrapper: {
    background: "#FFFFFF",
    padding: "16px 0",
  },
}));

export default function CategoryFilter({ setOpen = () => null }) {
  const classes = useStyles();
  const methods = useForm();
  const router = useRouter();

  const [globalFucked, setGlobalFucked] = useState([]);
  const [loading, setLoading] = useState(false);

  //   const initialPage = async () => {
  //     setLoading(true);
  //     const data = await getSingleProductApi(id);
  //     setDefaultValues(data);
  //     methods.reset(data);
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     // get data for initial page
  //     if (isEdit) {
  //       initialPage();
  //     }
  //   }, []);

  const onSubmit = async formData => {
    console.log("formData", formData);

    let query = `${
      formData?.category_level_1_id
        ? "&category_level_1_id=" + formData?.category_level_1_id
        : ""
    }
    ${
      formData?.category_level_2_id
        ? "&category_level_2_id=" + formData?.category_level_2_id
        : ""
    }
    ${
      formData?.category_level_3_id
        ? "&category_level_3_id=" + formData?.category_level_3_id
        : ""
    }
    ${
      formData?.category_level_4_id
        ? "&category_level_4_id=" + formData?.category_level_4_id
        : ""
    }
    `;
    console.log(query?.trim());

    await setOpen(false);
    router.push("/products/?" + query?.trim());
  };

  const removeHand = () => {
    setGlobalFucked([
      "category_level_1_id",
      "category_level_2_id",
      "category_level_3_id",
      "category_level_4_id",
    ])

  };
  return (
    <>
      <div className={classes.wrapper}>
        <InnerContainer>
          <Spin spinning={loading}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={9}>
                    <RelatedInputs
                      api={getProductCategoriesApi}
                      setGlobalFucked={setGlobalFucked}
                      globalFucked={globalFucked}
                      label="قطعه مورد نظر خود را انتخاب کنید"
                      // onChange={onChange}
                      inputs={[
                        {
                          name: "category_level_1_id",
                          placeholder: "انتخاب برند",
                          id: 2,
                          options: [],
                          //   defaultValue: defaultValues?.categories && {
                          //     value:
                          //       defaultValues?.categories[0]?.category_item_level1
                          //         ?.id,
                          //     label:
                          //       defaultValues?.categories[0]?.category_item_level1
                          //         ?.name,
                          //   },
                        },
                        {
                          name: "category_level_2_id",
                          placeholder: "انتخاب مدل",
                          id: 3,
                          options: [],
                          //   defaultValue: defaultValues?.categories && {
                          //     value:
                          //       defaultValues?.categories[0]?.category_item_level2
                          //         ?.id,
                          //     label:
                          //       defaultValues?.categories[0]?.category_item_level2
                          //         ?.name,
                          //   },
                        },
                        {
                          name: "category_level_3_id",
                          placeholder: "انتخاب دسته بندی",
                          id: 4,
                          options: [],
                          //   defaultValue: defaultValues?.categories && {
                          //     value:
                          //       defaultValues?.categories[0]?.category_item_level3
                          //         ?.id,
                          //     label:
                          //       defaultValues?.categories[0]?.category_item_level3
                          //         ?.name,
                          //   },
                        },
                        {
                          name: "category_level_4_id",
                          placeholder: "انتخاب زیر دسته",
                          id: 5,
                          options: [],
                          //   defaultValue: defaultValues?.categories && {
                          //     value:
                          //       defaultValues?.categories[0]?.category_item_level4
                          //         ?.id,
                          //     label:
                          //       defaultValues?.categories[0]?.category_item_level4
                          //         ?.name,
                          //   },
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Button
                      width="100%"
                      padding="9px 0px"
                      style={{ marginTop: "8px" }}
                      type="submit"
                    >
                      جستجو کنید
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={1}>
                    <Button
                      width="100%"
                      color="#333333"
                      background="transparent"
                      padding="9px 0px"
                      style={{ marginTop: "8px" }}
                      onClick={removeHand}
                    >
                      حذف
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </Spin>
        </InnerContainer>
      </div>
    </>
  );
}
