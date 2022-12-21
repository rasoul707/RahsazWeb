import { useState } from "react";

import { activeRoute } from "Utils/helperFunction";

import {
  ListItem,
  List,
  ListItemText,
  makeStyles,
  useMediaQuery,
  useTheme,
  Collapse,
  Divider,
} from "@material-ui/core";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import ArrowSvg from "Assets/img/icons/sidebar-arrow.svg";

import AppMenuItemComponent from "./AppMenuItemComponent";
import { useRouter } from "next/router";
const useStyles = makeStyles(theme => ({
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset",
  },
  itemLink: {
    display: "flex",
    alignItems: "center",
    width: "auto",
    position: "relative",
    margin: "0 !important",
    padding: "8px 15px",
    backgroundColor: "transparent",
    // borderLeft: `4px solid transparent`,
    ...theme.transitionLinkActive,
    "& a": {
      padding: "10px 15px",
    },
    "& svg": {
      width: 24,
      height: 24,
      lineHeight: "30px",
      // marginRight: "15px",
      verticalAlign: "middle",
      "& path": {
        ...theme.transitionLinkActive,
        fill: theme.color.darkGrayishBlue,
      },
    },
  },
  itemLinkNoIcon: {
    paddingLeft: "45px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  itemText: {
    ...theme.font.s14w400,
    margin: 0,
    // lineHeight: "31px",
    color: "#333333",
    ...theme.transitionLinkActive,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",

  },
  haveChild: {
    fontWeight: "bold",
  },
  itemLinkActive: {

    // borderLeft: `4px solid ${theme.palette.primary.main}`,
    // "& svg": {
    //   "& path": {
    //     fill: theme.palette.primary.main,
    //   },
    // },
    // "& $itemText": {
    //   color: theme.palette.primary.main,
    // },
  },

  listOpen: {
    background: "rgb(233 232 232)",
    boxShadow: "inset 0em 0em 20px 0px #cfcfcf;"
  },
  itemOpen: {
    background: "#fff",
    boxShadow: "inset 0em 0em 20px 0px #edecec"
  },
  itemTextHaveSub: {
    // marginLeft: "20px",
  }
}));

export default function MenuItem({
  handleDrawerToggle,
  onClick,
  status,
  ...item
}) {
  const classes = useStyles();
  const isExpandable = item.children?.length > 0;
  const isActive = activeRoute(status == "technical-maps" ? `/maps/${item.id}` : `/products?mega_menu_id=${item.id}`);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const MenuItemExpandable = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding className={open ? classes.listOpen : ""} >

        {item?.children?.map((item, index) => (
          <MenuItem
            {...item}
            key={item.id}
            handleDrawerToggle={handleDrawerToggle}
            status={status}
          />
        ))}
      </List>
    </Collapse>
  ) : null;

  const MenuItemRoot = (
    <AppMenuItemComponent
      className={`${classes.itemLink} ${isActive ? classes.itemLinkActive : ""} ${open ? classes.itemOpen : ""} ${!item.icon ? classes.itemLinkNoIcon : ""}`}
      // onClick={handleClick}
      onClick={() => {
        if (!item.children?.length) {
          if (status == "technical-maps") {
            return router.push(`/maps/${item.id}`);
          } else {
            return router.push(`/products?mega_menu_id=${item.id}`);
          }
        } else {
          handleClick()
        }
      }}
      withSubRoute={item.children?.length > 0}
    >
      {/* {!isExpandable && "●"} */}
      <ListItemText
        primary={<>
          {item.icon && <span dangerouslySetInnerHTML={{ __html: item.icon }} style={{ paddingLeft: "5px" }} />}
          {/* {!item.icon && isExpandable && <ArrowSvg />} */}
          {item.name}
        </>}
        className={`${classes.itemText} ${isActive ? classes.itemTextActive : ""}`}
        title={item.name}
        disableTypography={true}

      />
      {/* Display the expand menu if the item has children */}

      {isExpandable && !open && <IconExpandMore />}
      {isExpandable && open && <IconExpandLess />}
    </AppMenuItemComponent>
  );

  return (
    <>
      {MenuItemRoot}
      {MenuItemExpandable}
    </>
  );
}
