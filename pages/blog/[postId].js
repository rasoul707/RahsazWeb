import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { makeStyles } from "@material-ui/core";
import moment from "jalali-moment";
import { getABlog } from "Services";
import { toFarsiNumber } from "Utils/helperFunction";
import Head from "next/head";
import Image from "Components/Image";

const useStyles = makeStyles(theme => ({
  postWrapper: {
    position: "relative",
    "@media only screen and (max-width: 768px)": {
      paddingBottom: "40px",
    },
    "& h3": {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 20,
      marginTop: 24,
    },
  },
  shareButtons: {
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  textBox: {
    marginBottom: 80,
    "& > p": {
      fontSize: 16,
      fontWeight: 500,
      color: "#333333",
      lineHeight: 2.5,
    },
  },
  textItem: {
    marginBottom: 16,
    "& > strong": {
      fontSize: 16,
      fontWeight: 700,
      color: "#616161",
      display: "inline-block",
      marginRight: 16,
      "@media only screen and (max-width: 768px)": {
        fontSize: 12,
        marginRight: 5,
      },
    },
    "& > span": {
      fontSize: 16,
      "@media only screen and (max-width: 768px)": {
        fontSize: 12,
      },
      fontWeight: 500,
      color: "#151515",
    },
  },
  postFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTop: "1px solid #EBEBEB",
    "@media only screen and (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 25,
    },
  },
  tags: {
    "& > strong": {
      padding: "6px 16px",
      marginRight: 8,
      background: "rgba(246, 137, 31, 0.1)",
      color: "#F6891F",
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 500,
    },
  },
  image: {
    "&  img": {
      borderRadius: 8,
      width: "100%",
      objectFit: "contain",
    },
    maxHeight: "650px",
    height: 500,
    "@media only screen and (max-width: 768px)": {
      height: 300,
    },
  },
  video_wrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    maxHeight: "500px"

  }
}));

export default function SinglePost({ blog }) {
  const classes = useStyles();
  console.log("blog", blog);

  let faDate = moment(blog?.created_at || "2022/02/02", "YYYY/MM/DD").locale(
    "fa",
  );

  return (
    <>
      <Head>
        <title>{blog?.title}</title>
        <meta name="author" content={blog?.writer?.first_name} />
        <meta
          name="keywords"
          content={blog?.tags?.map(tag => tag.title).join(",") ?? "بلاگ"}
        />
      </Head>
      <main>
        <InnerContainer>
          <PageTemplate
            breadcrumbs={[
              { text: "صفحه اصلی", link: "/" },
              { text: "وبلاگ", link: null },
            ]}
          >
            <article className={classes.postWrapper}>
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${blog?.image?.path}`}
                alt={blog?.title}
                className={classes.image}
                objectFit="contain"
              />
              <h3>{blog?.title}</h3>
              <div className={classes.textItem}>
                <strong>تاریخ انتشار :</strong>
                <span>{`${toFarsiNumber(faDate.format("DD"))} ${faDate.format(
                  "MMMM",
                )} ${toFarsiNumber(faDate.format("YYYY"))}`}</span>
              </div>
              <div className={classes.textBox}>
                <p>{blog?.description}</p>
              </div>
              {blog?.video_link && (
                <div className={classes.video_wrap}>
                  <video controls loop className={classes.video} >
                    <source
                      src={`${process.env.NEXT_PUBLIC_APP_VIDEOS_BASE_URL}${blog?.video_link}`}
                    />
                  </video>
                </div>
              )}

              <div className={classes.postFooter}>
                <div className={classes.tags}>
                  {blog?.tags?.map((tag, i) => (
                    <strong key={i}>{tag?.title}</strong>
                  ))}
                </div>
                <div className={classes.textItem}>
                  <strong>نوشته شده توسط :</strong>
                  <span>{`${blog?.writer?.first_name} ${blog?.writer?.last_name}`}</span>
                </div>
              </div>
            </article>
          </PageTemplate>
        </InnerContainer>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const blog = await getABlog(params.postId);
  return {
    props: {
      blog,
    },
  };
}
