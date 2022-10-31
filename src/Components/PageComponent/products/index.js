import { makeStyles } from "@material-ui/core";
import { Col, Row, Spin } from "antd";
import React from "react";
import PageTemplate from "Components/Layout/PageTemplate";

import ProductsItem from "./ProductsItem";
import { getProducts } from "Services";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "Components/ui/Pagintaion";

const useStyles = makeStyles(theme => ({
  pagination: {
    width: "100%",
    marginTop: 32,
    paddingBottom: 32,
    display: "flex",
    justifyContent: "center",
  },
}));

const ProductsPage = () => {
  const classes = useStyles();
  const { query } = useRouter();
  let mega_menu = query?.mega_menu_id;
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);
  const [product, setProducts] = useState({});
  // console.log("products", product);

  const hanldePaginationChange = page => {
    setOffset(page - 1);
  };

  useEffect(() => {
    let isRemoved = false;
    const fetchData = async () => {
      setLoading(true);

      const response = await getProducts(offset, mega_menu, null, {
        category_level_1_id: query?.category_level_1_id
          ? query?.category_level_1_id?.trim()
          : null,
        category_level_2_id: query?.category_level_2_id
          ? query?.category_level_2_id?.trim()
          : null,
        category_level_3_id: query?.category_level_3_id
          ? query?.category_level_3_id?.trim()
          : null,
        category_level_4_id: query?.category_level_4_id
          ? query?.category_level_4_id?.trim()
          : null,
      });
      if (!isRemoved) {
        setProducts(response);
        setLoading(false);
      }

      setLoading(false);
    };
    if (!isRemoved) {
      fetchData();
    }
    return () => {
      isRemoved = true;
    };
  }, [
    mega_menu,
    offset,
    query?.category_level_1_id,
    query?.category_level_2_id,
    query?.category_level_3_id,
    query?.category_level_4_id,
  ]);

  return (
    <div className={classes.root}>
      <PageTemplate
        breadcrumbs={[
          { text: "صفحه اصلی", link: "/" },
          { text: "محصولات", link: null },
        ]}
        color="transparent"
        padding={"0px"}
      >
        <Spin spinning={loading}>
        {loading && <div style={{ height: "500px" }} />}

          {!loading && (
            <>
              <Row gutter={[24, 24]}>
                {product?.items?.map(item => (
                  <Col sm={12} xs={12} xl={4} xxl={4} key={item.id}>
                    <ProductsItem
                      name={item.name}
                      price={item.purchase_price}
                      image={item?.cover_image?.image?.path}
                      alt={item?.cover_image?.image?.alt}
                      id={item.id}
                    />
                  </Col>
                ))}
              </Row>
              {!loading && product?.items?.length == 0 ? (
                <h2 style={{ textAlign: "center" }}>محصولی یافت نشد</h2>
              ) : (
                <div className={classes.pagination}>
                  <Pagination
                    total={product?.total_count}
                    onChange={hanldePaginationChange}
                    pageSize={25}
                    current={+offset + 1}
                  />
                </div>
              )}
            </>
          )}
        </Spin>
      </PageTemplate>
    </div>
  );
};

export default ProductsPage;
