import React, { useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

// Icons
import ArrowDownSvg from "Assets/img/icons/arrow-down.svg";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& .MuiAccordion-root": {
      borderRadius: 30,
      boxShadow: "none",
      background: "#ffffff",
    },
    "& .MuiButtonBase-root": {
      background: "#ffffff",
      padding: "5px 18px",
      borderRadius: 30,
    },
    "& .MuiAccordionDetails-root": {
      position: "relative",
      flexDirection: "column",
    },
  },
  heading: {
    color: "#0A194B",
    fontSize: 14,
    fontWeight: 700,
  },
  line: {
    width: "100%",
    height: 1,
    background: "#EAEAEB",
    position: "absolute",
    left: 0,
    top: -8,
  },
  subAccordion: {
    width: "100%",

    "&::before": {
      display: "none",
    },

    "& .MuiButtonBase-root": {
      padding: "0 10px 0 18px",
    },
    "& ul": {
      "& li": {
        "&::before": {
          display: "inline-block",
          content: "''",
          width: 6,
          height: 1,
          background: "#9CB4CC",
          marginRight: 12,
        },
        "& > a": {
          ...theme.font.s14w500,
          marginBottom: 16,
          display: "inline-block",
          color: "#0A194B",
        },
      },
    },
  },
  subLine: {
    width: "100%",
    height: 1,
    background: "#F2F7FC",
  },
  subHeading: {
    color: "#6A759A",
    fontSize: 14,
    fontWeight: 700,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  // handle wich sub accordion open
  // (becuse just one sub accordion must be open)
  const [openSubAccordion, setOpenSubAccordion] = useState(0);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownSvg />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>زیور آلات</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.line} />

          <Accordion
            className={classes.subAccordion}
            expanded={openSubAccordion === 0}
            onClick={() => setOpenSubAccordion(0)}
          >
            <AccordionSummary
              expandIcon={<ArrowDownSvg />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.subHeading}>زنانه</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  <Link href="/">
                    <a>زیورآلات</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>اکسسوری</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>دکوری</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>فرش و قالی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>پذیرایی و آشپزخانه</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>محصولات فرهنگی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>موسیقی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>بازی و سرگرمی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>پوشاک</a>
                  </Link>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <div className={classes.subLine} />
          <Accordion
            className={classes.subAccordion}
            expanded={openSubAccordion === 1}
            onClick={() => setOpenSubAccordion(1)}
          >
            <AccordionSummary
              expandIcon={<ArrowDownSvg />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.subHeading}>مردانه</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  <Link href="/">
                    <a>زیورآلات</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>اکسسوری</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>دکوری</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>فرش و قالی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>پذیرایی و آشپزخانه</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>محصولات فرهنگی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>موسیقی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>بازی و سرگرمی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>پوشاک</a>
                  </Link>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <div className={classes.subLine} />
          <Accordion
            className={classes.subAccordion}
            expanded={openSubAccordion === 2}
            onClick={() => setOpenSubAccordion(2)}
          >
            <AccordionSummary
              expandIcon={<ArrowDownSvg />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.subHeading}>بچه گانه</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  <Link href="/">
                    <a>زیورآلات</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>اکسسوری</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>دکوری</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>فرش و قالی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>پذیرایی و آشپزخانه</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>محصولات فرهنگی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>موسیقی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>بازی و سرگرمی</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>پوشاک</a>
                  </Link>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
