import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import styles from "./NavigationBar.module.scss";
import { InfoModal } from "../Modals";
import { DropDown } from "../DropDown/DropDown";
import { ChartType } from "../../types";
import axios from "axios";

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
  
    const mixas = useCallback(()=>{
      fetch("https://ptvd-api.herokuapp.com/mds/countries",
      {headers:{"Access-Control-Allow-Origin":"*",'Content-Type':"application/json"}})
      .then((res)=>{console.log(res);
      }).then((res)=>{console.log(res);
      })
    },[])


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
        <div className="d-flex ms-auto">
          <DropDown
            title={chartFamily}
            items={["Time Line", "Tredy Boys"]}
            setSelectedValue={(name) => setChartFamily(name as ChartType)}
          />
          <DropDown
            title={chartType}
            items={
              chartFamily === "Time Line"
                ? [ChartType.Bar, ChartType.Line]
                : [ChartType.Bar, ChartType.Line, ChartType.Scatter]
            }
            setSelectedValue={(name) => setChartType(name as ChartType)}
          />
        </div>
        <div
          className={`${styles.aboutButton} ms-auto `}
          onClick={handleShow}
        >
          <FontAwesomeIcon className="p-3" icon={faInfo} role={"button"} />
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
  chartType: string;
  setChartType: (type:string) => void;
  chartFamily: string;
  setChartFamily: (type:string) => void;
}
