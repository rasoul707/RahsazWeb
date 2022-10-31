import { makeStyles } from "@material-ui/core/styles";
import { ModalWrapper } from "reoverlay";

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 475,
    width: 475,
    position: "relative",
    padding: "5px 20px 15px;",
    borderRadius: theme.spacing(1),
    background: "#F9F9FB",
    overflow: "hidden",
    "@media(max-width: 576px)": {
      height: "100vh",
      width: "100%",
      maxWidth: "100%",
      padding: "20px",
      borderRadius: 0,
      overflowY: "scroll",
      backgroundColor: "#F9F9FB !important",
    },
  },
}));

export default function ModalWrapperCustom({ children }) {
  const classes = useStyles();
  return (
    <ModalWrapper contentContainerClassName={classes.paper}>
      {children}
    </ModalWrapper>
  );
}
