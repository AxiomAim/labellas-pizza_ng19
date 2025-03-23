import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Order } from '@models/app.models';
import { AppService } from '@services/app.service';
import { OrderDetailsDialogComponent } from '@shared/order-details-dialog/order-details-dialog.component';
import { support_tickets } from '../../common/data/support-tickets';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-support',
    imports: [
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        PipesModule,
        DatePipe,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {
  displayedColumns: string[] = ['code', 'supportCategoryId', 'issue', 'orderId', 'customer', 'date', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public statuses = [
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Solved' },
    { id: 4, name: 'Closed' }
  ];
  public spportCategories = [
    { id: 1, name: 'Pre-Sale Question' },
    { id: 2, name: 'Order Question' },
    { id: 3, name: 'Shipping' },
    { id: 4, name: 'Product Availability' }
  ];

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.initDataSource(support_tickets);
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
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

  public remove(ticket: any) {
    const index: number = this.dataSource.data.indexOf(ticket);
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
      let dialogRef = this.appService.openConfirmDialog('', message!);
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.dataSource.data.splice(index, 1);
          this.initDataSource(this.dataSource.data);
        }
      });
    }
  }

  public reply(ticket: any) { }

}
