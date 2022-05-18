import { faCog, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import styles from "./NavigationBar.module.scss";
import { InfoModal } from "../Modals";
import { DropDown } from "../DropDown/DropDown";
import { ChartType } from "../../types";
import { Button } from "react-bootstrap";
import { OptionsModal } from "../Modals/OptionsModal";

export const NavigationBar: React.FunctionComponent<NavigationBarProps> = (
  props
) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { chartFamily, chartType, setChartFamily, setChartType } = props;

  const handleClose = useCallback(
    () => setShowInfoModal(false),
    [setShowInfoModal]
  );
  const handleShow = useCallback(
    () => setShowInfoModal(true),
    [setShowInfoModal]
  );

  const mixas = useCallback(() => {
    fetch("https://ptvd-api.herokuapp.com/mds/countries", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <>
      <div className={`w-100 d-flex align-items-center ${styles.navBar}`}>
        <div
          className={`${styles.productName} fw-bold fs-3 ms-2 me-auto`}
          role="button"
          onClick={mixas}
        >
          MDS
        </div>
        <div className={`d-flex ms-auto ${styles.chartSettings}`}>
          <DropDown
            title={chartFamily}
            items={["Time/Trend Line", "Correlation Plot"]}
            setSelectedValue={(name) => {
              if (name !== "Time/Trend Line") {
                setChartType(ChartType.Scatter);
              } else {
                setChartType("Select Type");
              }
              setChartFamily(name as ChartType);
            }}
            isNavBar
          />
          <DropDown
            title={chartType}
            items={
              chartFamily === "Time/Trend Line"
                ? [ChartType.Bar, ChartType.Line]
                : [ChartType.Scatter]
            }
            setSelectedValue={(name) => {
              setChartType(name as ChartType);
            }}
            isNavBar
          />
          <div className={styles.moreOptions}>
            <FontAwesomeIcon icon={faCog} />
          </div>
        </div>
        <div className={`${styles.aboutButton} ms-auto `} onClick={handleShow}>
          <FontAwesomeIcon className="p-3" icon={faInfo} role={"button"} />
        </div>
        <OptionsModal
          modalTitle="MDS Choose additional settings"
          modalBody="This abra katabra app was brought by MDS"
          showModal={showInfoModal}
          handleClose={handleClose}
        />
        {/* <InfoModal
          modalTitle="MDS Product info"
          modalBody="This abra katabra app was brought by MDS"
          showModal={showInfoModal}
          handleClose={handleClose}
        /> */}
      </div>
    </>
  );
};

export default NavigationBar;

interface NavigationBarProps {
  chartType: string;
  setChartType: (type: string) => void;
  chartFamily: string;
  setChartFamily: (type: string) => void;
}
