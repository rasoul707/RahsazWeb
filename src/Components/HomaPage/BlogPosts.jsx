import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { PostCard } from "Components/Card";
import { PrimaryCarousel } from "Components/Carousel";

const useStyles = makeStyles(theme => ({
  categoriesWrapper: {
    marginTop: 60,

    "& > h2": {
      fontSize: 20,
      fontWeight: 800,
      marginBottom: 24,
      color: "#333333",
      cursor: "pointer"
    },
  },
}));

export default function BlogPosts({ blogs }) {
  const classes = useStyles();

  const responsive = {
    460: { items: 1 },
    600: { items: 2 },
    760: { items: 3 },
    960: { items: 4 },
  };
  return (
    <div className={classes.categoriesWrapper}>
      <Link href={"/blog"} legacyBehavior>
        <h2>وبلاگ من</h2>
      </Link>
      <PrimaryCarousel responsive={responsive}>
        {blogs?.map(blog => (
          <PostCard
            key={blog?.id}
            id={blog?.id}
            name={blog?.title}
            img={blog?.image?.path}
            date={blog?.created_at}
            {...blog}
          />
        ))}
      </PrimaryCarousel>
    </div>
  );
}
