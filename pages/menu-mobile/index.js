import React from "react";
import { useState } from "react";
import SideBar from "Components/Layout/SideBar";
import { getMap, getMegaMenu } from "Services";
const MenuMobile = ({ routes, maps }) => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [status, setStatus] = useState("category");

  const handleDrawerToggle = () => {
    setToggleDrawer(!toggleDrawer);
  };

  return (
    <div >
      <SideBar
        routes={status == "technical-maps" ? maps : routes}
        mode="phone"
        handleDrawerToggle={handleDrawerToggle}
        open={toggleDrawer}
        status={status}
        setStatus={setStatus}
        loading={false}
      />
    </div>
  );
};

export default MenuMobile;

export async function getStaticProps(params) {
  const res = await getMegaMenu();
  const maps = await getMap();

  return {
    props: {
      routes: res,
      maps,
    },
    revalidate: 10, // In seconds
  };
}
