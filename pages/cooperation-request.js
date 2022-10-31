import { useState } from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { makeStyles} from "@material-ui/core";
import CooperationForm from "Components/PageComponent/Cooperation/CooperationForm";

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

export default function CooperationRequest() {
  const classes = useStyles();
  
  return (
    <>
      <main>
        <InnerContainer>
          <PageTemplate
            breadcrumbs={[
              { text: "صفحه اصلی", link: "/" },
              { text: "درخواست همکاری و نمایندگی", link: null },
            ]}
          >
            <div className={classes.contact}>
              <h3>درخواست همکاری و نمایندگی</h3>
              <CooperationForm />
            </div>
          </PageTemplate>
        </InnerContainer>
      </main>
    </>
  );
}
