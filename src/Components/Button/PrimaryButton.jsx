import { makeStyles } from "@material-ui/core/styles";
import { Spin } from "antd";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: props => props.padding,
    background: props => props.background,
    width: props => props.width,
    color: props => props.color,
    border: props =>
      props.border || `1px solid ${props.borderColor || props.color}`,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 8,
    "& path": {
      fill: props => props.iconColor,
    },

    "&:hover": {
      background: props => props.background,
      color: props => props.color,
    },

    minWidth: "auto",
  },
  bordered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: props => props.padding,
    background: '#fff',
    width: props => props.width,
    border: ({ black }) => black ? '1px solid #EBEBEB' : '1px solid ' + theme.color.boldOrange,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 8,
    color: ({ black }) => black ? "#333333" : theme.color.boldOrange,
    "& path": {
      fill: props => props.iconColor,
    },

    "&:hover": {
      borderColor: ({ black }) => black ? "black" : theme.color.boldOrange,
      color: ({ black }) => black ? "black" : theme.color.boldOrange,
      background: "#fff"
    },

    minWidth: "auto",
  }
}));

export default function PrimaryButton({
  className,
  children,
  background = "#F6891F",
  padding = "12px 16px",
  width = "auto",
  color = "#FFFFFF",
  iconColor = "#FFFFFF",
  borderColor,
  border,
  loading,
  bordered = false,
  black = false,
  isLink = false,
  href = "/",
  ...restProps
}) {
  const classes = useStyles({
    background,
    padding,
    width,
    color,
    borderColor,
    iconColor,
    border,
    black
  });
  let finalClass = bordered ? classes.bordered : classes.root
  if (isLink) {
    return (
      <Link href={href} legacyBehavior>
        <a className={clsx(finalClass, className)} {...restProps}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <Button
      variant="text"
      className={clsx(finalClass, className)}
      {...restProps}
    >
      {loading ? <Spin size="small" spinning={loading} /> : children}
    </Button>
  );
}
