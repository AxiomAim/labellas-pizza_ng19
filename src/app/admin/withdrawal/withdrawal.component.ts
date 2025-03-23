import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppService } from '@services/app.service';
import { withdrawal } from '../../common/data/withdrawal';
import { Order } from '@models/app.models';
import { OrderDetailsDialogComponent } from '@shared/order-details-dialog/order-details-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-withdrawal',
    imports: [
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        PipesModule,
        CurrencyPipe,
        DatePipe,
        MatTooltipModule
    ],
    templateUrl: './withdrawal.component.html'
})
export class WithdrawalComponent implements OnInit {
  displayedColumns: string[] = ['invoiceId', 'orderIds', 'storeId', 'amount', 'charges', 'payment', 'date', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ];

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(withdrawal);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public viewOrder(orderId: number) {
    this.appService.getOrders().subscribe((orders: Order[]) => {
      let order = orders.find(x => x.id == orderId);
      if (order) {
        this.appService.openDialog(OrderDetailsDialogComponent, order, 'theme-dialog');
      }
    });
  }

  public approve(item: any) { }

  public reject(item: any) { }

}
