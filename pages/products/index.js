import React from "react";
import CategoryFilter from "Components/Layout/CategoryFilter";
import InnerContainer from "Components/Layout/InnerContainer";
import ProductsPage from "Components/PageComponent/products";
import useWindowDimensions from "hooks/useWindowDimensions";
import Head from "next/head"

const Products = () => {
  const { width } = useWindowDimensions();
  return (
    <>
   <Head>
     <title>
       محصولات
     </title>
   </Head>
    <div>
      {width >= 900 && <CategoryFilter />}

      <main>
        <InnerContainer>
          <ProductsPage />
        </InnerContainer>
      </main>
    </div>
    </>
  );
};

export default Products;
