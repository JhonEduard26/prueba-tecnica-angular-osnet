import { Component, Input, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { Product } from '../../../shared/types';

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'dashboard-rating-distribution',
  imports: [NgApexchartsModule],
  templateUrl: './rating-distribution.component.html',
  styles: ``,
})
export class RatingDistributionComponent {
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

  getRatingDistribution = () => {
    const ratingGroups = this.data.reduce(
      (acc: { [key: string]: number }, product) => {
        const rating = Math.floor(product.rating.rate);
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
      },
      {}
    );

    return {
      series: [
        {
          name: 'Productos',
          data: Object.values(ratingGroups),
        },
      ],
      categories: Object.keys(ratingGroups).map(
        (rating) => `${rating} estrellas`
      ),
    };
  };
}
