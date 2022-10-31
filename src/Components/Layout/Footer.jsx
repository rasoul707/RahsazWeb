import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";
import InnerContainer from "./InnerContainer";
import { filterByStr, toFarsiNumber } from "Utils/helperFunction";
import { Form } from "antd";
import AntInput from "Components/Inputs/AntInput";
// Icons
import LogoSvg from "Assets/img/icons/logo.svg";
import InstagramSvg from "Assets/img/icons/instagram-white.svg";
import WhatsappSvg from "Assets/img/icons/whatsapp-white.svg";
import TelegramSvg from "Assets/img/icons/telegram-white.svg";
import { postRss } from "Services";
import { toast } from "Utils/toast";

const useStyles = makeStyles(theme => ({
  footer_root: {
    paddingTop: 80,
    background: "#151515",
    color: "#ffffff",
    "& hr": {
      border: "1px solid #333333",
      margin: "10px 0",
    },
    "& .mainFooter": {
      paddingBottom: 130,
    },
    "& .subFooter": {
      position: "relative",
      paddingBottom: 50,
    },
    "& .footerLogo": {
      height: 80,
      "& svg": {
        transformOrigin: "0 0",
        transform: "scale(2)",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
      },
    },
    "& p": {
      ...theme.font.s14w500,
      lineHeight: 1.7,
      margin: 0,
      padding: ".7rem 1rem .7rem 0",
      color: "#ffffff",
    },
    "& ul": {
      textTransform: "capitalize",
    },
    "& ul.menu": {
      "& li": {
        color: "#ffffff",
        "& > a": {
          ...theme.font.s14w500,
          padding: ".7rem 1rem .7rem 0",
          display: "block",
          color: "#ffffff",
        },
      },
    },
    "& ul.social": {
      "& li": {
        padding: ".65rem",
        borderRadius: "50%",
        transition: theme.transitions.linkActive,
        "& > a": {
          display: "block",
          width: 30,
          height: 30,
        },
        "&:hover": {
          background: theme.palette.secondary.main,
        },
      },
    },
    "& .MuiTextField-root": {
      marginBottom: 43,
      width: "100%",
      "& input": {
        ...theme.font.s14w500,
        background: "#FFFFFF",
        borderRadius: 5,
        border: "none",
        padding: "15px 17px",
        "&::placeholder": {
          color: "#A2ABB8",
          fontSize: 15,
          verticalAlign: "middle",
        },
      },
    },
    "& .btnMoveToTop": {
      position: "absolute",
      right: 0,
    },
  },
  footerLogo: {
    "& > h3": {
      fontSize: 30,
      fontWeight: 700,
      maxWidth: "60%",
      margin: "28px 0 60px",
    },
  },
  socialIcons: {
    display: "flex",
    // justifyContent: "space-between",
    gap: "20px",

    "& > a": {
      // marginRight: 30,
    },
  },
  menuList: {
    "& > h5": {
      ...theme.font.s16w900,
      marginBottom: 16,
      color: "#ffffff",
    },
    "& > ul": {
      "& > li": {
        marginBottom: 13,
        fontSize: 14,
        "&  a": {
          color: "#ffffff",
        },
      },
    },
  },
  footerAboutUs: {
    display: "flex",
    alignItems: "flex-start",
    gap: 28,
    "& p": {
      width: "100%",
    },
    "@media(max-width: 960px)": {
      display: "none",
    },
  },
  namad: {
    display: "flex",
    gap: 8,
    // height: "100%",
    alignItems: "center",
    "& div": {
      backgroundColor: "#fff",
      borderRadius: "8px",
      width: "100%",
      height: "100%",
      padding: "5px 0",
      "@media(max-width: 960px)": {
        width: "80%",
        height: "90%",
      },
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      },
    },
  },
  left: {
    display: "flex",
    color: "#fff",
    justifyContent: "space-between",
    // alignItems: "center",
    flexDirection: "column",
    gap: 10,
    "@media(max-width: 960px)": {
      marginTop: "20px",
    },
  },
  texts: {
    color: "#fff",
    "& > h5": {
      ...theme.font.s16w900,
      marginBottom: 16,
      color: "#ffffff",
    },
    "& > ul": {
      "& > li": {
        marginBottom: 13,
        fontSize: 14,
        "&  a": {
          color: "#ffffff",
        },
      },
    },
  },
  submit: {
    background: "#EBEBEB",
    border: "none",
    borderRadius: 8,
    ...theme.s14w500,
    height: "100%",
    width: 80,
    color: "#333333",
    cursor: "pointer"
  },
  label: {
    ...theme.font.s16w900,
    marginTop: "20px",
    color: "#ffffff",
  },
  sub: {
    fontSize: "12px !important",
    fontWeight: "500 !important",
    "@media(max-width: 960px)": {
      textAlign: "center",
    },
  },
  our_form: {
    "@media(max-width: 960px)": {
      marginTop: "20px",
    },
  },
}));

