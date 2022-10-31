import { ModalContainer, Reoverlay } from "reoverlay";
import "reoverlay/lib/ModalWrapper.css";

// Modal Components
import MobileCategoryModal from "./MobileCategoryModal";
import MobileCartModal from "./MobileCartModal";
import InventoryNotificationModal from "./InventoryNotificationModal";
import ModalRules from "./ModalRules";
import BijakModal from "./BijakModal";

export default function ModalHolder(props) {
  // Here you pass your modals to Reoverlay
  Reoverlay.config([
    {
      name: "MobileCategory", // name for modal
      component: MobileCategoryModal, // modal component is hear
    },
    {
      name: "MobileCart",
      component: MobileCartModal,
    },
    {
      name: "InventoryNotification",
      component: InventoryNotificationModal,
    },
    {
      name: "ModalRules",
      component:ModalRules,
    },
    {
      name: "BijakModal",
      component:BijakModal,
    },
  ]);
  return <ModalContainer />;
}
