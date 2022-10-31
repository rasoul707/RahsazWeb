import React from 'react';
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { makeStyles} from "@material-ui/core";
import ComplaintsForm from 'Components/PageComponent/Complaints/ComplaintsForm';

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

const Complaints = () => {
  const classes = useStyles();

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
                  <ComplaintsForm/>
                </div>
              </PageTemplate>
            </InnerContainer>
          </main>
        </>
      );
};

export default Complaints;
