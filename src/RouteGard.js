import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { store } from "ReduxWrapper";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const { token } = useSelector(state => state.user);
  const [authorized, setAuthorized] = useState(false);
  const state = store.getState();
  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    // router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function authCheck(url) {
    if (token && url.includes("/auth")) {
      router.push("/");
    } else if (!token && url.includes("/dashboard")) {
      router.push("/auth/login");
    } else if (!token && url.includes("/cart")) {
      router.push("/auth/login");
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
