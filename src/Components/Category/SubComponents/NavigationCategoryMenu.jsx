import React, { useState, useEffect } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Icons
import CategorySvg from "Assets/img/icons/category.svg";

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// width of each category in menu for desktop
const categoryElementWidth = 120;

const useStyles = makeStyles(theme => ({
  categoryMenu: {
    position: "absolute",
    top: "50%",
    width: "fit-content",
    left: "-90%",
    margin: "50px auto 0",
    background: "#ffffff",
    borderRadius: 22,
    padding: "28px 0 0px",
    zIndex: 5,
    "& > header": {
      "& > ul": {
        display: "flex",
        textAlign: "center",

        "& > li": {
          width: categoryElementWidth,
          ...theme.font.s14w700,
          "& a": {
            transition: "all ease 200ms ",
          },
        },
      },
    },
  },
  line: {
    position: "relative",
    width: "100%",
    height: 2,
    background: "#F6F7FB",
    marginTop: 14,
  },
  activeLine: {
    position: "absolute",
    top: 0,
    width: categoryElementWidth,
    height: 2,
    borderRadius: 5,
    background: "#FFAC2F",
    transition: "all ease 400ms ",
  },
  content: {
    padding: "30px 60px 60px",
    display: "flex",
    position: "relative",
  },
  links: {
    height: 300,
    paddingRight: 32,
    borderRight: "1px solid #E0E0E0",
    "& li": {
      marginBottom: 30,
      "& a": {
        ...theme.font.s16w700,
        color: "#6A759A",
      },
    },
  },
  categoryItems: {
    display: "flex",
  },
  categoryColumn: {
    paddingLeft: 20,
    marginRight: 60,

    "& > h5": {
      ...theme.font.s16w700,
      color: "#6A759A",
      marginBottom: 22,
    },

    "& li": {
      ...theme.font.s16w500,
      marginBottom: 12,
    },
  },
  topStores: {
    position: "absolute",
    right: 200,
    "& > h5": {
      ...theme.font.s16w700,
      color: "#6A759A",
      marginBottom: 22,
    },
  },

  "@media(max-width: 1300px)": {
    categoryMenu: {
      left: "-170%",
    },
  },

  "@media(max-width: 1200px)": {
    categoryMenu: {
      left: "-160%",
      "& > header": {
        "& > ul": {
          "& > li": {
            width: 100,
          },
        },
      },
    },
    activeLine: {
      width: 100,
    },
  },

  // "@media(max-width: 1125px)": {
  //   categoryMenu: {
  //     left: "-180%",
  //   },
  // },
  // "@media(max-width: 1100px)": {
  //   categoryMenu: {
  //     "& > header": {
  //       "& > ul": {
  //         "& > li": {
  //           width: 100,
  //         },
  //       },
  //     },
  //   },
  // },
}));

const cat = [
  { title: "زیورآلات" },
  { title: "اکسسوری" },
  { title: "دکوری" },
  { title: "فرش و قالی" },
  { title: "پذیرایی و آشپزخانه" },
  { title: "محصولات فرهنگی" },
  { title: "موسیقی " },
  { title: "بازی و سرگرمی" },
  { title: "پوشاک" },
];

const subCat = [
  {
    id: 0,
    cats: [
      {
        mainTitle: "مردانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
        ],
      },
    ],
  },
  {
    id: 1,
    cats: [
      {
        mainTitle: "",
        subCats: [
          { title: "کیف پول" },
          { title: "عینک" },
          { title: "کیف" },
          { title: "کیف" },
          { title: "کیف" },
        ],
      },
    ],
  },
  {
    id: 2,
    cats: [
      {
        mainTitle: "مردانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
        ],
      },
      {
        mainTitle: "زنانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
          { title: "انگشتر" },
          { title: "انگشتر" },
          { title: "انگشتر" },
        ],
      },
    ],
  },
  {
    id: 3,
    cats: [
      {
        mainTitle: "مردانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
        ],
      },
      {
        mainTitle: "زنانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
          { title: "انگشتر" },
          { title: "انگشتر" },
          { title: "انگشتر" },
        ],
      },
      {
        mainTitle: "بچه گانه",
        subCats: [{ title: "دستبند" }, { title: "انگشتر" }],
      },
    ],
  },
  {
    id: 4,
    cats: [
      {
        mainTitle: "مردانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
        ],
      },
    ],
  },
  {
    id: 5,
    cats: [
      {
        mainTitle: "مردانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
        ],
      },
    ],
  },
  {
    id: 6,
    cats: [
      {
        mainTitle: "مردانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
        ],
      },
    ],
  },
  {
    id: 7,
    cats: [
      {
        mainTitle: "مردانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
        ],
      },
    ],
  },
  {
    id: 8,
    cats: [
      {
        mainTitle: "مردانه",
        subCats: [
          { title: "دستبند" },
          { title: "گردنبند" },
          { title: "انگشتر" },
        ],
      },
    ],
  },
];

export default function NavigationCategoryMenu() {
  const classes = useStyles();
  const screenWidthUnder1200 = useMediaQuery("(max-width: 1200px)");
  console.log("screenWidthUnder1200: ", screenWidthUnder1200);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeDistanceFromRight, setActiveDistanceFromRight] = useState(0);
  console.log("activeDistanceFromRight: ", activeDistanceFromRight);

  const handleActiveLine = itemIndex => {
    setActiveCategoryIndex(itemIndex);
    setActiveDistanceFromRight(
      itemIndex * (screenWidthUnder1200 ? 100 : categoryElementWidth),
    );
  };

  // handle sub category content
  const [activeSubCategory, setActiveSubCategory] = useState(subCat[0]);

  useEffect(() => {
    setActiveSubCategory(
      subCat.filter(item => item.id === activeCategoryIndex)[0],
    );
  }, [activeCategoryIndex]);
  return (
    <div className={classes.categoryMenu}>
      <header>
        <ul>
          {cat &&
            cat.map((item, index) => (
              <li key={index} onMouseEnter={() => handleActiveLine(index)}>
                <Link href="/">
                  <a
                    style={{
                      color: activeCategoryIndex === index && "#FFAC2F",
                    }}
                  >
                    {item.title}
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        <div className={classes.line}>
          <div
            className={classes.activeLine}
            style={{ right: activeDistanceFromRight }}
          />
        </div>
      </header>
      <div className={classes.content}>
        <div className={classes.links}>
          <motion.ul variants={listVariants}>
            <motion.li variants={itemVariants}>
              <Link href="/">
                <a>پرفروش‌ترین‌ها</a>
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link href="/">
                <a>جدیدترین‌ها</a>
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link href="/">
                <a>پیشنهادهای ویژه</a>
              </Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link href="/">
                <a>تخفیف‌های ما</a>
              </Link>
            </motion.li>
          </motion.ul>
        </div>

        <div className={classes.categoryItems}>
          {activeSubCategory.cats.map(category => (
            <div className={classes.categoryColumn}>
              {!!category.mainTitle && <h5>{category.mainTitle}</h5>}

              <motion.ul variants={listVariants}>
                {category.subCats.map(subCat => (
                  <motion.li variants={itemVariants}>
                    <Link href="/">
                      <a>{subCat.title}</a>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>

        <div className={classes.topStores}>
          <h5>فروشگاه‌های منتخب</h5>
        </div>
      </div>
    </div>
  );
}
