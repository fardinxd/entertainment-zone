import React, { Fragment, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

// Style & Icon \\
import styles from "./ContentDetailsModal.module.scss";
import { RiCloseCircleLine } from "react-icons/ri";

// Contexts \\
import { ContentDetailsContext } from "../../context/ContentDetailsProvider";

const ContentModal = ({ children }) => {
  // Contexts \\
  const { setShowContentModal } = useContext(ContentDetailsContext);

  // Close Modal On Escape Keypress \\
  useEffect(() => {
    const closeModal = (event) => {
      if (event.key === "Escape") setShowContentModal(false);
    };
    window.addEventListener("keydown", closeModal);
    return () => window.removeEventListener("keydown", closeModal);
  }, [setShowContentModal]);

  // JSX \\
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Fragment>
          <div
            className={styles.backdrop}
            onClick={() => setShowContentModal(false)}
          />

          <div className={styles.container}>
            <RiCloseCircleLine onClick={() => setShowContentModal(false)} />

            {children}
          </div>
        </Fragment>,
        document.getElementById("content")
      )}
    </Fragment>
  );
};

export default ContentModal;
