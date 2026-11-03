"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./CertificateModal.module.css";
interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  altText?: string;
}
export function CertificateModal({
  isOpen,
  onClose,
  imageUrl,
  altText = "Certificate",
}: CertificateModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label={altText}
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.content}>
        <div className={styles.heading}>
          <span>{altText}</span>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close certificate"
          >
            <X size={22} />
          </button>
        </div>
        <div className={styles.image}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={altText}
              fill
              priority
              sizes="(max-width: 760px) 90vw, 1000px"
              className="object-contain"
            />
          )}
        </div>
      </div>
    </dialog>
  );
}
