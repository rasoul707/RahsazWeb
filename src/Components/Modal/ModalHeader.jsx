import { makeStyles } from "@material-ui/core/styles";
import { Reoverlay } from "reoverlay";

// Icons
import CloseSvg from "Assets/img/icons/close.svg";

const useStyles = makeStyles(theme => ({
  header: {
    width: "140%",
    marginLeft: "-20%",
    textAlign: "center",
    paddingBottom: 20,
    marginBottom: 20,
    borderBottom: "1px solid #EBEBEB",
    "& svg": {
      position: "absolute",
      left: 20,
      top: 14,
      cursor: "pointer",
    },
    "& h3": {
      marginTop: 8,
      fontSize: 18,
      fontWeight: 700,
      color: "#6A759A",
    },
  },
}));

export default function ModalHeader({ title }) {
  const closeModal = () => {
    Reoverlay.hideModal();
  };

  const classes = useStyles();
  return (
    <div className={classes.header}>
      <CloseSvg onClick={closeModal} />
      <h3>{title}</h3>
    </div>
  );
}
