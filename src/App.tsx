import React, { useState } from "react";
import { MainContent, NavigationBar } from "./components";
import "./App.scss";
import { SideBar } from "./components/SideBar/SideBar";

const App: React.FunctionComponent = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="d-flex flex-column overflow-hidden vh-100 App">
      <NavigationBar setSideVisible={() => setShow(!show)} />
      <div className="d-flex flex-row">
        <SideBar />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
