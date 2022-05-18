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
  const { data, type, aggregadedByYears, scatterExtraInfo } = props;

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
            color: "rgb(55, 55, 55)",
          },
        },
      },
    };

    switch (type) {
      case ChartType.Bar:
        return <Bar data={data} options={title} />;
      case ChartType.Line:
        return <Line data={data} options={title} />;
      case ChartType.Scatter:

        const label = (tooltipItem: any) => {
          const yearIndex = data.datasets[0].data.indexOf(tooltipItem.raw);
          return "Year:" + data.labels[yearIndex];
        };
        const afterLabel = (tooltipItem: any) => {
          return `${scatterExtraInfo?.ylabel}:${tooltipItem.raw.y}\n${scatterExtraInfo?.xlabel}:${tooltipItem.raw.x}`;
        };

        return (
          <Scatter
            data={data}
            options={{
              showLine: true,
              responsive:true,
              plugins: {
                legend:{display: false},
                title: {display:true, text:`Correlation between ${scatterExtraInfo?.xlabel} and ${scatterExtraInfo?.ylabel}`},
                tooltip: {
                  callbacks: {
                    label: label,
                    afterLabel: afterLabel,
                  },
                },
              },
              scales: {
                y: {
                  title: { text: scatterExtraInfo?.ylabel, display: true },
                },
                x: {
                  title: { text: scatterExtraInfo?.xlabel, display: true },
                },
              },
            }}
          />
        );
      default:
        break;
    }
  };

  return <div className="d-flex align-items-center vw-100">{renderChart()}</div>;
};

interface BarChartProps {
  type: ChartType;
  data: any;
  scatterExtraInfo?: { xlabel: string; ylabel: string };
  aggregadedByYears?: number;
}
