import { Component, Input, ViewChild } from '@angular/core';
import { Product } from '../../../shared/types';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'dashboard-price-by-category',
  imports: [NgApexchartsModule],
  templateUrl: './price-by-category.component.html',
  styles: ``,
})
export class PriceByCategoryComponent {
  @ViewChild('chart') chart!: ChartComponent;
  @Input() data: Product[] = [];
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
    };
  }

  getAveragePricesByCategory() {
    const categoryPrices = this.data.reduce(
      (acc: { [key: string]: number[] }, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product.price);
        return acc;
      },
      {}
    );

    const categories = Object.keys(categoryPrices);
    const averagePrices = categories.map((category) => {
      const prices = categoryPrices[category];
      return Number(
        (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
      );
    });

    return {
      categories,
      series: [
        {
          name: 'Precio Promedio',
          data: averagePrices,
        },
      ],
    };
  }
}
