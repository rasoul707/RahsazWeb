import InnerContainer from "Components/Layout/InnerContainer";
import CategoryFilter from "Components/Layout/CategoryFilter";
import TopSlider from "Components/HomaPage/TopSlider";
import Features from "Components/HomaPage/Features";
import Products from "Components/HomaPage/Products";
import MiddleBanners from "Components/HomaPage/MiddleBanners";
import BlogPosts from "Components/HomaPage/BlogPosts";
import BlogVideos from "Components/HomaPage/BlogVideos";
import { getSite } from "Services";
import { getBlogsHome } from "Services/front.api";
import useWindowDimensions from "hooks/useWindowDimensions";


export default function Home({ data, blogs, about, ff }) {
    const { width } = useWindowDimensions();
    return (
        <>
            {width >= 900 && <CategoryFilter />}
            <main>
                <InnerContainer>
                    {/* <TopSlider images={data?.sliders} /> */}
                    <Features about={about} />
                    <Products groups={data?.homepage_groups} />
                    <MiddleBanners banners={data?.banners} />
                    <BlogPosts blogs={blogs?.blog_posts} />
                    <BlogVideos videos={blogs?.aparat_links} />
                    <div style={{ height: "80px" }} />
                    {/*
                    <Categories />
                    <BestsellingProducts />
                    <HeroSection /> 
                    */}
                </InnerContainer>
            </main>
        </>
    );
}

export async function getStaticProps() {
    const data = await getSite();
    const blogs = await getBlogsHome();

    return {
        props: {
            data,
            blogs,
            ff: JSON.stringify(process.env)
        },
        revalidate: 10, // In seconds
    }
}
