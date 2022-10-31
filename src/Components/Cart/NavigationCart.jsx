import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import NavigationCartContent from "Components/Cart/SubComponents/NavigationCartContent";

// redux
import { useDispatch } from "react-redux";
import { handleShowMainLayout } from "ReduxWrapper/actions/general.action";

// Icons
import CartSvg from "Assets/img/icons/cart.svg";
import { useSelector } from "react-redux";
import { useUpdateEffect } from "hooks/useUpdateEffect";
import { getCart } from "Services/order.api";
import { toFarsiNumber } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  navigationCartWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "11px 16px",
    paddingRight:0,
    ...theme.font.s14w500,
    "& > svg": {
      marginRight: 8,
    },
  },
  counter: {
    marginLeft: 4,
    width: 22,
    height: 22,
    background: "#F9F9FB",
    borderRadius: "50%",
    ...theme.font.s14w700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > span": {
      marginBottom: -4,
    },
  },
  forOpenMenu: {
    position: "absolute",
    top: "80%",
    right: 0,
    width: "150%",
    height: 100,
  },
}));

const variants = {
  open: { display: "block", opacity: 1, y: 0 },
  closed: { display: "none", opacity: 0, y: "-100" },
};

export default function NavigationCart() {
  const classes = useStyles();
  const disptach = useDispatch();
  const cart = useSelector(state => state.cart);
  const [showContent, setShowContent] = useState(false);
  const [basket, setBasket] = useState({});
  const [loading, setLoading] = useState(false);

  useUpdateEffect(() => {
    let timer;
    if (showContent) {
      setLoading(true);
      timer=setTimeout(()=>{
        getCart()
          .then(res => {
            setBasket(res);
            setLoading(false);
          })
          .catch(err => setLoading(false));
      },500)
    }
    return ()=>clearTimeout(timer)
  }, [showContent]);

  const handleShowContent = () => {
    setShowContent(true);
    disptach(handleShowMainLayout(true));
  };

  const handleHideContent = () => {
    setShowContent(false);
    disptach(handleShowMainLayout(false));
  };
  return (
    <div
      className={classes.navigationCartWrapper}
      onMouseEnter={handleShowContent}
      onMouseLeave={handleHideContent}
    >
      <CartSvg />
      <span>سبد خرید</span>
      <div className={classes.counter}>
        <span>{toFarsiNumber(cart?.items?.length??0)}</span>
      </div>
      {showContent && <div className={classes.forOpenMenu} />}
      <motion.div animate={showContent ? "open" : "closed"} variants={variants}>
        <NavigationCartContent cart={basket} loading={loading} />
      </motion.div>
    </div>
  );
}
