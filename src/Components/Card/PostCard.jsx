import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

import moment from 'jalali-moment'
import clsx from "clsx";
import { toFarsiNumber } from "Utils/helperFunction";
import Image from "Components/Image";

const useStyles = makeStyles(theme => ({
  productCard: {
    margin: "0 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    gap: 18,
    borderRadius: 8,
    background: "transparent",
    transition: "background ease 600ms",
    maxWidth: "300px",
    "&:hover": {
      background: "#fafafa",
    },
    "& > span": {
      fontSize: 12,
      fontWeight: 400,
      color: "#616161",
    },
    "& > h3": {
      fontSize: 14,
      fontWeight: 700,
      color: "#333333",
      width: "80%",
      height: 42,
      textOverflow: "ellipsis",
      overflow: "hidden",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
    },
  },
  imageWrapper: {
    width: "100%",
    "& > span": {
      position: "absolute",
      padding: "9px 16px 9px",
      color: "#333333",
      fontSize: 14,
      fontWeight: 400,
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: 8,
      top: 16,
      left: 16,
      lineHeight: "1",
    },
  },
  image: {
    "&  img": {
      width: "100%",
      borderRadius: 8,
    },

  }
}));

export default function PostCard({ name, isVideo, id, img = "1643313361 Rectangle 73(1).png", date = "2022/02/02" }) {
  const classes = useStyles();
  let faDate = moment(date, 'YYYY/MM/DD').locale('fa')
  return (
    <Link href={`/blog/${id}`} legacyBehavior>
      <a className={classes.productCard}>
        <div className={classes.imageWrapper}>
          <Image className={classes.image} src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${img}`} alt={name} fill />
          {isVideo && <span>ویدئو آموزشی</span>}
        </div>
        <span>{`${toFarsiNumber(faDate.format("DD"))} ${faDate.format('MMMM')} ${toFarsiNumber(faDate.format("YYYY"))}`}</span>
        <h3 title="نام محصول می تواند بسیار بسیار طولانی باشد">
          {name || "نام محصول می تواند بسیار بسیار طولانی باشد"}
        </h3>
      </a>
    </Link>
  );
}
