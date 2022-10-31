import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { Badge } from "@material-ui/core";
// Icons
import ProfileSvg from "Assets/img/icons/profile.svg";
import Arrow from "Assets/img/icons/arrow-down.svg";
import LogoutIcon from "Assets/img/icons/logout.svg";

import BellSvg from "Assets/img/icons/bell.svg";
import { Menu, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { getMessages } from "Services/dashboard.api";
import { useState } from "react";
import { useEffect } from "react";
import { toFarsiNumber } from "Utils/helperFunction";
import { logoutReq } from "Services/auth.api";
import { useDispatch } from "react-redux";
import { logoutAction } from "ReduxWrapper/actions";
import { useRouter } from "next/router";
import { emptyBasket } from "ReduxWrapper/actions/order.action";

const useStyles = makeStyles(theme => ({
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "11px 16px",
    cursor: "pointer",
    ...theme.font.s14w500,
    "& > svg": {
      marginRight: 8,
    },
    gap: "20px",
  },
  bell: {
    backgroundColor: theme.color.boldOrange,
    color: "#fff",
    height: "17px",
    width: "16px",
  },
  drop: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  logout: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    "& path": {
      fill: theme.color.boldOrange,
    },
  },
}));

const NavCategory = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  // const [msg, setMsg] = useState([]);
  // console.log('msg',msg);
  // console.log(user);
  // useEffect(() => {
  //   getMessages()
  //     .then(res => {
  //       setMsg(res);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  const logoutHand = async () => {
    try {
      await logoutReq().then(res => {
        dispatch(logoutAction());
        dispatch(emptyBasket())
        router.push("/auth/login");
      });
    } catch (error) { }
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        {user?.user?.first_name} عزیز
      </Menu.Item>
      <hr></hr>
      <Menu.Item key="1">
        <Link href="/dashboard">داشبورد</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <div className={classes.logout} onClick={logoutHand}>
          خروج از حساب <LogoutIcon />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={classes.profileWrapper}>
      {!user?.token ? (
        <Link href="/auth/login" legacyBehavior>
          <span
            style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
          >
            <ProfileSvg />
            <span>ورود | ثبت نام</span>
          </span>
        </Link>
      ) : (
        <>
          <Link href={"/dashboard/messages"}>
            <Badge
              badgeContent={toFarsiNumber(user?.unread_message_count)}
              classes={{ badge: classes.bell }}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <BellSvg />
            </Badge>
          </Link>
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className={classes.drop}>
              <ProfileSvg /> <Arrow />
            </div>
          </Dropdown>
          {/* <Link href={"/dashboard"}>
            <span>
              
            </span>
          </Link> */}
        </>
      )}
    </div>
  );
};

export default React.memo(NavCategory);
