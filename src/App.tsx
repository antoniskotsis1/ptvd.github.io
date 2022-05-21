import React, { useEffect, useState } from "react";
import { MainContent, NavigationBar } from "./components";
import "./App.scss";
import {InstructionsModal} from "./components/Modals/InstructionsModal";
// import { SideBar } from "./components/SideBar/SideBar";

const App: React.FunctionComponent = () => {
  const [chartType, setChartType] = useState("Select Type");
  const [chartFamily, setChartFamily] = useState("Time/Trend Line");
  const [rangeOfYears, setRangeYears] = useState<number[]>([1960, 2010]);
  const [aggregateBy, setAggregateBy] = useState<number>(0);
  const [showInstructionsModal, setShowInstuctionsModal] = useState(false);

  useEffect(()=>{setShowInstuctionsModal(true)},[])
  console.log("showInstructionsModal",showInstructionsModal);

  return (
    <div className="d-flex flex-column overflow-hidden vh-100 App">
      <NavigationBar
        chartFamily={chartFamily}
        chartType={chartType}
        setChartFamily={(value) => setChartFamily(value)}
        setChartType={(value) => setChartType(value)}
        setRangeOfYears={(range: number[]) => setRangeYears(range)}
        setAggregateBy={(aggregateValue: number) =>
          setAggregateBy(aggregateValue)
        }
      />
      <div className="d-flex flex-row">
        <MainContent
          chartType={chartType}
          chartFamily={chartFamily}
          rangeOfYears={rangeOfYears}
          aggregateBy={aggregateBy}
        />
      </div>

      {<InstructionsModal showModal={showInstructionsModal} handleClose={() => setShowInstuctionsModal(false)}/>}
    </div>
  );
};

export default App;
