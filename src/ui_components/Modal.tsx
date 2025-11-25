import Modal from "react-modal";
import styled from "styled-components";
import { type ReactNode } from "react";

Modal.setAppElement("#root");

type ModalWindowProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
};

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const StyledContent = styled.div`
  position: relative;
  background: #ffffff;
  min-width: 360px;
  max-width: 520px;
  width: 90%;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: #777;

  &:hover {
    color: #333;
  }
`;

const ModalWindow = ({
  isOpen,
  onRequestClose,
  children,
}: ModalWindowProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      style={{ overlay: {}, content: {} }} // prevent react-modal inline styles
    >
      <StyledOverlay className="modal-overlay">
        <StyledContent className="modal-content">
          <CloseButton onClick={onRequestClose}>✕</CloseButton>
          {children}
        </StyledContent>
      </StyledOverlay>
    </Modal>
  );
};

export default ModalWindow;
