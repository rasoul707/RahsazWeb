import { makeStyles } from "@material-ui/core";
import React from "react";
import EditIcon from "Assets/img/icons/edit.svg";
import { counterLetter } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid #EBEBEB",
    boxSizing: " border-box",
    borderRadius: 8,
    padding: 20,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
    background: ({ active }) => (active ? theme.color.boldOrange : "#fff"),
    cursor: ({ cart }) => (cart ? "pointer" : "auto"),
  },
  headers: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    "& h5": {
      ...theme.font.s18w700,
      color: ({ active }) => (active ? "#fff" : "black"),
      "@media(max-width: 960px)": {
        ...theme.font.s14w700,
      },
    },
    "& span": {
      ...theme.font.s14w500,
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 6,
      color: theme.color.boldOrange,
      "& path": {
        fill: theme.color.boldOrange,
      },
    },
  },
  text: {
    ...theme.font.s14w400,
    color: ({ active }) => (active ? "#fff" : "black"),
    width: "100%",
  },
}));

const AddressInfo = ({
  edit = true,
  cart,
  active,
  item,
  index,
  setEditMode,
  onClick = () => null,
}) => {
  const classes = useStyles({ active, cart });
  return (
    <div className={classes.root} onClick={onClick}>
      <div className={classes.headers}>
        <h5>آدرس {counterLetter(index)}</h5>
        {edit && (
          <span
            onClick={() => {
              setEditMode({
                show: true,
                id: item?.id,
                item,
              })
            }}
          >
            {" "}
            <EditIcon />
            ویرایش{" "}
          </span>
        )}
      </div>
      <p className={classes.text}>{item?.location}</p>
    </div>
  );
};

export default AddressInfo;
