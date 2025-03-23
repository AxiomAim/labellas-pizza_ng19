import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reservation } from '@models/app.models';
import { AppService } from '@services/app.service';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-reservations',
    imports: [
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule
    ],
    templateUrl: './reservations.component.html'
})
export class ReservationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'time', 'guests', 'tableNumber', 'status.name', 'action', 'assignTable', 'view'];
  dataSource!: MatTableDataSource<Reservation>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public statuses = [
    { id: 1, name: 'Approved' },
    { id: 2, name: 'Cancelled' }
  ];
  
  constructor(public appService: AppService, public snackBar: MatSnackBar) { }

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
    return pathString.split('.').reduce((o: any, i: any) => o[i], obj);
  }

  public onStatusSelectionChange(event: any, reservation: Reservation) {
    if (event.value) {
      const index: number = this.dataSource.data.indexOf(reservation);
      if (index !== -1) {
        this.dataSource.data.find(item => item.id == reservation.id)!.status = event.value;
        this.initDataSource(this.dataSource.data);
        this.snackBar.open('Reservation status updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    }
  }

  public onTableSelectionChange(event: any, reservation: Reservation) {
    if (event.value) {
      const index: number = this.dataSource.data.indexOf(reservation);
      if (index !== -1) {
        this.dataSource.data.find(item => item.id == reservation.id)!.tableNumber = event.value;
        this.initDataSource(this.dataSource.data);
        this.snackBar.open('Table assigned successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    }
  }


  public view(reservation: Reservation) {
    const dialogRef = this.appService.openDialog(DetailsDialogComponent, reservation, 'theme-dialog');
    dialogRef.afterClosed().subscribe(data => {
      if (data) {

      }
    });
  }

}

