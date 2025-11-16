import { useTranslation } from "react-i18next";
import { ButtonCommon, StatusModal, ConfirmLogout, ConfirmResetSettings, ConfirmDelete, CommonModal, UI_KEYS } from "@tnbt/react-favorit-style";

import React, { useState } from "react";

export default function ModalExample() {
  const { t } = useTranslation();
  const [successOpen, setSuccessOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const handleDelete = () => {
    console.log("Item deleted successfully!");
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
  };

  const handleReset = () => {
    console.log("Settings reset to default!");
  };
  return (
    <div>
      <div className="my-2.5 font-[500] text-[18px] text-left">Modal box display data as info/status</div>
      <div className="flex gap-3 my-2.5">
        <ButtonCommon variant="continue" onClick={() => setSuccessOpen(true)}>
          {t(UI_KEYS.button.save, "Save")}
        </ButtonCommon>
        <StatusModal modalType="success" contentKey="content.successCommon" isOpen={successOpen} setIsOpen={setSuccessOpen} content="Done! The task is completed." />

        <ButtonCommon variant="warning" onClick={() => setWarningOpen(true)}>
          {t(UI_KEYS.button.submit, "Submit")}
        </ButtonCommon>
        <StatusModal modalType="warning" isOpen={warningOpen} setIsOpen={setWarningOpen} contentKey="content.warningCommon" />

        <ButtonCommon variant="info" onClick={() => setInfoOpen(true)}>
          {t(UI_KEYS.button.info, "Info")}
        </ButtonCommon>
        <StatusModal modalType="info" isOpen={infoOpen} setIsOpen={setInfoOpen} content="Done! The task is completed." />
      </div>
      <div className="my-2.5 font-[500] text-[18px] text-left">Modal box for comfirm and continue action</div>
      <div className="flex gap-3 my-2.5">
        <ButtonCommon onClick={() => setIsDeleteOpen(true)} variant="delete">
          {t(UI_KEYS.button.delete, "Delete")}
        </ButtonCommon>
        {/* Example 1: Using contentKey with params for dynamic translation */}
        <ConfirmDelete
          onExcute={handleDelete}
          setIsModalOpen={setIsDeleteOpen}
          isModalOpen={isDeleteOpen}
          contentKey="content.deleteOrders"
          contentParams={{ count: 5 }}
        />
        <ButtonCommon onClick={() => setIsLogoutOpen(true)}>{t(UI_KEYS.confirmLogout.action.logout, "Logout")}</ButtonCommon>
        <ConfirmLogout
          isModalOpen={isLogoutOpen}
          setIsModalOpen={setIsLogoutOpen}
          onConfirm={handleLogout}
          descriptionKey={UI_KEYS.confirmLogout.description}
          remindContentKey={UI_KEYS.confirmLogout.remindContent}
        />
        <ConfirmResetSettings isModalOpen={isResetOpen} setIsModalOpen={setIsResetOpen} onConfirm={handleReset} />
      </div>
    </div>
  );
}
