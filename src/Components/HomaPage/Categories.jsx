import { makeStyles } from "@material-ui/core/styles";

import HomePageTitle from "Components/Layout/HomePageTitle";
import { CategoryCard } from "Components/Card";
import { PrimaryCarousel } from "Components/Carousel";

const useStyles = makeStyles(theme => ({
  categoriesWrapper: {
    marginTop: 60,
  },
}));

export default function Categories() {
  const classes = useStyles();

  const responsive = {
    0: { items: 2 },
    460: { items: 3 },
    600: { items: 4 },
    760: { items: 5 },
    960: { items: 7 },
  };
  return (
    <div className={classes.categoriesWrapper}>
      <HomePageTitle strongText="دسته بندی‌" lightText="دست سازه‌ها" />
      <PrimaryCarousel responsive={responsive}>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </PrimaryCarousel>
    </div>
  );
}
