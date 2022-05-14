import { ChartDataInterval } from "../types";

export class ColorUtils {
  private static aggregateByKYears(
    lables: string[],
    oldData: any,
    years: number
  ) {
    const newData: { labels: string[]; datasets: ChartDataInterval[] } = {
      labels: this.getNewLabels(lables, years),
      datasets: [],
    };
    oldData.datasets.forEach((data:any) =>
      newData.datasets.push(this.getAggregatedData(data, years))
    );
    return newData;
  }

  private static getNewLabels(
    oldLabels: string[],
    groupByYears: number
  ): string[] {
    const newLabels: string[] = [];
    oldLabels.forEach((label, index) => {
      if ((index + 1) % groupByYears === 0) {
       return newLabels.push(`${+label - (groupByYears - 1)} - ${label}`);
      }
      
    });
    return newLabels;
  }

  private static getAggregatedData(oldData: any, groupByYears: number) {
    const newDataset: number[] = [];
    let sum = 0;
    oldData.data.forEach((num: number, index: number) => {
      sum += num;
      if ((index + 1) % groupByYears === 0) {
        newDataset.push(sum / groupByYears);
        sum = 0;
      }
    });
    return {
      label: oldData.label,
      data: newDataset,
      backgroundColor: oldData.backgroundColor,
    };
  }

  public static getrandomColor(){
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
  };
}
