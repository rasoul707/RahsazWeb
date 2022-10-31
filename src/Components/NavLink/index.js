import { makeStyles } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    marginRight: 28,

  },
  menu: {
    fontFamily: "Iran Yekan",
    ...theme.font.s16w700,
    color: theme.color.gray,
    position: "relative",
    height: "100%",
    "&:hover":{
        color:theme.color.boldOrange
    }
  },
  active: {
    color: theme.color.boldOrange,
    marginBottom:"10px",
    "&::after": {
      content: "''",
      display: "block",
      width: "100%",
      height: 3,
      background: theme.color.boldOrange,
      borderRadius: "2px",
      marginTop:"12px"
        // position:"absolute",
        // bottom:"0"
    },
  },
}));

const NavLink = ({ link = "/", name }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href={link}>
        <a
          className={`${router.pathname == link ? classes.active : ""} ${
            classes.menu
          }`}
        >
         <span>{name}</span> 
        </a>
      </Link>
    </div>
  );
};
export default NavLink;
