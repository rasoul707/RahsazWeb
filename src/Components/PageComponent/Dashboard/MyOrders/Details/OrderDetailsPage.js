import { makeStyles, withStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import ArrowIcon from "Assets/img/icons/arrow-right.svg";
import BlueTruck from "Assets/img/icons/blue_truck.svg";
import BlueFactor from "Assets/img/icons/blue_factor.svg";
import BlueEye from "Assets/img/icons/blue_eye.svg";
import clsx from "clsx";

import React from "react";
import { dateFA, toFarsiNumber, toToman } from "Utils/helperFunction";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AddressIcon from "Assets/img/icons/address-o.svg";
import Step2Icon from "Assets/img/icons/o-2.svg";
import Step3Icon from "Assets/img/icons/o-3.svg";
import Step4Icon from "Assets/img/icons/o-4.svg";
import StepLastIcon from "Assets/img/icons/o-last-bus.svg";
import Link from "next/link";
import { Reoverlay } from "reoverlay";

import StepConnector from "@material-ui/core/StepConnector";
import ItemDetails from "./ItemDetails";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Divider } from "antd";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiStepLabel-label.MuiStepLabel-active": {
      color: theme.color.boldOrange,
    },
    "& .MuiStepLabel-label.MuiStepLabel-completed": {
      color: theme.color.boldOrange,
    },
    "@media(max-width: 960px)": {
      flexDirection: "column",
    },
  },

  headers: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media only screen and (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 20,
    },
  },
  headers_right: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    ...theme.font.s14w700,
    cursor: "pointer",
  },
  headers_left: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    "@media only screen and (max-width: 768px)": {
      flexWrap: "wrap",
    },
    "& span": {
      color: "#1F75F6",
      display: "flex",
      alignItems: "center",
      gap: 5,
      ...theme.font.s14w700,
      cursor:"pointer"
    },
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 40,
    "@media only screen and (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 25,
    },
  },
  content_right: {
    "& >div": {
      display: "flex",
      alignItems: "center",
      gap: 20,
      marginBottom: 16,
    },
    "& p": {
      ...theme.font.s14w400,
    },
    "& strong": {
      ...theme.font.s14w700,
    },
  },
  content_left: {
    color: "#2DBD4D",
    ...theme.font.s14w700,
  },
  step: {
    padding: 0,
    background: "#fff",
  },
  step_label: {
    ...theme.font.s12w400,
    "@media only screen and (max-width: 768px)": {
      fontSize: 8,
      fontWeight: 700,
    },
  },
}));

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundColor: "#F6891F",
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#F6891F",
      //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    color: "red",
    "& path": {
      fill: "#C4C4C4",
    },
  },
  active: {
    "& path": {
      fill: "#F6891F",
    },
  },
  completed: {
    "& path": {
      fill: "#F6891F",
    },
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AddressIcon />,
    2: <Step2Icon />,
    3: <Step3Icon />,
    4: <Step4Icon />,
    5: <StepLastIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return [
    "ثبت سفارش",
    "در انتظار تایید سفارش",
    "در حال بسته بندی",
    "خروج از انبار",
    "تحویل به باربری",
  ];
}
const OrderDetailsPage = ({ order }) => {
  const steps = getSteps();
  let index = steps.indexOf(order?.process_status);

  const classes = useStyles();
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(index || 4);
  const { width } = useWindowDimensions();
  console.log("order", order);
  return (
    <div className={classes.root}>
      {/* headers */}
      <section className={classes.headers}>
        <div onClick={() => router.back()} className={classes.headers_right}>
          <ArrowIcon /> بازگشت به مرحله قبل{" "}
        </div>

        <div className={classes.headers_left}>
          <span onClick={() => {
                Reoverlay.showModal("BijakModal",{
                    img:order?.bijak_image?.path,
                    note:order?.bijak_note
                });
              }}>
            <BlueTruck
              
            />{" "}
            مشاهده بارنامه
          </span>
          <span>
            <BlueFactor /> درخواست فاکتور
          </span>
          <Link href={`/factor/${order?.id}`} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <span>
                <BlueEye /> مشاهده فاکتور فروش
              </span>
            </a>
          </Link>
        </div>
      </section>
      {width < 960 && <Divider />}
      {/* content */}

      <section className={classes.content}>
        <div className={classes.content_right}>
          <div>
            <p>
              شماره فاکتور :<strong> {toFarsiNumber(order?.id)} </strong>
            </p>
            <p>
              تاریخ سفارش : <strong> {dateFA(order?.created_at)} </strong>
            </p>
          </div>
          <p>
            قیمت پرداختی :{" "}
            <strong> {toToman(order?.total_amount)} تومان</strong>
          </p>
        </div>

        <div className={classes.content_left}>
          {order?.overall_status == "در حال پردازش" ? (
            <Stepper
              classes={{ root: classes.step }}
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <span className={classes.step_label}>{label}</span>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            <span>تحویل داده شده .</span>
          )}
        </div>
      </section>

      {/* items  */}
      {order?.products?.length &&
        order?.products.map(item => <ItemDetails key={item?.id} {...item} />)}
    </div>
  );
};

export default OrderDetailsPage;
