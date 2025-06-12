import { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modalRoot");
    if (elRef.current) {
      modalRoot?.appendChild(elRef.current);
    }
    return () => {
      if (elRef.current) {
        modalRoot?.removeChild(elRef.current);
      }
    };
  }, []);
  return createPortal(
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>,
    elRef.current
  );
};

export default Modal;
