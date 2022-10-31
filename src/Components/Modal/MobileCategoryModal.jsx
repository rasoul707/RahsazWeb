import { useEffect, useState } from "react";
import ModalHeader from "./ModalHeader";
import ModalWrapperCustom from "./ModalWrapperCustom";
import { AccordionWithSub } from "Components/Accordion";

export default function MobileCategoryModal() {
  return (
    <ModalWrapperCustom>
      <ModalHeader title="دسته بندی‌ها" />
      <AccordionWithSub />
    </ModalWrapperCustom>
  );
}
