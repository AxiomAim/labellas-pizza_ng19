import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Order } from '@models/app.models';
import { AppService } from '@services/app.service';
import { OrderDetailsDialogComponent } from '@shared/order-details-dialog/order-details-dialog.component';

@Component({
    selector: 'app-orders',
    imports: [ 
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSortModule
    ],
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'status', 'total', 'actions'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getOrders().subscribe((res: Order[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public remove(order: Order) {
    const index: number = this.dataSource.data.indexOf(order);
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
      let dialogRef = this.appService.openConfirmDialog('', message!);
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<Order>(this.dataSource.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    }
  }

  public view(order: Order) {
    const dialogRef = this.appService.openDialog(OrderDetailsDialogComponent, order, 'theme-dialog');
    dialogRef.afterClosed().subscribe(data => {
      if (data) {

      }
    });
  }

}
