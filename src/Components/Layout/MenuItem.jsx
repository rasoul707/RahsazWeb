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
    margin: "5px 0",
    padding: "8px 15px",
    backgroundColor: "transparent",
    borderLeft: `4px solid transparent`,
    ...theme.transitionLinkActive,
    "& a": {
      padding: "10px 15px",
    },
    "& svg": {
      width: 24,
      height: 24,
      lineHeight: "30px",
      marginRight: "15px",
      verticalAlign: "middle",
      "& path": {
        ...theme.transitionLinkActive,
        fill: theme.color.darkGrayishBlue,
      },
    },
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
}));

export default function MenuItem({
  handleDrawerToggle,
  onClick,
  status,
  ...item
}) {
  const classes = useStyles();
  console.log(JSON.stringify(item.icon));
  const isExpandable = item.children?.length > 0;
  const isActive = activeRoute("/dashboard");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const MenuItemExpandable = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding onClick={handleClick}>
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
      className={`${classes.itemLink} ${
        isActive ? classes.itemLinkActive : ""
      }`}
      NavLinkClass={`${classes.itemLink} ${
        isActive ? classes.itemLinkActive : ""
      }`}
      path={`/products/${item?.id}`}
      onClick={handleClick}
      withSubRoute={item.children?.length > 0}
    >
      <ListItemText
      
        primary={<> <span dangerouslySetInnerHTML={{ __html: item.icon }}/>{item.name}</>}
        className={`${classes.itemText} ${
          isActive ? classes.itemTextActive : ""
        }`}
        disableTypography={true}
        onClick={() => {
          if (item?.children?.length <= 0 || !("children" in item)) {
            if (status == "technical-maps") {
              return router.push(`/maps/${item.id}`);
            } else {
              return router.push(`/products?mega_menu_id=${item.id}`);
            }
          }
        }}
      />
      {/* Display the expand menu if the item has children */}
      {!isExpandable && <ArrowSvg />}
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
