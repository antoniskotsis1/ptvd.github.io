import { faCog, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import styles from "./NavigationBar.module.scss";
import { InfoModal } from "../Modals";
import { DropDown } from "../DropDown/DropDown";
import { ChartType } from "../../types";
import { OptionsModal } from "../Modals/OptionsModal";

export const NavigationBar: React.FunctionComponent<NavigationBarProps> = (
  props
) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [dropDownItems, setDropdownItems] = useState<ChartType[]>([
    ChartType.Line,
    ChartType.Bar,
  ]);
  const {
    chartFamily,
    chartType,
    setChartFamily,
    setChartType,
    setRangeOfYears,
    setAggregateBy,
  } = props;

  const handleClose = useCallback(() => {
    setShowInfoModal(false);
    setShowOptionsModal(false);
  }, [setShowInfoModal]);
  const handleShow = useCallback(
    () => setShowInfoModal(true),
    [setShowInfoModal]
  );

  return (
    <>
      <div className={`w-100 d-flex align-items-center ${styles.navBar}`}>
        <div
          className={`${styles.productName} fw-bold fs-3 ms-2 me-auto`}
          role="button"
        >
          MDS
        </div>
        <div className={`d-flex ms-auto ${styles.chartSettings}`}>
          <DropDown
            title={chartFamily}
            items={["Time/Trend Line", "Correlation Plot"]}
            setSelectedValue={(name) => {
              if (name !== "Time/Trend Line") {
                setDropdownItems([ChartType.Scatter]);
                setChartType(ChartType.Scatter);
              } else {
                setDropdownItems([ChartType.Line, ChartType.Bar]);
                setChartType("Select Type");
              }
              setChartFamily(name as ChartType);
            }}
            isNavBar
          />
          <DropDown
            title={chartType}
            items={dropDownItems}
            setSelectedValue={(name) => {
              setChartType(name as ChartType);
            }}
            isNavBar
          />
          <div
            className={styles.moreOptions}
            role="button"
            onClick={() => setShowOptionsModal(true)}
          >
            <FontAwesomeIcon icon={faCog} />
          </div>
        </div>
        <div className={`${styles.aboutButton} ms-auto `} onClick={handleShow}>
          <FontAwesomeIcon className="p-3" icon={faInfo} role={"button"} />
        </div>

        <OptionsModal
          setRange={setRangeOfYears}
          setAggregate={setAggregateBy}
          showModal={showOptionsModal}
          handleClose={handleClose}
        />
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
  chartType: string;
  setChartType: (type: string) => void;
  chartFamily: string;
  setChartFamily: (type: string) => void;
  setRangeOfYears: (range: number[]) => void;
  setAggregateBy: (aggregateValue: number) => void;
}
