export const counterStyle = theme => ({
  root: {
    border: "1px solid #EBEBEB",
    padding: "6px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,

    "& > span": {
      fontSize: 13,
      fontWeight: 600,
    },
    "& > button": {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4px",
      backgroundColor:theme.color.boldOrange,
      border:"none",
      borderRadius:4,
      "& path":{
        fill:"#fff"
      },
      "& rect":{
        fill:"#fff"
      }
    },
  },
});
