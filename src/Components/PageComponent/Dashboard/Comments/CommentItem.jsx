import { makeStyles } from "@material-ui/core";
import React from "react";
import CmIcon from "Assets/img/icons/cm.svg";
import StarIcon from "Assets/img/icons/star.svg";

import { toToman } from "Utils/helperFunction";
import useWindowDimensions from "hooks/useWindowDimensions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media only screen and (max-width: 960px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 18,
    },
  },
  right: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  item: {
    display: "flex",
    gap: 15,
    alignItems: "center",
    "& img": {
      border: " 1px solid #EBEBEB",
      borderRadius: 8,
      width: 70,
      height: 70,
      objectFit: "cover",
    },
    "& p": {
      ...theme.font.s14w700,
      margin: 0,
    },
  },
  sub: {
    display: "flex",
    gap: 6,
    "& p": {
      ...theme.font.s14w400,
      margin: 0,
    },
  },
  left: {
    color: "#616161",
    "@media only screen and (max-width: 960px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 18,
    },
  },
  price: {
    ...theme.font.s18w700,
    color: theme.color.boldOrange,
  },
  info: {
    display: "flex",
    gap: 13,
    flexDirection: "column",
    "&>div": {
      color: "#616161",
      ...theme.font.s14w400,
    },
  },
}));

const CommentItem = ({ item }) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  console.log(item?.commentable?.cover_image?.image?.path);
  return (
    <div className={classes.root}>
      <div className={classes.right}>
        <div className={classes.item}>
          <img
            src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${item?.commentable?.cover_image?.image?.path}`}
            alt={item?.commentable?.name}
          />
          <div className={classes.info}>
            <p>{item?.commentable?.name}</p>
            {width >= 960 && (
              <div>
                {" "}
                <StarIcon /> <span> 4.5 (5 رای )</span>{" "}
              </div>
            )}
          </div>
        </div>
        {width >= 960 && (
          <div className={classes.sub}>
            <CmIcon /> <p>{item?.content}</p>
          </div>
        )}
      </div>
      <div className={classes.left}>
        <div>
          <span>قیمت کالا :</span>
          <span className={classes.price}>
            {toToman(item?.commentable?.purchase_price)} تومان
          </span>
        </div>
        {width < 960 && (
          <div>
            {" "}
            <StarIcon /> <span> 4.5 (5 رای )</span>{" "}
          </div>
        )}
        {width < 960 && (
          <div className={classes.sub}>
            <CmIcon /> <p>{item?.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
