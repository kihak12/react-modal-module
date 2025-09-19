import styles from "./ModalComponent.module.css";

export const ModalComponent = (props: ModalProps) => {
  const modalData = { ...defaultProps, ...props };

  const titleElement = () => {
    const title = modalData.title;

    if (title)
      return (
        <>
          <h1>{title}</h1>
        </>
      );
  };

  const contentElement = () => {
    const text = modalData.textContent;

    if (text)
      return (
        <>
          <span>{text}</span>
        </>
      );
  };

  const confirmButtonElement = () => {
    return (
      <>
        <button
          className={[styles.modalActionButton, styles.btnSuccess].join(" ")}
          onClick={modalData.onConfirm}
        >
          {modalData.confirmButtonText}
        </button>
      </>
    );
  };

  const cancelButtonElement = () => {
    return (
      <>
        *
        <button
          className={[styles.modalActionButton, styles.btnDanger].join(" ")}
          onClick={modalData.onCancel}
        >
          {modalData.cancelButtonText}
        </button>
      </>
    );
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={modalData.onClose}>
            <img src="/assets/close-x.svg" alt="Close Modal" />
          </button>
          <div
            className={[styles.modalContent, modalData.textContent ?? styles.vertical].join(" ")}
          >
            {titleElement()}
            {contentElement()}
          </div>
          <div className={styles.modalActionContainer}>
            {modalData.showConfirmButton && confirmButtonElement()}
            {modalData.showCancelButton && cancelButtonElement()}
          </div>
        </div>
      </div>
    </>
  );
};

interface ModalProps {
  title?: string;
  textContent?: string;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const defaultProps: ModalProps = {
  showConfirmButton: true,
  confirmButtonText: "Confirm",
  showCancelButton: false,
  cancelButtonText: "Cancel",
};