export default function Footer({ about }) {
  const classes = useStyles();
  const [form] = Form.useForm()
  const onFinish = value => {
    try {
      postRss(value)
        .then(res => {
          toast.success("با موفقیت عضو شدید");
          form.resetFields()
        })
        .catch(err => err);
    } catch (error) { }
  };
  let phone = filterByStr("footer_phone", "field_key", about)?.field_value;
  let hour = filterByStr(
    "footer_working_hour",
    "field_key",
    about,
  )?.field_value;
  let address = filterByStr("footer_address", "field_key", about)?.field_value;
  let whatsapp = filterByStr(
    "footer_whatsapp",
    "field_key",
    about,
  )?.field_value;
  let telegram = filterByStr(
    "footer_telegram",
    "field_key",
    about,
  )?.field_value;
  let instagram = filterByStr(
    "footer_instagram",
    "field_key",
    about,
  )?.field_value;
  let aboutUs = filterByStr("footer_about_us", "field_key", about)?.field_value;
  let enamad = filterByStr("enamad_code", "field_key", about)?.field_value;
  let unionCode = filterByStr("union_code", "field_key", about)?.field_value;
  let organizingCode = filterByStr(
    "organizing_code",
    "field_key",
    about,
  )?.field_value;

  return (
    <footer className={classes.footer_root}>
      <InnerContainer>
        <Grid container>
          <Grid item xs={6} md={2}>
            <div className={classes.menuList}>
              <h5>در راهساز ماشین</h5>
              <ul>
                <li>
                  <Link href="/blog" legacyBehavior>
                    <a>وبلاگ ما</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" legacyBehavior>
                    <a>درباره ما</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" legacyBehavior>
                    <a>تماس با ما</a>
                  </Link>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={6} md={2}>
            <div className={classes.menuList}>
              <h5>خدمات مشتریان</h5>
              <ul>
                <li>
                  <Link href="/" legacyBehavior>
                    <a>سوالات متداول</a>
                  </Link>
                </li>
                <li>
                  <Link href="/" legacyBehavior>
                    <a>حریم خصوصی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/" legacyBehavior>
                    <a>راهنمای خرید از سایت</a>
                  </Link>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.menuList}>
              <h5 className={classes.our_form}>فرم‌های ما</h5>
              <ul>
                <li>
                  <Link href="/cooperation-request" legacyBehavior>
                    <a>درخواست همکاری و نمایندگی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/" legacyBehavior>
                    <a>درخواست درگاه فروش</a>
                  </Link>
                </li>
                <li>
                  <Link href="/complaints" legacyBehavior>
                    <a>انتقادات، پیشنهادات و شکایات</a>
                  </Link>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className={`${classes.menuList} ${classes.left}`}>
              <div className={classes.texts}>
                <h5>راه‌های ارتباطی ما</h5>
                <ul>
                  <li>
                    تلفن : {toFarsiNumber(phone)}
                  </li>
                  <li>
                    ساعت کار : {hour}
                  </li>
                  <li style={{ marginTop: "6px" }}>آدرس :{address}</li>
                </ul>
              </div>
              <div className={classes.socialIcons}>
                <a href={instagram}>
                  <InstagramSvg />
                </a>
                <a href={whatsapp}>
                  <WhatsappSvg />
                </a>
                <a href={telegram}>
                  <TelegramSvg />
                </a>
              </div>
            </div>
            <div>
              <Form layout="vertical" onFinish={onFinish} requiredMark={false} form={form}>
                <Form.Item
                  name="email"
                  rules={[
                    { type: "email", message: "ایمیل معتبر وارد کنید " },
                    { required: true, message: "ایمیل خود را وارد کنید " },
                  ]}
                  label={<div className={classes.label}>عضویت در خبرنامه</div>}
                >
                  <AntInput
                    suffix={
                      <button type="submit" className={classes.submit}>
                        عضویت
                      </button>
                    }
                    placeholder="ایمیل خود را وارد کنید"
                  />
                </Form.Item>
              </Form>
            </div>
          </Grid>
        </Grid>
      </InnerContainer>
      <hr />
      <InnerContainer>
        <Grid container>
          <Grid item xs={12} md={9}>
            <div className={classes.footerAboutUs}>
              <img src="/images/logo-footer.png" alt="" />
              <p>
                {aboutUs}
              </p>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.namad}>
              <div>
                <img src="/images/logo-footer3.png" alt="" />
              </div>
              <div>
                <img src="/images/logo-footer2.png" alt="" />
              </div>
              <div>
                <img src="/images/logo-footer4.png" alt="" />
              </div>
            </div>
          </Grid>
        </Grid>
      </InnerContainer>
      <hr />
      <InnerContainer>
        <p className={classes.sub}>
          کلیه حقوق این سایت متعلق به شرکت عرشیا راه‌ساز ماشین می‌باشد.
        </p>
      </InnerContainer>
    </footer>
  );
}
