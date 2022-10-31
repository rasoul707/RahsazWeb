import { makeStyles } from "@material-ui/core/styles";

import HomePageTitle from "Components/Layout/HomePageTitle";
import { ProductCard } from "Components/Card";
import { PrimaryCarousel } from "Components/Carousel";

const useStyles = makeStyles(theme => ({
  categoriesWrapper: {
    marginTop: 60,
  },
}));

export default function BestsellingProducts() {
  const classes = useStyles();

  const responsive = {
    460: { items: 2 },
    600: { items: 3 },
    760: { items: 4 },
    960: { items: 5 },
  };
  return (
    <div className={classes.categoriesWrapper}>
      <HomePageTitle strongText="پرفروش‌ترین‌" lightText="دست سازه‌ها" />
      <PrimaryCarousel responsive={responsive}>
        <ProductCard name="نام محصول می تواند بسیار بسیار طولانی باشد نام محصول می تواند بسیار بسیار طولانی باشد" />
        <ProductCard name="نام تستی" discount />
        <ProductCard discount />
        <ProductCard name="نام محصول بهی" />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </PrimaryCarousel>
    </div>
  );
}
