import { useState } from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import { PostCard } from "Components/Card";
import { makeStyles, Grid } from "@material-ui/core";
import Pagination from "Components/ui/Pagintaion";
import { getAllBlogs } from "Services";
import { useRouter } from "next/router";
import Head from "next/head"

const useStyles = makeStyles(theme => ({
  blogWrapper: {
    paddingTop: 40,
    "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
      padding: "8px 0",
    },
    "& h2": {
      fontSize: 20,
      fontWeight: 800,
      color: "#000000",
      marginBottom: 8,
      textAlign: "center",
    },
    "& h5": {
      fontSize: 16,
      fontWeight: 400,
      color: "#000000",
      marginBottom: 12,
      textAlign: "center",
    },
  },
  header: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blogs: {
    minHeight: "70vh",
  },
  pagination: {
    width: "100%",
    marginTop: 32,
    paddingBottom: 32,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function AboutUs({ blogs }) {
  const classes = useStyles();

  const router = useRouter();

  console.log("blogs", blogs);

  const [offset, setOffset] = useState(0);
  const hanldePaginationChange = page => {
    setOffset(page - 1);
    router.push(`/blog?offset=${page - 1}`);
  };

  return (
    <>
    <Head>
      <title>وبلاگ ما</title>
    </Head>
      <main>
        <InnerContainer>
          <div className={classes.blogWrapper}>
            <h2>لیست مقالات ما</h2>
            <h5>آخرین اخبار و مقالات ما را اینجا دنبال کنید</h5>
            <div className={classes.header}>
              <span>{blogs?.total_count} مقاله</span>
              {/* <SelectInput
                withoutControl
                options={[
                  { label: "همه مقالات", value: "" },
                  { label: "نوشته‌های متنی", value: "text" },
                  { label: "ویدئوها", value: "video" },
                ]}
                defaultValue={{ label: "همه مقالات", value: "" }}
              /> */}
            </div>
            <Grid
              container
              spacing={2}
              style={{ marginTop: "4px" }}
              className={classes.blogs}
            >
              {blogs?.items?.map(item => (
                <Grid item xs={6} sm={3}>
                  <PostCard
                    name={item?.title}
                    key={item?.id}
                    img={item?.image?.path}
                    id={item?.id}
                    date={item?.created_at}
                  />
                </Grid>
              ))}
            </Grid>
            <div className={classes.pagination}>
              <Pagination
                total={blogs?.total_count}
                onChange={hanldePaginationChange}
                pageSize={25}
                current={+offset + 1}
              />
            </div>
          </div>
        </InnerContainer>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const blogs = await getAllBlogs(query?.offset || 0);
  return {
    props: {
      blogs,
    },
  };
}
