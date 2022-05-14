import React from "react";
import { ChartData, ChartType } from "../../types";
import { Bar, Line, Scatter } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart: React.FunctionComponent<BarChartProps> = (props) => {
  const { data, type, aggregadedByYears } = props;

  const renderChart = () => {
    const title = {
      plugins: {
        title: {
          display: true,
          text: aggregadedByYears
            ? `Aggregated results by ${aggregadedByYears} years`
            : "",
          padding: {
            top: 10,
            bottom: 30,
          },
        },
        legend: {
          display: true,
          
          labels: {
              color: 'rgb(55, 55, 55)'
          }
      },
      },
    };

  
    switch (type) {
      case ChartType.Bar:
        return <Bar data={data} options={title} />;
      case ChartType.Line:
        return <Line data={data} options={title} />;
      case ChartType.Scatter:
        return <Scatter data={data} options={title} />;
      default:
        break;
    }
  };

  return <div className="vw-100">{renderChart()}</div>;
};

interface BarChartProps {
  type: ChartType;
  data: ChartData;
  aggregadedByYears?: number;
}
