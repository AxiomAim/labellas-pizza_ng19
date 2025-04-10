import { Component } from '@angular/core';
import { transactions } from '../../../common/data/analytics.data';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-transactions',
    imports: [
        FlexLayoutModule,
        NgxChartsModule,
        MatCardModule
    ],
    templateUrl: './transactions.component.html'
})
export class TransactionsComponent {
  public transactions: any[] = [];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Store';
  public showYAxisLabel = true;
  public yAxisLabel = 'Transactions';
  public colorScheme: any = {
    domain: ['#3F51B5', '#E91E63', '#43A047', '#FDD835', '#F4511E', '#606060']
  };

  constructor() {
    Object.assign(this, { transactions });
  }

  public onSelect(event: any) {
    console.log(event);
  }
}
