import LayoutAuth from "Components/Auth/LayoutAuth";
import Register from "Components/Auth/Register";
import React from "react";
import { getRegister } from "Services";

const register = ({ data }) => {
  return (
    <LayoutAuth>
      <Register data={data} />
    </LayoutAuth>
  );
};

export default register;

export async function getServerSideProps() {
  const data = await getRegister();

  return {
    props: {
      data,
    },
  };
}
