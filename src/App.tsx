import React, { useState } from "react";
import { MainContent, NavigationBar } from "./components";
import "./App.scss";
// import { SideBar } from "./components/SideBar/SideBar";

const App: React.FunctionComponent = () => {
  const [chartType, setChartType] = useState("Select Type");
  const [chartFamily, setChartFamily] = useState("Time/Trend Line");
  return (
    <div className="d-flex flex-column overflow-hidden vh-100 App">
      <NavigationBar
        chartFamily={chartFamily}
        chartType={chartType}
        setChartFamily={(value) => setChartFamily(value)}
        setChartType={(value) => setChartType(value)}
      />
      <div className="d-flex flex-row">
        {/* <SideBar /> */}
        <MainContent chartType={chartType} chartFamily={chartFamily}/>
      </div>
    </div>
  );
};

export default App;
