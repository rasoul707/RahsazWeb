import { makeStyles, Grid } from "@material-ui/core";
import { FeatureCard } from "Components/Card";

// Assets
import PaymentIcon from "Assets/img/icons/feature-payment.svg";
import DeliveryIcon from "Assets/img/icons/feature-delivery.svg";
import SupportIcon from "Assets/img/icons/feature-support.svg";
import ReturnIcon from "Assets/img/icons/feature-return.svg";
import { filterByStr } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  featuresWrapper: {
    marginTop: 24,
  },
}));

export default function Features({about}) {
  const classes = useStyles();

  const pardakht=filterByStr("payment_description",'field_key',about)?.field_value
  const ersal=filterByStr("delivery_description",'field_key',about)?.field_value
  const support=filterByStr("support_description",'field_key',about)?.field_value
  const bazgasht=filterByStr("reference_description",'field_key',about)?.field_value

  return (
    <div className={classes.featuresWrapper}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <FeatureCard
            icon={<PaymentIcon />}
            title="پرداخت امن"
            text="با تمامی کارت‌های شتاب"
            data={pardakht}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FeatureCard
            icon={<DeliveryIcon />}
            title="ارسال سریع"
            text="در کمترین زمان ممکن"
            data={ersal}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FeatureCard
            icon={<SupportIcon />}
            title="پشتیانی"
            text="۷ روز هفته، ۲۴ ساعته"
            data={support}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FeatureCard
            icon={<ReturnIcon />}
            title="بازگشت کالا"
            text="ضمانت ۷ روزه بازگشت"
            data={ bazgasht}
          />
        </Grid>
      </Grid>
    </div>
  );
}
