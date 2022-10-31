import { makeStyles } from "@material-ui/core";
import { Col, Row } from "antd";
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import ContactUsForm from "Components/PageComponent/ContactUs/ContactUsForm";
import { useState } from "react";


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

export default function ContactUs() {
  const classes = useStyles();
  

  const [loading, setLoading] = useState(false);

  return (
    <>
      <main>
        <InnerContainer>
          <PageTemplate
            breadcrumbs={[
              { text: "صفحه اصلی", link: "/" },
              { text: "تماس با ما", link: null },
            ]}
          >
            <div className={classes.contact}>
              <h3>تماس با ما</h3>
              <Row gutter={[0,40]}>
                <Col xs={24} sm={24} md={24} xl={12} xxl={12} >
                  <p>تلفن شرکت : ۳۳۴۴۵۵۶۶ - ۰۵۱ </p>
                  <p>ساعت کار شرکت : ساعت ۹ الی ۱۸ </p>
                  <p>آدرس شرکت : مشهد - خیابان کوشش ۲۷ - خیبری ۳</p>
                  <img src="/images/address-map.png" />
                </Col>
                <Col xs={24} sm={24} md={24} xl={12} xxl={12}  >
                  <ContactUsForm/>
                </Col>
              </Row>
            </div>
          </PageTemplate>
        </InnerContainer>
      </main>
    </>
  );
}
