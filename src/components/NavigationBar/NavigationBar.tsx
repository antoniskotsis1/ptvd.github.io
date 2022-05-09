import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import styles from "./NavigationBar.module.scss";
import { InfoModal } from "../Modals";

export const NavigationBar: React.FunctionComponent<NavigationBarProps> = (
  props
) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { setSideVisible } = props;

  const handleClose = useCallback(
    () => setShowInfoModal(false),
    [setShowInfoModal]
  );
  const handleShow = useCallback(
    () => setShowInfoModal(true),
    [setShowInfoModal]
  );

  return (
    <>

      <div className={`w-100 d-flex bg-dark align-items-center`}>
        <div
          className={`${styles.productName} fw-bold fs-3 ms-2 me-auto`}
          role="button"
          onClick={() => setSideVisible()}
        >
          MDS
        </div>
        <div className={`${styles.aboutButton} bg-dark ms-auto `} onClick={handleShow}>
          <FontAwesomeIcon className="p-3" icon={faInfo} role={"button"}/>
        </div>
        <InfoModal
          modalTitle="MDS Product info"
          modalBody="This abra katabra app was brought by MDS"
          showModal={showInfoModal}
          handleClose={handleClose}
        />
      </div>
    </>
  );
};

export default NavigationBar;

interface NavigationBarProps {
  setSideVisible: () => void;
}
