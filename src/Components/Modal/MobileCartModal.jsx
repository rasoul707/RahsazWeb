import { useEffect, useState } from "react";
import ModalHeader from "./ModalHeader";
import ModalWrapperCustom from "./ModalWrapperCustom";
import NavigationCartContent from "Components/Cart/SubComponents/NavigationCartContent";

export default function MobileCartModal() {
  return (
    <ModalWrapperCustom>
      <ModalHeader title="سبد خرید" />
      <NavigationCartContent />
    </ModalWrapperCustom>
  );
}
