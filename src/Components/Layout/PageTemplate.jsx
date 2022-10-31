import { makeStyles } from "@material-ui/core";
import Breadcrumb from "Components/Breadcrumb";

const useStyles = makeStyles(theme => ({
  templateWrapper: {
    paddingTop: 20,
    paddingBottom: 80,
    "& > h3": {
      fontSize: 16,
      fontWeight: 700,
      color: "#333333",
    },
  },
  content: {
    marginTop: 20,
    padding:({padding})=>padding?padding: "24px 32px",
    background:({color})=>color?color: "#ffffff",
    borderRadius: 8,
    "@media only screen and (max-width: 768px)": {
      padding: "10px !important",
    },
  },
}));

export default function PageTemplate({ title, breadcrumbs, children,color,padding }) {
  const classes = useStyles({color,padding});

  return (
    <div className={classes.templateWrapper}>
      {title ? <h3>{title}</h3> : <Breadcrumb breadcrumbs={breadcrumbs} />}

      <div className={classes.content}>{children}</div>
    </div>
  );
}
