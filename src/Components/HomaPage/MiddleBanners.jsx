import { makeStyles, Grid } from "@material-ui/core";
import Image from "Components/Image";
import useWindowDimensions from "hooks/useWindowDimensions";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  bannersWrapper: {
    marginTop: 24,
  },
  banner: {
    display: "block",
    borderRadius: 8,
    overflow: "hidden",
    height: "200px",
    "& > img": {
      width: "100%",
      objectFit: "cover",
      borderRadius: 8,
      "@media only screen and (max-width: 960px)": {
        objectFit: "fill",
      },
    },
  },
  // bannersContainer: {
  //   height: "232px",
  // }
}));

export default function MiddleBanners({ banners }) {
  const classes = useStyles();
  const { width } = useWindowDimensions();

  function filterByStr(str) {
    return banners?.filter(banner => banner.key == str)?.[0];
  }

  const rightImg = filterByStr("right_banner_image")?.value;
  const rightHref = filterByStr("right_banner_href")?.value;
  const leftImg = filterByStr("left_banner_image")?.value;
  const leftHref = filterByStr("left_banner_href")?.value;

  return (
    <div className={classes.bannersWrapper}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <a
            href={
              rightHref?.includes("http") ? rightHref : "https://" + rightHref
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${rightImg}`}
              alt={rightImg}
              className={classes.banner}
              objectFit={width <= 960 ? "fill" : "cover"}
            />
          </a>
        </Grid>
        <Grid item xs={12} sm={6}>
          <a
            href={leftHref?.includes("http") ? leftHref : "https://" + leftHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${leftImg}`}
              alt={leftImg}
              className={classes.banner}
              objectFit={width <= 960 ? "fill" : "cover"}
            />
          </a>
        </Grid>
      </Grid>
    </div>
  );
}
