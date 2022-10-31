import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigationCategoryMenu from "./SubComponents/NavigationCategoryMenu";
import { motion } from "framer-motion";

// redux
import { useDispatch } from "react-redux";
import { handleShowMainLayout } from "ReduxWrapper/actions/general.action";

// Icons
import CategorySvg from "Assets/img/icons/category.svg";

const useStyles = makeStyles(theme => ({
  category: {
    position: "relative",
    display: "flex",
    alignItems: "center",

    ...theme.font.s18w700,
    "& > span, & > svg": {
      cursor: "pointer",
    },
    "& > span": {
      paddingLeft: 8,
    },
  },
  forOpenMenu: {
    position: "absolute",
    top: "100%",
    width: "100%",
    height: 100,
  },
}));

const variants = {
  open: { display: "block", opacity: 1, y: 0 },
  closed: { display: "none", opacity: 0, y: "-100" },
};

export default function NavCategory() {
  const classes = useStyles();
  const disptach = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
    disptach(handleShowMainLayout(true));
  };

  const handleHideMenu = () => {
    setShowMenu(false);
    disptach(handleShowMainLayout(false));
  };
  return (
    <div
      className={classes.category}
      onMouseEnter={handleShowMenu}
      onMouseLeave={handleHideMenu}
    >
      <CategorySvg />
      <span>دسته بندی</span>
      {showMenu && <div className={classes.forOpenMenu} />}
      <motion.div animate={showMenu ? "open" : "closed"} variants={variants}>
        <NavigationCategoryMenu />
      </motion.div>
    </div>
  );
}
