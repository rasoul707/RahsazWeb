import { useState } from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { makeStyles, Grid, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Spin, Tabs, Row, Col, Space, Divider, Collapse } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
import { useForm, FormProvider } from "react-hook-form";
import { NormalInput, TextareaInput } from "Components/Inputs";
import { Button } from "Components/Button";
import ImageGallery from "react-image-gallery";
import Counter from "Components/Counter";
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CommentCard, ProductCard } from "Components/Card";
import { Reoverlay } from "reoverlay";
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
  HatenaShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  HatenaIcon,
} from "react-share";
import ShareIcon from "Assets/img/icons/share.svg";
import BellIcon from "Assets/img/icons/bell.svg";
import { getProductWithId, sendCom } from "Services";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MyDivider from "Components/ui/MyDivider";
import { addToBasket } from "ReduxWrapper/actions/order.action";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "Services/order.api";
import useWindowDimensions from "hooks/useWindowDimensions";
import { toast } from "Utils/toast";
import { toFarsiNumber } from "Utils/helperFunction";
import Head from "next/head"

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';



const { TabPane } = Tabs;
const useStyles = makeStyles(theme => ({
  main: {
    minHeight: "40vh",
    display: "flex",
    "& .ant-tabs-rtl .ant-tabs-nav .ant-tabs-tab": {
      "@media only screen and (max-width: 768px)": {
        margin: "0 15px 0 0 "
      },
    },
    "& .ant-spin-nested-loading": {
      height: "100%",
    },
    "& .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn": {
      color: theme.color.boldOrange,
      textShadow: "none",
    },
    "& .ant-tabs-tab-btn": {
      color: "#D2D2D2",
    },
    "& .ant-tabs-ink-bar": {
      background: theme.color.boldOrange,
      height: "5px",
    },
    "& .ant-tabs-nav-list": {
      "@media only screen and (max-width: 768px)": {
        padding: "0 10px ",
        width: "100%",
      },
    },
    "& .ant-tabs-tab": {
      justifyContent: "center",
      "@media only screen and (max-width: 768px)": {
        // marginLeft: "10px !important",
      },
      "& >div>span": {
        ...theme.font.s16w700,
        "@media only screen and (max-width: 1120px)": {
          fontSize: "16px",
        },
        "@media only screen and (max-width: 768px)": {
          fontSize: "14px",
        },
      },
    },
  },
  productWrapper: {
    "& .image-gallery-thumbnail-image": {
      padding: 4,
      borderRadius: 8,
      border: "1px solid #EBEBEB",
      background: "#ffffff",
    },
    "& .image-gallery-image": {
      padding: "16px 8px",
      borderRadius: 8,
      border: "1px solid #EBEBEB",
      background: "#ffffff",
    },
  },
  productName: {
    color: "#333333",
    fontWeight: 700,
    fontSize: 16,
    borderBottom: "1px solid #EBEBEB",
    paddingBottom: 12,
    marginBottom: 20,
    "@media(max-width: 960px)": {
      marginTop: 20,
    },
  },
  Demo_some_network: {
    verticalAlign: "top",
    display: "inline-block",
    marginRight: 10,
    textAlign: "center"
  },
  Demo_some_network__share_button: {
    cursor: "pointer"
  },
  Demo_some_network_share_button: {
    opacity: 0.75,
    "& :hover:not(:active)": {
      opacity: 0.75
    }
  },
  main_social: {
    width: "100%",
  },
  social_title: {
    textAlign: "center",
    padding: 8,
    fontWeight: 4
  },
  social_body: {
    padding: 3,
    textAlign: "center",
  },
  underNameSection: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width: 960px)": {
      flexDirection: "column",
    },
  },
  abilityList: {
    "& > h3": {
      color: "#333333",
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 24,
    },
    "& > div": {
      marginBottom: 18,
      "& > span": {
        color: "#666666",
        fontWeight: 400,
        fontSize: 14,
      },
      "& > strong": {
        color: "#333333",
        fontWeight: 400,
        fontSize: 14,
      },
    },
    "& > button": {
      border: "none",
      background: "none",
      outline: "none",
      color: "#1F75F6",
      cursor: "pointer",
    },
  },
  checkoutBox: {
    width: 320,
    padding: "24px 20px",
    border: "1px solid #EBEBEB",
    borderRadius: 8,
    "@media(max-width: 960px)": {
      marginTop: "24px",
      width: "100%",
    },
    "& p": {
      color: "#333333",
      fontSize: 14,
      fontWeight: 400,
    },
    "& > hr": {
      color: "rgba(0, 0, 0, 0.2)",
      margin: "24px 0",
    },
    "& .text-item": {
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& > strong": {
        color: "#151515",
        fontSize: 14,
        fontWeight: 700,
      },
      "& > span": {
        color: "#151515",
        fontSize: 14,
        fontWeight: 400,
      },
    },
    "& .text-item:nth-child(3)": {
      "& > strong": {
        color: "#F6891F",
        "@media(max-width: 960px)": {
          ...theme.font.s20w700,
        },
      },
    },
  },
  similarProducts: {
    marginBottom: 80,
    "& > h2": {
      color: "#333333",
      fontWeight: 800,
      fontSize: 20,
      marginBottom: 20,
    },
  },
  mobile: {
    padding: "12px 20px",
    borderTop: "1px solid #EBEBEB",
    position: "fixed",
    bottom: "80px",
    height: "80px",
    width: "100%",
    background: "#fff",
    zIndex: 10,
  },
}));
export default function SingleProduct() {
  const classes = useStyles();
  const shareUrl = window.location.href;
  const title = 'Rahsaz';
  const [isMore, setIsMore] = useState(false);
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});
  const router = useRouter();
  const param = router?.query?.productId;
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [error, setError] = useState(false);
  const state = useSelector(state => state.user);
  const methods = useForm({
    defaultValues: {
      name: state?.user?.first_name || " ",
      email: state?.user?.email || "",
    },
  });
  const { Panel } = Collapse;
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const [cmSplice, setCmSplice] = useState(5);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  console.log("state", state);
  const gallery = [];
  gallery.push({
    original: `${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${product?.cover_image?.image?.path}`,
    thumbnail: `${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${product?.cover_image?.image?.path}`,
  });
  product?.gallery_images?.map(img =>
    gallery.push({
      key: img.id,
      original: `${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${img.image.path}`,
      thumbnail: `${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${img.image.path}`,
    }),
  );
  const cmSpliceHand = () => {
    setCmSplice(pre => pre + 5);
  };
  function toggle() {
    setShowPrice(wasOpened => !wasOpened);
  }

  const onSubmit = async (formData, type) => {
    console.log("formData: ", formData);
    if (!state?.token) {
      return router.push("/auth/login");
    }

    if (!formData.comment_content) {
      return setError(true);
    }

    try {
      await sendCom({
        id: param,
        type,
        content: formData.comment_content,
      })
        .then(res => {
          methods.reset();
          setError(false);
          toast.success("پیام با موفقیت ارسال شد");
        })
        .catch(err => {
          const error = err.response && (err.response || err.message);
          throw error;
        });
    } catch (err) {
      console.log("err__", err);
    }
  };
  const orderHand = async () => {
    if (!state?.token) {
      return router.push("/auth/login");
    }

    try {
      setOrder(true);
      await addToCart({
        product_id: product?.id,
        count,
      })
        .then(res => {
          console.log(res);
          dispatch(
            addToBasket({
              product_id: product?.id,
              count,
            }),
          );
          setOrder(false);
        })
        .catch(err => {
          const error = err.response && (err.response || err.message);
          setOrder(false);
          throw error;
        });
    } catch (err) {
      console.log("err__", err);
    }
  };
  useEffect(() => {
    let isRemoved = false;
    const fetchData = async () => {
      setLoading(true);
      setShowPrice(false);
      const product = await getProductWithId(param).catch(err =>
        setLoading(false),
      );
      if (!isRemoved) {
        setLoading(false);
        console.log(product);
        setProduct(product);
      }
    };
    if (param && !isRemoved) {
      fetchData();
    }

    return () => {
      isRemoved = true;
    };
  }, [param]);
  return (
    <>
      <Head>
        <title>
          {product?.name}
        </title>
      </Head>
      <main className={classes.main}>
        <InnerContainer>
          <Spin spinning={loading}>
            {!loading && (
              <>
                <PageTemplate
                  breadcrumbs={[
                    { text: "صفحه اصلی", link: "/" },
                    { text: "محصولات", link: "/products" },
                    // { text: "دسته بندی", link: "/" },
                    { text: product?.name, link: null },
                  ]}
                >
                  <div className={classes.productWrapper}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <ImageGallery
                          showPlayButton={false}
                          showNav={false}
                          infinite={false}
                          isRTL={true}
                          items={gallery}
                          useBrowserFullscreen={false}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <h2 className={classes.productName}>{product?.name}</h2>
                        <div className={classes.underNameSection}>
                          <div className={classes.abilityList}>
                            <h3>ویژگی‌های محصول</h3>
                            <div>
                              <span>نام کشور سازنده : </span>
                              <strong>{product?.manufacturing_country}</strong>
                            </div>
                            <div>
                              <span>وزن : </span>
                              <strong>{product?.weight} کیلوگرم</strong>
                            </div>
                            <div>
                              <span>عرض : </span>
                              <strong>{product?.width} سانتی متر</strong>
                            </div>
                            <div>
                              <span>ارتفاع : </span>
                              <strong>{product?.height} سانتی متر</strong>
                            </div>
                            {isMore &&
                              product?.product_attributes?.map(attr => {
                                return (
                                  <div key={attr.id}>
                                    <span>{attr.attribute_key} : </span>
                                    <strong>{attr.attribute_value}</strong>
                                  </div>
                                );
                              })}
                            {!isMore && (
                              <button onClick={() => setIsMore(true)}>
                                + موارد بیشتر
                              </button>
                            )}
                          </div>
                          <div>
                            <div className={classes.checkoutBox}>
                              <div className="text-item">
                                <span>وضعیت کالا</span>
                                <strong
                                  style={{
                                    color:
                                      product?.supply_count_in_store > 0
                                        ? "#2DBD4D"
                                        : "#FF0000",
                                  }}
                                >
                                  {product?.supply_count_in_store > 0
                                    ? "موجود"
                                    : "ناموجود"}
                                </strong>
                              </div>
                              {/* {product?.supply_count_in_store > 0 && ( */}
                              {product?.supply_count_in_store >= 0 && (
                                <>
                                  {" "}
                                  {product?.supply_count_in_store > 0 && (
                                    <div className="text-item">
                                      <span>تعداد</span>
                                      <Counter
                                        number={count}
                                        setNumber={setCount}
                                      />
                                    </div>
                                  )}
                                  <div className="text-item">
                                    <span>قیمت کالا
                                      {(product?.user_type == 'طلایی' || product?.user_type == 'نقره ای') ?
                                        (
                                          <>
                                            <BellIcon style={{
                                              margin: "0 5px",
                                              cursor: "pointer"
                                            }}
                                              onClick={toggle}
                                            />
                                          </>
                                        )
                                        :
                                        null
                                      }
                                    </span>
                                    <strong data-toggle="tooltip" title="Hooray!">
                                      {product?.purchase_price
                                        ? (product?.purchase_price).toLocaleString(
                                          "fa-IR",
                                        )
                                        : "به زودی"}{" "}
                                      {product?.purchase_price && "تومان"}
                                    </strong>
                                  </div>
                                  {showPrice ?
                                    (
                                      <div style={{ borderTop: "1px solid #EBEBEB", }}>
                                        {
                                          product?.user_type == 'طلایی' && product?.purchase_price ?
                                            (
                                              <>
                                                <Collapse
                                                  bordered={true}
                                                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                                  className="site-collapse-custom-collapse"
                                                >
                                                  <Panel header="نقره ای" key="1" className="site-collapse-custom-panel">
                                                    <p>{product?.price_in_toman_for_silver_group.toLocaleString("fa-IR",)} تومان</p>
                                                  </Panel>
                                                  <Panel header="برنزی" key="2" className="site-collapse-custom-panel">
                                                    <p>{product?.price_in_toman_for_bronze_group.toLocaleString("fa-IR",)} تومان</p>
                                                  </Panel>
                                                </Collapse>
                                              </>
                                            )
                                            :
                                            null
                                        }

                                        {
                                          product?.user_type == 'نقره ای' && product?.purchase_price ?
                                            (
                                              <>
                                                <Collapse
                                                  bordered={false}
                                                  defaultActiveKey={['1']}
                                                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                                  className="site-collapse-custom-collapse"
                                                >
                                                  <Panel header="برنزی" key="2" className="site-collapse-custom-panel">
                                                    <p>{product?.price_in_toman_for_bronze_group.toLocaleString("fa-IR",)} تومان</p>
                                                  </Panel>
                                                </Collapse>
                                              </>
                                            )
                                            :
                                            null
                                        }
                                      </div>
                                    )
                                    :
                                    null
                                  }
                                  {showPrice ?
                                    (
                                      <div className="text-item " style={{ borderTop: "1px solid #EBEBEB", }}>
                                        {
                                          product?.user_type == 'طلایی' && product?.purchase_price ?
                                            (
                                              <>
                                                <div>نقره ای : <br></br>{product?.price_in_toman_for_silver_group.toLocaleString("fa-IR",)} تومان</div>
                                                <div>برنزی : <br></br>{product?.price_in_toman_for_bronze_group.toLocaleString("fa-IR",)} تومان</div>
                                              </>
                                            )
                                            :
                                            null
                                        }

                                        {
                                          product?.user_type == 'نقره ای' && product?.purchase_price ?
                                            (
                                              <>
                                                <div>برنزی : {product?.price_in_toman_for_bronze_group.toLocaleString("fa-IR",)} تومان</div>
                                              </>
                                            )
                                            :
                                            null
                                        }
                                      </div>
                                    )
                                    :
                                    null
                                  }
                                </>
                              )}
                              {width >= 900 &&
                                product?.supply_count_in_store > 0 && (
                                  <Button
                                    width="100%"
                                    style={{
                                      marginBottom: "12px",
                                      marginTop: "12px",
                                    }}
                                    loading={order}
                                    onClick={orderHand}
                                  >
                                    افزودن به سبد خرید
                                  </Button>
                                )}
                              <p>{product?.note_before_buy}</p>
                              {width >= 900 && product?.supply_count_in_store == 0 && (
                                <Button
                                  width="100%"
                                  color="#333333"
                                  iconColor="#333333"
                                  background="#FAFAFA"
                                  border="1px solid #EBEBEB"
                                  style={{
                                    marginTop: "24px",
                                    display: "flex",
                                    gap: "5px",
                                  }}
                                  onClick={() => {
                                    if (state?.token) {
                                      return Reoverlay.showModal(
                                        "InventoryNotification",
                                        {
                                          id: product?.id,
                                        },
                                      );
                                    } else {
                                      router.push("/auth/login");
                                    }
                                  }}
                                >
                                  <BellIcon style={{ margin: "0 5px" }} />
                                  موجود شد به من اطلاع بده
                                </Button>
                              )}
                            </div>
                            {width >= 0 && (
                              <div className={classes.main_social}>
                                <div className={classes.social_title}><h4> اشتراک گذاری محصول</h4> </div>
                                <div className={classes.social_body} >
                                  {/* <div className={classes.Demo_some_network}>
                                  <FacebookShareButton
                                    url={shareUrl}
                                    quote={title}
                                    className={classes.Demo_some_network_share_button}
                                  >
                                    <FacebookIcon size={32} round />
                                  </FacebookShareButton>
                                  <div>
                                    <FacebookShareCount url={shareUrl} className="Demo__some-network__share-count">
                                      {count => count}
                                    </FacebookShareCount>
                                  </div>
                                </div> */}
                                  {/* <div className={classes.Demo_some_network}>
                                  <FacebookMessengerShareButton
                                    url={shareUrl}
                                    appId="521270401588372"
                                    className={classes.Demo_some_network_share_button}
                                  >
                                    <FacebookMessengerIcon size={32} round />
                                  </FacebookMessengerShareButton>
                                </div> */}
                                  <div className={classes.Demo_some_network}>
                                    <TwitterShareButton
                                      url={shareUrl}
                                      title={title}
                                      className={classes.Demo_some_network_share_button}
                                    >
                                      <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <div className="Demo__some-network__share-count">&nbsp;</div>
                                  </div>
                                  <div className={classes.Demo_some_network}>
                                    <TelegramShareButton
                                      url={shareUrl}
                                      title={title}
                                      className={classes.Demo_some_network_share_button}
                                    >
                                      <TelegramIcon size={32} round />
                                    </TelegramShareButton>
                                    <div className="Demo__some-network__share-count">&nbsp;</div>
                                  </div>
                                  <div className={classes.Demo_some_network}>
                                    <WhatsappShareButton
                                      url={shareUrl}
                                      title={title}
                                      separator=":: "
                                      className={classes.Demo_some_network_share_button}
                                    >
                                      <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    <div className="Demo__some-network__share-count">&nbsp;</div>
                                  </div>
                                  <div className={classes.Demo_some_network}>
                                    <LinkedinShareButton url={shareUrl} className={classes.Demo_some_network_share_button}>
                                      <LinkedinIcon size={32} round />
                                    </LinkedinShareButton>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    <div style={{ marginTop: "32px" }} />
                    <Tabs defaultActiveKey="1" centered>
                      <TabPane tab="توضیحات محصول" key="1">
                        {product?.description || (
                          <h3
                            style={{ padding: "50px 0", textAlign: "center" }}
                          >
                            توضیحی ثبت نشده است{" "}
                          </h3>
                        )}
                      </TabPane>
                      <TabPane
                        tab={`دیدگاه ها (${toFarsiNumber(product?.comments?.length) ||
                          toFarsiNumber(0)
                          })`}
                        key="2"
                      >
                        {!product?.comments?.length ? (
                          <h3
                            style={{ padding: "50px 0", textAlign: "center" }}
                          >
                            دیدگاهی وجود ندارد{" "}
                          </h3>
                        ) : (
                          product?.comments
                            ?.slice(0, cmSplice)
                            ?.map((comment, i) => (
                              <CommentCard
                                key={comment.id}
                                user={comment.user}
                                content={comment.content}
                                date={comment.created_at}
                                answer={!!comment.children.length}
                                reply={comment.children?.[0]}
                                isLast={
                                  product.comments.slice(0, cmSplice).length -
                                  i ==
                                  1
                                }

                              />
                            ))
                        )}
                        {cmSplice <= product?.comments?.length && (
                          <>
                            <Button
                              width="100%"
                              bordered
                              black
                              onClick={cmSpliceHand}
                            >
                              نمایش بیشتر
                            </Button>
                            <MyDivider />
                          </>
                        )}
                        <FormProvider {...methods}>
                          <form
                            onSubmit={methods.handleSubmit(formData =>
                              onSubmit(formData, "comment"),
                            )}
                          >
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={3}>
                                <NormalInput
                                  name="name"
                                  label="نام"
                                  placeholder="نام خود را وارد کنید"
                                  disabled
                                />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <NormalInput
                                  name="email"
                                  label="نشانی ایمیل"
                                  placeholder="ایمیل خود را وارد کنید"
                                  disabled
                                />
                              </Grid>
                              {width < 900 ? (
                                <Grid item xs={12} sm={3}>
                                  <TextareaInput
                                    name="comment_content"
                                    label="دیدگاه شما"
                                    placeholder="دیدگاه خود را وارد کنید"
                                  />
                                </Grid>
                              ) : (
                                <Grid item xs={12} sm={4}></Grid>
                              )}
                              <Grid item xs={12} sm={2}>
                                <Button
                                  width="100%"
                                  color="#FF921F"
                                  iconColor="#FF921F"
                                  background="transparent"
                                  border="1px solid #FF921F"
                                  type="submit"
                                >
                                  ثبت دیدگاه
                                </Button>
                              </Grid>
                            </Grid>
                            {width >= 900 && (
                              <TextareaInput
                                name="comment_content"
                                label="دیدگاه شما"
                                placeholder="دیدگاه خود را وارد کنید"
                              />
                            )}
                            {error ? (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  paddingTop: "10px",
                                }}
                              >
                                اطفا فیلد ها را کامل کنید{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </form>
                        </FormProvider>
                      </TabPane>
                      <TabPane tab="پرسش و پاسخ" key="3">
                        {product?.qas?.length >= 1 ? (
                          product?.qas?.map(cm => (
                            <CommentCard
                              user={cm.user}
                              key={cm.id}
                              content={cm.content}
                              date={cm.created_at}
                              answer={!!cm.children.length}
                              reply={cm.children?.[0]}
                            />
                          ))
                        ) : (
                          <h3
                            style={{ padding: "50px 0", textAlign: "center" }}
                          >
                            پرسشی وجود ندارد{" "}
                          </h3>
                        )}
                        <h3 style={{ marginBottom: "24px" }}>
                          سوال و جواب مشتریان
                        </h3>
                        <FormProvider {...methods}>
                          <form
                            onSubmit={methods.handleSubmit(formData =>
                              onSubmit(formData, "question_and_answer"),
                            )}
                          >
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={12} sm={3}>
                                <NormalInput
                                  name="name"
                                  label="نام"
                                  placeholder="نام خود را وارد کنید"
                                  disabled
                                />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <NormalInput
                                  name="email"
                                  label="نشانی ایمیل"
                                  placeholder="ایمیل خود را وارد کنید"
                                  disabled
                                />
                              </Grid>
                              {width < 900 ? (
                                <Grid item xs={12} sm={3}>
                                  <TextareaInput
                                    name="comment_content"
                                    label="دیدگاه شما"
                                    placeholder="دیدگاه خود را وارد کنید"
                                  />
                                </Grid>
                              ) : (
                                <Grid item xs={12} sm={4}></Grid>
                              )}
                              <Grid item xs={12} sm={2}>
                                <Button
                                  width="100%"
                                  color="#FF921F"
                                  iconColor="#FF921F"
                                  background="transparent"
                                  border="1px solid #FF921F"
                                  type="submit"
                                >
                                  ثبت پرسش
                                </Button>
                              </Grid>
                            </Grid>
                            {width >= 900 && (
                              <TextareaInput
                                name="comment_content"
                                label="پرسش شما"
                                placeholder="پرسش خود را وارد کنید"
                              />
                            )}
                            {error ? (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  paddingTop: "10px",
                                }}
                              >
                                اطفا فیلد ها را کامل کنید{" "}
                              </p>
                            ) : (
                              ""
                            )}
                          </form>
                        </FormProvider>
                      </TabPane>
                    </Tabs>
                  </div>
                </PageTemplate>
                {product?.similar_products?.length >= 1 && (
                  <div className={classes.similarProducts}>
                    <h2>محصولات پیشنهادی</h2>
                    <Grid container spacing={2} style={{ marginTop: "20px" }}>
                      {product?.similar_products?.map(item => {
                        return (
                          <Grid item xs={6} sm={2} key={item.id}>
                            <ProductCard
                              price={item.product.purchase_price}
                              name={item.product.name}
                              id={item.product.id}
                              img={item?.product?.cover_image?.image?.path}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                )}
              </>
            )}
          </Spin>
        </InnerContainer>
      </main>
      {width < 900 && (
        <div className={classes.mobile}>
          {product?.supply_count_in_store == 0 ? (
            <Button
              width="100%"
              color="#333333"
              iconColor="#333333"
              background="#FAFAFA"
              border="1px solid #EBEBEB"
              onClick={() => {
                if (state?.token) {
                  return Reoverlay.showModal("InventoryNotification", {
                    id: product?.id,
                  });
                } else {
                  router.push("/auth/login");
                }
              }}
            >
              <BellIcon style={{ margin: "0 5px" }} />
              موجود شد به من اطلاع بده
            </Button>
          ) : (
            <Button width="100%" loading={order} onClick={orderHand}>
              افزودن به سبد خرید
            </Button>
          )}
        </div>
      )}
    </>
  );
}