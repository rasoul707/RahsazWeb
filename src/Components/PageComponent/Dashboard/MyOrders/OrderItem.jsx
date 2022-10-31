import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AddressIcon from "Assets/img/icons/address-o.svg";
import Step2Icon from "Assets/img/icons/o-2.svg";
import Step3Icon from "Assets/img/icons/o-3.svg";
import Step4Icon from "Assets/img/icons/o-4.svg";
import StepLastIcon from "Assets/img/icons/o-last-bus.svg";

import StepConnector from "@material-ui/core/StepConnector";
import Link from "next/link";
import { Button } from "Components/Button";
import { dateFA, toFarsiNumber, toToman } from "Utils/helperFunction";
import useWindowDimensions from "hooks/useWindowDimensions";
import { setOrder } from "ReduxWrapper/actions/order.action";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    gap: 30,
    paddingTop: 30,
    "& p": {
      color: "#616161",
    },
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
  side: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 28,
  },
  headers: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
    "& button": {
      whiteSpace: "nowrap",
    },
    "@media(max-width: 960px)": {
      "& button": {
        width: "100%",
      },
    },
  },
  imgBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    maxWidth: "50%",
    "& img": {
      width: "64px",
      height: "64px",
      "@media only screen and (max-width: 768px)": {
        width: "90px",
        height: "80px",
      },
    },
    "& div": {
      border: "1px solid #EBEBEB",
      borderRadius: "8px",
      padding: "2px",
    },
  },
  price: {
    color: "#1F75F6",
  },
  step: {
    padding: 0,
    background: "#fff",
  },
  step_label: {
    ...theme.font.s12w400,
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

const OrderItem = ({
  total_amount,
  id,
  created_at,
  process_status,
  products,
  overall_status,
}) => {
  const steps = getSteps();

  let index = steps.indexOf(process_status);
  const { width } = useWindowDimensions();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(index || 4);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <div
          className={classes.headers}
          style={{ justifyContent: "flex-start" }}
        >
          <p>
            شماره فاکتور : <b>{toFarsiNumber(id)}</b>
          </p>
          <p>
            تاریخ سفارش : <b>{dateFA(created_at)}</b>
          </p>
        </div>
        <div className={classes.imgBox}>
          {products?.map(product => (
            <div key={product.id}>
              <img
                src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${product?.product?.cover_image?.image?.path || ""
                  }`}
                alt={product?.product?.name}
              />
            </div>
          ))}
        </div>
        {overall_status == "در حال پردازش" && width > 960 && (
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
        )}
      </div>
      <div className={classes.side}>
        <div className={classes.headers}>
          {overall_status != "پرداخت نشده" ? (
            <>
              <Link href={`/factor/${id}`} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <Button bordered black>
                    فاکتور فروش
                  </Button>
                </a>
              </Link>
              <Link href={`/dashboard/my-order/${id}`}>
                <Button bordered>مشاهده بیشتر</Button>
              </Link>
            </>
          ) : (
            <Button
              bordered
              onClick={() => {
                dispatch(setOrder(id));
                router.push("/cart/complete");
              }}
            >
              ادامه پرداخت
            </Button>
          )}
        </div>
        <div style={{ order: width < 960 ? -1 : 1 }}>
          <p>
            قیمت پرداختی :{" "}
            <b className={classes.price}>{toToman(total_amount)} تومان</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
