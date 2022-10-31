import MyDivider from "Components/ui/MyDivider";
import React from "react";
import { useSelector } from "react-redux";
import BankForm from "./BankForm";
import ChangePass from "./ChangePass";
import InfoForm from "./InfoForm";
import PersonInfo from "./PersonInfo";

const Myacc = ({ date, setDate }) => {
  const userRole = useSelector(state => state.user?.user?.role);
  console.log("userRole", userRole);
  return (
    <div>
      {(userRole == "همکار" || userRole == "مشتری") && (
        <>
          <InfoForm setDate={setDate} date={date} />

          <MyDivider />
        </>
      )}
      {userRole == "شرکت" && (
        <>
          <PersonInfo />
          <MyDivider />
        </>
      )}

      <BankForm />
      <MyDivider />

      <ChangePass />
    </div>
  );
};

export default Myacc;
