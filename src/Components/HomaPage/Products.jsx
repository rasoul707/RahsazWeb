import { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { Tabs } from "Components/Tabs";
import { ProductCard } from "Components/Card";

// Assets
import PaymentIcon from "Assets/img/icons/feature-payment.svg";
import DeliveryIcon from "Assets/img/icons/feature-delivery.svg";
import SupportIcon from "Assets/img/icons/feature-support.svg";
import ReturnIcon from "Assets/img/icons/feature-return.svg";
import useWindowDimensions from "hooks/useWindowDimensions";
import { PrimaryCarousel } from "Components/Carousel";

const useStyles = makeStyles(theme => ({
  productsWrapper: {
    margin: "65px 0",
  },
  contain: {
    width: "100%",
    overflowX: "auto",
  },
  mobile: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
  },

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
    "& > h3": {
      fontSize: 14,
      fontWeight: 500,
      color: "#333333",
      textOverflow: "ellipsis",
      overflow: "hidden",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
    },
  },
  imageWrapper: {
    borderRadius: 30,
    "& > img": {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: 8,
      "@media(max-width: 960px)": {
        height: "170px",
        width: "160px",
        objectFit: "cover",
      },
    },
    "& > span": {
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

export default function Products({ groups }) {
  const classes = useStyles();
  const [products, setProducts] = useState(
    groups?.filter(gp => gp.id == 1)?.[0],
  );
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState(1);

  const tabs = [];

  groups?.map(gp => {
    if (gp.status == "enable") {
      tabs.push({
        key: gp.id,
        label: gp.title,
        value: gp.id,
      });
    }
  });
  const responsive = {
    0: { items: 2 },
    600: { items: 3 },
    760: { items: 4 },
    960: { items: 4 },
  };



  return (
    <div className={classes.productsWrapper}>
      <Tabs
        buttons={tabs}
        active={tab}
        setActive={value => {
          setTab(value);
          let filtered = groups?.filter(gp => gp.id == value);
          setProducts(filtered[0]);
        }}
      />
      {width >= 960 && (
        <Grid
          container
          spacing={2}
          style={{ marginTop: "4px" }}
          wrap="nowrap"
          className={classes.contain}
        >
          {products["products"]?.map(item => (
            <Grid item xs={6} sm={2} key={item.id}>
              <ProductCard
                price={item?.product?.purchase_price}
                name={item?.product?.name}
                id={item?.product?.id}
                img={item?.product?.cover_image?.image?.path}
                alt={item?.product?.cover_image?.image?.alt}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {width < 960 && (
        <>
          <br />
          <PrimaryCarousel responsive={responsive} >
            {products["products"]?.map(item => (
              <ProductMobile
                key={item.id}
                price={item?.product?.purchase_price}
                name={item?.product?.name}
                id={item?.product?.id}
                img={item?.product?.cover_image?.image?.path}
                alt={item?.product?.cover_image?.image?.alt}
              />
            ))}
          </PrimaryCarousel>
        </>
      )}
    </div>
  );
}

const ProductMobile = ({ price, name, id, img, discount = false, alt }) => {

  const classes = useStyles();
  const alt_tag = (alt != null) ? alt : name;
  return (
    <div className={classes.productCard}>
      <div className={classes.imageWrapper}>
        <img src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${img}`} alt={alt_tag} />
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
    </div>
  )

}