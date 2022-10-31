import { makeStyles } from "@material-ui/core/styles";

import HomePageTitle from "Components/Layout/HomePageTitle";
import { PostCard } from "Components/Card";
import { PrimaryCarousel } from "Components/Carousel";
import VideoFram from "Components/ui/VideoFram";

const useStyles = makeStyles(theme => ({
  categoriesWrapper: {
    marginTop: 60,

    "& > h2": {
      fontSize: 20,
      fontWeight: 800,
      marginBottom: 24,
      color: "#333333",
    },
  },
}));

export default function BlogVideos({ videos }) {
  const classes = useStyles();

  const responsive = {
    460: { items: 1 },
    600: { items: 2 },
    760: { items: 3 },
    960: { items: 4 },
  };
  return (
    <div className={classes.categoriesWrapper}>
      <h2>ویدئوهای آموزشی</h2>
      <PrimaryCarousel responsive={responsive}>
        {videos?.map(vid => (
          <VideoFram src={vid?.aparat_link} key={vid?.id} />
        ))}
      </PrimaryCarousel>
    </div>
  );
}
