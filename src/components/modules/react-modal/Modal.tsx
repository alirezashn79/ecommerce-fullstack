import React from "react";
import { BiCloset } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 999,
  },
};

interface IModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readonly children: React.ReactNode;
}

export default function ModalComponent({
  isOpen,
  setIsOpen,
  children,
}: IModalProps) {
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div>
        <button
          onClick={closeModal}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <IoClose style={{ color: "red", height: "24px", width: "24px" }} />
        </button>
      </div>
      <div style={{ color: "black" }}>{children}</div>
    </Modal>
  );
}
