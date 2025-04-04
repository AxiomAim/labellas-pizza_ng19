import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppService } from '@services/app.service';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';
import { coupons } from '../../common/data/coupons';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-coupons',
    imports: [
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        PipesModule,
        CurrencyPipe,
        DatePipe,
        FlexLayoutModule
    ],
    templateUrl: './coupons.component.html'
})
export class CouponsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'code', 'discountType', 'amount', 'storeId', 'limit.perCoupon', 'expiryDate', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ]
  public discountTypes = [
    { id: 1, name: 'Percentage discount' },
    { id: 2, name: 'Fixed Cart Discount' },
    { id: 3, name: 'Fixed Product Discount' }
  ];

  constructor(public appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this.initDataSource(coupons);
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    (this.dataSource.sortingDataAccessor as any) = (data: any, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId.toString());
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o: any, i: any) => o[i], obj);
  }

  public getCategories() {
    if (!this.appService.Data.categories.length) {
      this.appService.getCategories().subscribe(categories => {
        this.appService.Data.categories = categories;
      });
    }
  }

  public remove(coupon: any) {
    const index: number = this.dataSource.data.indexOf(coupon);
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

  public openCouponDialog(coupon: any) {
    let data = {
      coupon: coupon,
      stores: this.stores,
      discountTypes: this.discountTypes,
      categories: this.appService.Data.categories
    };
    const dialogRef = this.appService.openDialog(CouponDialogComponent, data, 'theme-dialog');
    dialogRef.afterClosed().subscribe(coup => {
      if (coup) {
        let message = '';
        const index: number = this.dataSource.data.findIndex(x => x.id == coup.id);
        if (index !== -1) {
          this.dataSource.data[index] = coup;
          message = 'Coupon ' + coup.title + ' updated successfully';
        }
        else {
          let last_coupon = this.dataSource.data[this.dataSource.data.length - 1];
          coup.id = last_coupon.id + 1;
          this.dataSource.data.push(coup);
          this.paginator.lastPage();
          message = 'New coupon ' + coup.title + ' added successfully!';
        }
        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

}
