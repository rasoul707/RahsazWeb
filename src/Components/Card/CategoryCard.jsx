import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  categoryCard: {
    margin: "0 6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 18,
    padding: "18px 12px",
    borderRadius: 30,
    background: "#ffffff",
    transition: "background ease 600ms",
    "&:hover": {
      background: "#fafafa",
    },
    "& > img": {
      width: "100%",
      height: 100,
    },
    "& > span": {
      fontSize: 16,
      fontWeight: 400,
    },
  },
}));

export default function CategoryCard() {
  const classes = useStyles();
  return (
    <Link href="/">
      <a className={classes.categoryCard}>
        <img src="/images/carousel-image.png" alt="" />
        <span>نام دسته بندی</span>
      </a>
    </Link>
  );
}
