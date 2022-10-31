import { makeStyles } from "@material-ui/core";
import React from "react";

import ProfileSvg from "Assets/img/icons/profile.svg";
import PakageSvg from "Assets/img/icons/tile.svg";
import CartSvg from "Assets/img/icons/cart.svg";
import HomeSvg from "Assets/img/icons/home.svg";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Col, Row } from "antd";
import Link from "next/link";
import { logoutReq } from "Services/auth.api";
import { useDispatch } from "react-redux";
import LogoutIcon from "Assets/img/icons/logout.svg";
import ThreeIcon from "Assets/img/icons/threeDots.svg";
import { logoutAction } from "ReduxWrapper/actions";
import { emptyBasket } from "ReduxWrapper/actions/order.action";
import useWindowDimensions from "hooks/useWindowDimensions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    background: "#fff",
    position: "fixed",
    bottom: 0,
    borderTop: "2px solid #EBEBEB",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    // gap: "25px",
    padding: "0 5px",
    height: 80,
    zIndex: 10000,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    // minWidth: "30px",
    width: "100%",
    "& p": {
      ...theme.font.s12w700,
      margin: 0,
    },
    "& span": {
      display: "flex",
    },
  },
  active: {
    "& p": {
      color: theme.color.boldOrange,
    },
    "& path": {
      stroke: theme.color.boldOrange,
      fill: theme.color.boldOrange,
    },
  },
  home: {
    "& p": {
      color: theme.color.boldOrange,
    },
    "& path": {
      stroke: theme.color.boldOrange,
    },
  },
  sub_root: {
    backgroundColor: "#fff",
    position: "fixed",
    zIndex: 110,
    bottom: 0,
    top: ({ isShow, lowHeight }) =>
      isShow ? `${lowHeight ? "55%" : "65%"}` : "100%",
    height: "100%",
    borderRadius: "25px 25px 0 0",
    border: "2px solid #EFEFEF",
    padding: "20px 30px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.5s ease",
    "& a": {
      textDecoration: "none !important",
    },
  },
  sub_item: {
    ...theme.font.s12w700,
    "&>div": {
      whiteSpace: "nowrap",
    },
  },
  sub_active: {
    color: theme.color.boldOrange,
  },
  logout: {
    display: "flex",
    alignItems: "center",
    ...theme.font.s12w700,
    gap: 8,
  },
}));

const SubRoutes = ({ isShow, setIsShow }) => {
  const { width, height } = useWindowDimensions();
  const classes = useStyles({ isShow, lowHeight: height < 700 });
  const router = useRouter();
  const dispatch = useDispatch();
  let subRoutes = [
    {
      name: "سفارشات من ",
      id: 1,
      path: "/dashboard/my-order",
    },

    {
      name: "نظرات من",
      id: 3,
      path: "/dashboard/my-comments",
    },
    {
      name: "پیغام ها",
      id: 4,
      path: "/dashboard/messages",
    },
    {
      name: "تخفیف ها",
      id: 5,
      path: "/dashboard/coupons",
    },
    {
      name: "آدرس های من",
      id: 6,
      path: "/dashboard/my-address",
    },
    {
      name: "محصولات بازدید شده",
      id: 2,
      path: "/dashboard/views",
    },
    {
      name: "حساب کاربری",
      id: 8,
      path: "/dashboard",
    },
  ];
  const logoutHand = async () => {
    try {
      await logoutReq().then(res => {
        dispatch(logoutAction());
        dispatch(emptyBasket());
        setIsShow(false);
        router.push("/auth/login");
      });
    } catch (error) {}
  };
  return (
    <div className={classes.sub_root}>
      <Row style={{ marginTop: 20 }} gutter={[20, 25]}>
        {subRoutes.map(route => (
          <Col key={route.name} span={8}>
            <Link href={route.path}>
              <div className={classes.sub_item}>
                <div
                  className={
                    router.pathname == route.path ? classes.sub_active : ""
                  }
                >
                  {route.name}
                </div>
              </div>
            </Link>
          </Col>
        ))}
        <Col span={16}>
          <div className={classes.logout} onClick={logoutHand}>
            خروج از حساب <LogoutIcon />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const BottomNav = () => {
  const classes = useStyles();
  const router = useRouter();
  const user = useSelector(state => state.user);
  const [isShow, setIsShow] = useState(false);

  let routes = [
    {
      name: user?.token ? user?.user?.first_name : "ورود",
      id: "1",
      path: user?.token ? "/dashboard" : "/auth/login",
      icon: <ProfileSvg />,
    },
    {
      name: "سبد خرید",
      id: "2",
      path: "/cart",
      icon: <CartSvg />,
    },
    {
      name: "خانه",
      id: "3",
      path: "/",
      icon: <HomeSvg />,
    },
    {
      name: "دسته بندی ",
      id: "4",
      path: "/menu-mobile",
      icon: <PakageSvg />,
    },
    // {
    //   name: " ",
    //   id: "5",
    //   path: null,
    //   icon: <ThreeIcon />,
    //   isLogin: !!user?.token,
    // },
  ];

  return (
    <>
      <div className={classes.root}>
        {routes.reverse().map(route => {
          if (route.id == 5 && !route.isLogin) {
            return;
          } else {
            return (
              <div
                key={route.id}
                className={`${classes.item} ${
                  route.path === router.pathname && route.id != 3
                    ? classes.active
                    : ""
                }
          ${route.path === router.pathname && route.id == 3 ? classes.home : ""}
          `}
                onClick={() => {
                  if (route.id != 1) {
                    router.push(route.path);
                  } else if (route.id == 1 && !user?.token) {
                    router.push(route.path);
                  } else {
                    setIsShow(pre => !pre);
                  }
                }}
              >
                <span>{route.icon}</span>
                <p>{route.name}</p>
              </div>
            );
          }
        })}
      </div>
      <SubRoutes isShow={isShow} setIsShow={setIsShow} />
    </>
  );
};

export default BottomNav;
