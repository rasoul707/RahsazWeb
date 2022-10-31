import { useState } from "react";
import InnerContainer from "Components/Layout/InnerContainer";
import PageTemplate from "Components/Layout/PageTemplate";
import { makeStyles, Grid } from "@material-ui/core";
import { Spin } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { NormalInput, TextareaInput } from "Components/Inputs";
import { Button } from "Components/Button";

const useStyles = makeStyles(theme => ({
  aboutUs: {
    "& h3": {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 32,
    },
  },
  textItem: {
    marginBottom: 22,
    "& > strong": {
      fontSize: 16,
      fontWeight: 700,
      color: "#616161",
      display: "inline-block",
      marginRight: 16,
    },
    "& > span": {
      fontSize: 16,
      fontWeight: 500,
      color: "#151515",
    },
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
  persons: {
    "& > div": {
      display: "flex",
      alignItems: "flex-start",
      gap: 18,
      paddingBottom: 30,
      borderBottom: "1px solid #EBEBEB",
      marginBottom: 30,

      "& h4": {
        fontSize: 16,
        fontWeight: 700,
        color: "#333333",
        marginBottom: 20,
      },
      "& p": {
        fontSize: 14,
        fontWeight: 400,
        color: "#333333",
        marginBottom: 8,
      },
    },
    "& > div:last-child": {
      borderBottom: "none",
    },
  },
}));

export default function AboutUs() {
  const classes = useStyles();
  const methods = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async formData => {
    console.log("formData: ", formData);
  };
  return (
    <>
      <main>
        <InnerContainer>
          <PageTemplate
            breadcrumbs={[
              { text: "صفحه اصلی", link: "/" },
              { text: "درباره ما", link: null },
            ]}
          >
            <div className={classes.aboutUs}>
              <h3>شرکت راهساز ماشین عرشیا ایرانیان</h3>
              <div className={classes.textItem}>
                <strong>شماره ثبت :</strong>
                <span>69245 </span>
              </div>
              <div className={classes.textItem}>
                <strong>تاریخ تاسیس :</strong>
                <span> 27 / 5 / 1398</span>
              </div>
              <div className={classes.textItem}>
                <strong>محور اصلی فعالیت :</strong>
                <span>
                  واردات و تامین لوازم یدکی ماشین آلات راهسازی و معدنی
                </span>
              </div>
              <div className={classes.textItem}>
                <strong>رشته تخصصی فعالیت :</strong>
                <span>لوازم یدکی لودر های چینی</span>
              </div>
              <div className={classes.textItem}>
                <strong>مدیر عامل :</strong>
                <span>راضیه سلیمی</span>
              </div>
              <div className={classes.textItem}>
                <strong>رئیس هیئت مدیره :</strong>
                <span>مجید بخشایش اول</span>
              </div>
              <div className={classes.textItem}>
                <strong>آدرس دفتر مرکزی :</strong>
                <span>
                  مشهد _ خیابان کوشش _ کوشش 72 نبش خبیری 3_پلاک 33_ کدپستی
                  9164773781
                </span>
              </div>
              <div className={classes.textItem}>
                <strong>تلفن و فکس :</strong>
                <span> 10 خط 05133445566</span>
              </div>
              <div className={classes.textItem}>
                <strong>وب سایت رسمی :</strong>
                <span>www.ArshiaRahsazMachine.com</span>
              </div>
              <div className={classes.textItem}>
                <strong>پست الکترونیک :</strong>
                <span>info@ArshiaRahsazMachine.com</span>
              </div>

              <div className={classes.textBox}>
                <p>
                  راهساز ماشین، در سال ۱۳۸۸ پس از چندین سال کسب تجربه در زمینه
                  عرضه لوازم یدکی لودرهای چینی و خدمات پس از فروش ماشین آلات
                  چانگلین،در قالب فروشگاه در مشهد آغاز به کار کرد. شرکت راهساز
                  ماشین،در ابتدا تامین لوازم یدکی لودرهای XCMG را در برنامه کاری
                  خود داشت، سپس با توجه به نیاز بازار زمینه فعالیت خود را گسترش
                  داد،و تامین لوازم یدکی برند LONKING را نیز به محصولات خود
                  افزود. هم اکنون واردات مستمر لوازم یدکی انواع لودرهای چینی را
                  نظیرSDLG-XGMA-SEM-DEGONG را در دستور کار خود داشته و همواره
                  سعی در بهبود خدمات خود و رضایتمندی مشتریان دارد. افتخار می
                  کنیم که توانسته ایم نیاز قطعات یدکی مشتریانمان را،از جمله
                  معادن بزرگ و مطرح شرق کشور،شرکت های پیمانکاری و سایر معادن را
                  بر طرف و رضایت کامل این بخش از مشتریانمان را به خوبی تامین
                  نماییم. ماموریت ما،ایجاد جایگاه ارزشمند برای مشتریان و ارتقای
                  کارمندان میباشد. ارزشهای مدنظر این مجموعه صداقت،مسئولیت
                  پذیری،پذیرا بودن،فراگیر بودن،خلاق بودن و مشارکت پذیری میباشد.
                  تخصص ما واردات و فروش لوازم یدکی لودر چینی|قطعات یدکی لودر
                  چینی|لوازم لودر چینی|لوازم یدکی لودر چینی ZL50 میباشد.
                </p>
                <p>
                  ما با توجه به چشم انداز و اهداف شرکت،سعی در بهبود مستمر کیفیت
                  محصولات و ارتقاء خدمات به مشتریان داریم و از این رو برای به
                  کارگیری ،بهترین نیروهای متخصص در بخش های مختلف راهساز ماشین
                  اقدام نمودیم که به شرح چارت سازمانی زیر میباشد:
                </p>
              </div>

              <div className={classes.persons}>
                <div>
                  <img src="/images/person-1.png" />
                  <div>
                    <h4>خانم راضیه سلیمی</h4>
                    <p>
                      مدیر عامل،لیسانس در رشته بیولوژی، مسلط به زبان
                      انگلیسی.دارای مدرک CAE
                    </p>
                    <p>
                      عضو اتاق بازرگانی خراسان رضوی، مدیر بخش بازرگانی بین
                      المللی،عضو اصناف اتحادیه فروشندگان لوازم یدکی خراسان رضوی
                    </p>
                    <p>تلفن تماس داخلی:۱۰۵</p>
                  </div>
                </div>
                <div>
                  <img src="/images/person-2.png" />
                  <div>
                    <h4>آقای مجید بخشایش</h4>
                    <p>
                      آقای مجید بخشایش:رئیس هیئت مدیره،فارغ تحصیل رشته انسانی
                    </p>
                    <p>
                      دارای گواهی نامه های: Businese Improvement Based on
                      Competition Advantages ، Iso 31000:2009 & Iso 14971:2007
                      Risk Management Agility Sales Method
                    </p>
                    <p>
                      عضو اصناف اتحادیه فروشندگان لوازم یدکی خراسان رضوی ،آشنا
                      به زبان انگلیسی ،بیش از ۲۰ سال تجربه فروش لوازم یدکی ماشین
                      آلات راهسازی
                    </p>
                    <p>تلفن تماس داخلی:۱۰۱</p>
                  </div>
                </div>
                <div>
                  <img src="/images/person-3.png" />
                  <div>
                    <h4>خانم زهره شارعی</h4>
                    <p>
                      مدیر مالی،لیسانس زبان انگلیسی، مسلط به امور مالی و
                      حسابداری،با سابقه بیش از ۱۰ سال،فعالیت در پست مدیر مالی
                      شرکت های بین المللی و خصوصی
                    </p>
                    <p>تلفن تماس داخلی:۱۰۲</p>
                  </div>
                </div>
                <div>
                  <img src="/images/person-4.png" />
                  <div>
                    <h4>آقای سبحان بخشایش</h4>
                    <p>
                      مدیر فروش،لیسانس عمران، بیش از ۵ سال سابقه به عنوان
                      فروشنده
                    </p>
                    <p>تلفن تماس داخلی:۱۰۱</p>
                  </div>
                </div>
                <div>
                  <img src="/images/person-5.png" />
                  <div>
                    <h4>خانم اعظم طرقبه ای</h4>
                    <p>
                      مدیر بخش مدیریت ارتباط با مشتری CRM و پشتیبانی وب سایت
                      فروشگاه اینترنتی شرکت راهساز ماشین
                    </p>
                    <p>فوق لیسانس برنامه ریزی شهری</p>
                    <p>تلفن تماس : داخلی۱۰۳</p>
                  </div>
                </div>
                <div>
                  <img src="/images/person-6.png" />
                  <div>
                    <h4>آقای مجید مالوکی</h4>
                    <p>
                      سمت پشتیبانی و مدیر انبار،فارغ تحصیل علوم تجربی، دارای ۵
                      سال تجربه و سابقه انبارداری صنعتی
                    </p>
                    <p>تلفن تماس داخلی:۱۰۲</p>
                  </div>
                </div>
                <div>
                  <img src="/images/person-7.png" />
                  <div>
                    <h4>آقای عرشیا بخشایش</h4>
                    <p>
                      مسئول بخش آی تی و پشتیبانی وب سایت فروشگاه اینترنتی شرکت
                      راهساز ماشین
                    </p>
                    <p>تلفن تماس داخلی:۱۰۵</p>
                  </div>
                </div>
              </div>
            </div>
          </PageTemplate>
        </InnerContainer>
      </main>
    </>
  );
}
