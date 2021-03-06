import React, { useEffect, useState } from "react";
import { ChartDataInterval, ChartType } from "../../types";
import { BarChart } from "../Charts/BarChart";
import styles from "./MainContent.module.scss";
import { Toast } from "react-bootstrap";
import GOby from "../../assets/GOby.gif";
import { PlotDataSelectionList } from "./PlotDataSelectionList/PlotDataSelectionList";
import { ColorUtils } from "../../utils";
import { Drawer } from "@mui/material";

export const MainContent: React.FunctionComponent<MainContentProps> = (
  props
) => {
  const { chartType, chartFamily } = props;
  const yAxisLabels = [
    "1960",
    "1961",
    "1962",
    "1963",
    "1964",
    "1965",
    "1966",
    "1967",
    "1968",
    "1969",
    "1970",
    "1971",
    "1972",
    "1973",
    "1974",
    "1975",
    "1976",
    "1977",
    "1978",
    "1979",
    "1980",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
  ];
  const [selectedData, setData] = useState<ChartDataInterval[]>([]);
  const godPlotData = {
    labels: yAxisLabels,
    datasets: selectedData,
  };

  const [show, setShow] = useState({ show: false, message: "" });
  const renderToast = () => (
    <Toast
      className="position-absolute top-0 start-50 bg-warning"
      onClose={() => setShow({ show: false, message: "" })}
      show={show.show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Warning!</strong>
      </Toast.Header>
      <Toast.Body>{show.message}</Toast.Body>
    </Toast>
  );

  const [selectedDataX, setDataX] = useState<ChartDataInterval[]>([]);
  const [selectedDataY, setDataY] = useState<ChartDataInterval[]>([]);

  const renderScatterDataListItems = () => (
    <>
      <span className="fw-bold me-auto ms-2">Y-Axis: </span>
      <PlotDataSelectionList
        selectedData={selectedDataY}
        setData={(newData) => setDataY(newData)}
        triggerPopUp={(message) => setShow(message)}
        isCorrelationPlot={false}
      />
      <span className="fw-bold me-auto ms-2">X-Axis: </span>
      <PlotDataSelectionList
        selectedData={selectedDataX}
        setData={(newData) => setDataX(newData)}
        triggerPopUp={(message) => setShow(message)}
        isCorrelationPlot={false}
      />
    </>
  );

  useEffect(() => {
    setData([]);
    setDataX([]);
  }, [chartFamily]);

  const formatData = () => {
    const fdata = { data: [{}] };
    if (selectedDataX[0]?.data && selectedDataY[0]?.data) {
      for (let index = 0; index < selectedDataX[0].data.length; index++) {
        const elementx = selectedDataX[0].data[index];
        const elementy = selectedDataY[0].data[index];
        if (index === 0) {
          fdata.data.pop();
        }
        fdata.data.push({ x: elementx, y: elementy });
      }
    }
    return {
      labels: yAxisLabels,
      datasets: [
        {
          label: "Correlations",
          data: fdata.data,
          backgroundColor: ColorUtils.getrandomColor(),
        },
      ],
    };
  };

  const renderYodaOrScatter = () => {
    return selectedDataX.length && selectedDataY.length ? (
      <BarChart
        data={formatData()}
        type={ChartType.Scatter}
        scatterExtraInfo={{
          xlabel: selectedDataX[0].label,
          ylabel: selectedDataY[0].label,
        }}
      />
    ) : (
      <div className="d-flex w-100 h-100 justify-content-center">
        <img src={GOby} alt="Yoda dancing" />
      </div>
    );
  };
  const [open, setOpen] = useState(false);

  const handleSidebarOpen = () => {
    setOpen(true);
  };

  const handleSidebarClose = () => {
    setOpen(false);
  };

  const renderSideBar = () => {
    return (
      <Drawer
        onMouseEnter={() => handleSidebarOpen()}
        onMouseLeave={() => handleSidebarClose()}
        sx={{
          width: 5,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "auto",
            marginTop: 7,
            height: "calc(100vh - 60px)",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className={`${styles.userOptions}`}>
          <span className={styles.userSelectionTitle}>Select data to plot</span>
          {chartFamily === "Time/Trend Line" ? (
            <PlotDataSelectionList
              selectedData={selectedData}
              setData={(newData) => setData(newData)}
              triggerPopUp={(message) => setShow(message)}
              isCorrelationPlot
            />
          ) : (
            <div className={`d-flex flex-column`}>
              {renderScatterDataListItems()}
            </div>
          )}
        </div>
      </Drawer>
    );
  };

  useEffect(() => {
    if (chartType !== "Select Type" && !selectedData.length) {
      setOpen(true);
    }
  }, [chartFamily, chartType, selectedData]);

  return (
    <div className={styles.mainContentContainer}>
      {renderToast()}
      {renderSideBar()}
      {godPlotData.datasets.length ? (
        <BarChart data={godPlotData} type={chartType as ChartType} />
      ) : (
        renderYodaOrScatter()
      )}
    </div>
  );
};

export default MainContent;

interface MainContentProps {
  chartType: string;
  chartFamily: string;
  rangeOfYears: number[];
  aggregateBy: number;
}
// //  ////////////////////////////////////////
// //
// //
// //
// //  MDS DIGITAL
//  SOLUTIONS
// //
// //
// //
// // ///////////////////////////////////////////////
