export type ChartData = {
    labels: string[];
    datasets: ChartDataInterval[]
}
  
export type ChartDataInterval = {
    label: string;
    data: number[];
    backgroundColor: string,
    // borderColor: string,
  }
  

export enum ChartType {
      Bar = "Bar Chart",
      Line = "Line Chart",
      Scatter= "Scatter Plot"
  }