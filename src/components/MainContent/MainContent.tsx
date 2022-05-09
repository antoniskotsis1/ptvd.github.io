import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ChartType } from "../../types";
import { AggregatorUtils } from "../../utils";
import { BarChart } from "../Charts/BarChart";
import styles from "./MainContent.module.scss";

export const MainContent: React.FunctionComponent = () => {
  const [chartType, setChartType] = useState(ChartType.Bar);
  const [aggregateValue,setAggregateValue] = useState(0);
  // fetch data from api ?? use a state managment tool to keep these values?!
  const labels = ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'];
  const randomColor =()=> {return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`};

  const color1 = randomColor();
  const color2 = randomColor();
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tragos",
        backgroundColor: color1,
        borderColor: color1,
        data: [511.3287550025172, 697.0117202841797, 281.9534066824898, 113.75838989037001, 738.2165320472706, 640.4598994183477, 823.4182546296694, 47.938134086390136, 155.64365444872453, 432.7703679677166, 414.99439088999344, 652.8950889445275, 761.3532086267044, 651.3803419012897, 327.3171744156406, 949.7416436946291, 782.356368791352, 342.23415853565064, 724.9026774975996, 897.7441807778844, 879.9825683469102, 650.3643985347126, 584.1986093941183, 102.88824866888658, 621.5202292051443, 193.54580588798143, 23.96664442344032, 278.5340023850822, 253.85881767769413, 488.11418022201025, 714.9166852625491, 634.1026171969918, 879.9967926264306, 159.9912167758727, 104.47797007232273, 876.6805859625478, 386.8843357714991, 786.4066421874074, 904.8069322047036, 564.8350279991015, 605.001475276086, 134.63696480317256, 590.7684532982379, 934.994095292744, 906.1979462892316, 142.68804581765792, 436.21372597678265, 60.813063343405304, 925.8320957469911, 380.14672844251953]
      },
      {
        label: "MIxas",
        backgroundColor: color2,
        borderColor: color2,
        data: [588.6990234584471, 694.8410190644267, 226.9051213577259, 286.2648427758531, 821.655346116754, 377.47546408910694, 187.34931689203316, 548.4488434724121, 539.1927653277826, 754.9351438923791, 269.18430254975345, 324.2694257664034, 159.2725701946518, 96.77512505446084, 680.7816212890414, 866.6258338855399, 525.8548557691205, 615.485055525904, 211.66297886878127, 664.3847550242884, 626.9903593434319, 25.557930095240877, 719.4960499589807, 253.47225163616082, 82.57915741855093, 669.9901260820185, 430.770391453802, 664.5543011527169, 589.6126079744416, 364.12545769042157, 701.7848175541747, 88.84542474609192, 157.68219613623313, 480.3684018707057, 638.7422215417024, 250.31557638781808, 157.09844970696219, 666.1623980487292, 733.734646842181, 683.511216688075, 483.407209842572, 70.65929689000305, 489.7950312154129, 659.1159865387978, 456.27200896737173, 928.8493405333134, 978.9673726140755, 960.6976576684714, 31.577212977781933, 430.01981511846844]
      }
    ],
  };
  const years = 10
  const newData = AggregatorUtils.aggregateByKYears(labels, data, aggregateValue);
  

  const renderChartTypeDropDown = () => (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {chartType}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{setChartType(ChartType.Line)}}>LineChart</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setChartType(ChartType.Bar)}}>Bar Chart</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setChartType(ChartType.Scatter)}}>Scatter Chart</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );

  const renderAggregateByDropDown=()=>(
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      Aggregate by years: {aggregateValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item onClick={()=>{setAggregateValue(0)}}>Hide Aggregatted plot</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setAggregateValue(5)}}>5</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setAggregateValue(10)}}>10</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setAggregateValue(15)}}>15</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  )

  return (
    <div className={styles.mainContentContainer}>
      {renderChartTypeDropDown()}
      {renderAggregateByDropDown()}
      <BarChart data={data} type={chartType} />
      {aggregateValue && <BarChart data={newData} type={chartType} aggregadedByYears={aggregateValue}/>}

    </div>
  );
};

export default MainContent;
