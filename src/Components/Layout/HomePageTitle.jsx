import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: 16,

    "& > strong": {
      fontSize: 28,
      fontWeight: 700,
      color: "#0A194B",
    },
    "& > span": {
      fontSize: 28,
      fontWeight: 300,
      paddingLeft: 8,
      color: "#0A194B",
    },
  },
}));

export default function HomePageTitle({ strongText, lightText }) {
  const classes = useStyles();
  return (
    <h2 className={classes.title}>
      <strong>{strongText}</strong>
      <span>{lightText}</span>
    </h2>
  );
}
