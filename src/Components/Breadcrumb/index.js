import { makeStyles, Breadcrumbs } from "@material-ui/core";
import Link from "next/link";

// Assets
import { breadcrumbStyle } from "Components/Breadcrumb/styles/breadcrumb.style";

const useStyles = makeStyles(breadcrumbStyle);

export default function Index({ breadcrumbs }) {
  const classes = useStyles();

  const BreadCrumbSeparator = () => (
    <span
      style={{
        fontSize: "16px",
      }}
    >
      /
    </span>
  );

  return (
    <Breadcrumbs
      separator={<BreadCrumbSeparator />}
      aria-label="breadcrumb"
      className={classes.breadcrumb}
    >
      {breadcrumbs?.map((item, index) =>
        index !== breadcrumbs?.length - 1 ? (
          <Link href={item.link} key={index} legacyBehavior>
            <a>{item.text}</a>
          </Link>
        ) : (
          <p key={index}>{item.text}</p>
        ),
      )}
    </Breadcrumbs>
  );
}
