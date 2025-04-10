import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reservation } from '@models/app.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppService } from '@services/app.service';

@Component({
    selector: 'app-reservations',
    imports: [
        MatTableModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSortModule
    ],
    templateUrl: './reservations.component.html'
})
export class ReservationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'time', 'guests', 'tableNumber', 'status.name', 'actions'];
  dataSource!: MatTableDataSource<Reservation>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getReservations().subscribe((res: Reservation[]) => {
      this.initDataSource(res);
    });
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    (this.dataSource.sortingDataAccessor as any) = (data: any, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i) => o[i], obj);
  }

  public remove(reservation: Reservation) {
    const index: number = this.dataSource.data.indexOf(reservation);
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

}
