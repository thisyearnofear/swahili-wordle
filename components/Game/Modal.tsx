import { IconX } from "@tabler/icons";
import { useTranslation } from "hooks/use-translations";
import { useRef } from "react";

interface ModalProps {
  title: string;
  titleClass: string;
  className?: string;
  children: React.ReactNode;
  active: boolean;
  onClose?: () => void;
}

export function Modal({ active, className, children, title, titleClass, onClose }: ModalProps) {
  const translation = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={modalRef} className={`modal_finish${active ? " active" : ""} ${className ?? ""}`}>
      <div className={`top ${titleClass}`}>{title}</div>
      <div className="data">{children}</div>
      <button
        type="button"
        className="close"
        aria-label={translation.close}
        onClick={() => {
          if (!modalRef.current) return;
          modalRef.current.classList.remove("active");
          onClose?.();
        }}
      >
        <IconX />
      </button>
    </div>
  );
}
