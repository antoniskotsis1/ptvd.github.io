import React from "react";
import { ChartData } from "../../types";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
  } from 'chart.js';
  
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


export const LineChart: React.FunctionComponent<BarChartProps> = (props) => {
  const { data } = props;
  return (
    <div >
      <Line data={data} />
    </div>
  );
};

interface BarChartProps{
  data: ChartData;
}
