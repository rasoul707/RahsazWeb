import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  productCard: {
    // margin: "0 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    gap: 18,
    borderRadius: 8,
    background: "transparent",
    transition: "background ease 600ms",
    "&:hover": {
      background: "#fafafa",
    },
    "& > h3": {
      fontSize: 14,
      fontWeight: 500,
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
    position: "relative",
    width: "100%",
    paddingBottom: "100%",
    borderRadius: 30,
    "& > img": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: 8,
      "@media(max-width: 960px)": {
        height: "170px",
        objectFit: "cover",
      },
    },
    "& > span": {
      position: "absolute",
      padding: "4px 10px 0",
      color: "#ffffff",
      fontSize: 14,
      fontWeight: 900,
      background: "#FF4A4A",
      borderRadius: 11,
      top: 16,
      left: 16,
      lineHeight: "1",
    },
  },
  price: {
    "& > strong": {
      fontSize: 14,
      fontWeight: 700,
      color: "#F6891F",
    },
  },
  discountPrice: {
    display: "flex",
    alignItems: "center",
    gap: 6,

    "& > span": {
      fontSize: 10,
      fontWeight: 500,
      textDecoration: "line-through",
      color: "#F6891F",
    },
    "& > strong": {
      fontSize: 14,
      fontWeight: 700,
      color: "#FF4A4A",
    },
  },
}));

export default function ProductCard({ name, discount, price, id, img, alt }) {
  const classes = useStyles();
  const alt_tag = (alt != null) ? alt : name;
  return (
    <Link href={`/products/${id}`} legacyBehavior>
      <a className={classes.productCard}>
        <div className={classes.imageWrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${img}`}
            alt={alt_tag}
            fill
            priority
          />
          {/* <img src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${img}`} alt={alt_tag} /> */}
          {discount && <span>10%</span>}
        </div>
        <h3 title="نام محصول می تواند بسیار بسیار طولانی باشد">
          {name || "نام محصول می تواند بسیار بسیار طولانی باشد"}
        </h3>
        {discount ? (
          <div className={clsx(classes.price, classes.discountPrice)}>
            <span>{(300000).toLocaleString("fa-IR")}</span>
            <strong>{(300000).toLocaleString("fa-IR")} تومان</strong>
          </div>
        ) : (
          <div className={classes.price}>
            <strong>{price ? (price).toLocaleString("fa-IR") : "به زودی "} {price && 'تومان'}</strong>
          </div>
        )}
      </a>
    </Link>
  );
}




