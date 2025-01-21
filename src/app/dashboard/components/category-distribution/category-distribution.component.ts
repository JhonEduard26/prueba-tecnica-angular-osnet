import { Component, Input, ViewChild } from '@angular/core';
import { ApexChart, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { Product } from '../../../shared/types';

type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'dashboard-category-distribution',
  imports: [NgApexchartsModule],
  templateUrl: './category-distribution.component.html',
  styles: ``,
})
export class CategoryDistributionComponent {
  @Input() data: Product[] = [];
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'donut',
        height: 350,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  getCategoryDistribution() {
    const categoryCount = this.data.reduce(
      (acc: { [key: string]: number }, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      },
      {}
    );

    return {
      series: Object.values(categoryCount),
      labels: Object.keys(categoryCount),
    };
  }
}
