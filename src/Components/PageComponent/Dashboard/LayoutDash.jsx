import { makeStyles } from "@material-ui/styles";
import InnerContainer from "Components/Layout/InnerContainer";
import React from "react";
import NavLink from "Components/NavLink";
import CategoryFilter from "Components/Layout/CategoryFilter";
import useWindowDimensions from "hooks/useWindowDimensions";
import LogoutIcon from "Assets/img/icons/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutReq } from "Services/auth.api";
import { logoutAction } from "ReduxWrapper/actions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "20px 0",
  },
  header: {
    fontFamily: "Iran Yekan",
    ...theme.font.s16w700,
  },
  content: {
    background: "#fff",
    borderRadius: "8px",
  },
  nav: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 35,
    borderBottom: "1px solid #EBEBEB",
    "@media(max-width: 960px)": {
      flexWrap: "nowrap",
      whiteSpace: "nowrap",
      overflowX: "auto",
      padding: "30px 10px 0",
      justifyContent: "flex-start",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  inner: {
    padding: "40px 32px",
    "@media(max-width: 960px)": {
      padding: "40px 10px",
    },
  },
  logout: {
    display: "flex",
    alignItems: "center",
    ...theme.font.s14w700,
    gap: 8,
    "& path": {
      fill: theme.color.boldOrange,
    },
  },
  headers: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
}));

const LayoutDash = ({ noNav = false, children }) => {
  const classes = useStyles();
  const user = useSelector(state => state.user);


  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const routes = [
    {
      name: "حساب کاربری",
      path: "/dashboard",
      id: "1",
    },
    {
      name: "آدرس های من",
      path: "/dashboard/my-address",
      id: "2",
    },
    {
      name: "تخفیف ها",
      path: "/dashboard/coupons",
      id: "3",
    },
    {
      name: "پیغام ها",
      path: "/dashboard/messages",
      id: "4",
    },
    {
      name: "نظرات من",
      path: "/dashboard/my-comments",
      id: "5",
    },
    {
      name: "محصولات بازدید شده",
      path: "/dashboard/views",
      id: "6",
    },
    {
      name: "سفارشات من",
      path: "/dashboard/my-order",
      id: "7",
    },
  ];
  const logoutHand = async () => {
    try {
      await logoutReq().then(res => {
        dispatch(logoutAction());
        router.push("/auth/login");
      });
    } catch (error) {}
  };
  return (
    <>
      {width > 960 && <CategoryFilter />}
      <main>
        <InnerContainer>
          <div className={classes.root}>
            {width > 960 && (
              <div className={classes.headers}>
                <h1 className={classes.header}>داشبورد من
                <span><hr></hr> نقش : {user?.user?.role}</span>
                </h1>
                
              </div>
            )}

            <div className={classes.content}>
              {width > 960 && !noNav && (
                <div className={classes.nav}>
                  {routes.reverse().map(route => (
                    <NavLink
                      name={route?.name}
                      link={route?.path}
                      key={route?.id}
                    />
                  ))}
                </div>
              )}
              <div className={classes.inner}>{children}</div>
            </div>
          </div>
        </InnerContainer>
      </main>
    </>
  );
};

export default LayoutDash;
