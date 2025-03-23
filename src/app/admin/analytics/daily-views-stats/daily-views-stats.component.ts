import { Component } from '@angular/core';
import { daily_views_stats } from '../../../common/data/analytics.data';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-daily-views-stats',
    imports: [
        FlexLayoutModule,
        NgxChartsModule,
        MatCardModule
    ],
    templateUrl: './daily-views-stats.component.html'
})
export class DailyViewsStatsComponent {
  public daily_views_stats: any[] = [];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Days';
  public showYAxisLabel = true;
  public yAxisLabel = 'Views';
  public colorScheme: any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public autoScale = true;

  constructor() {
    Object.assign(this, { daily_views_stats })
  }

  onSelect(event: any) {
    console.log(event);
  }
}
