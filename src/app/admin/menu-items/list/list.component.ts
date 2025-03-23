import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-list',
    imports: [
        MatCardModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatDividerModule,
        MatPaginatorModule,
        PipesModule,
        CurrencyPipe,
        RouterLink
    ],
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'categoryId', 'name', 'price', 'discount', 'availibilityCount', 'isVegetarian', 'actions'];
  dataSource!: MatTableDataSource<MenuItem>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.getCategories();
    this.appService.getMenuItems().subscribe((menuItems: MenuItem[]) => {
      this.initDataSource(menuItems);
    })
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getCategories() {
    if (!this.appService.Data.categories.length) {
      this.appService.getCategories().subscribe(categories => {
        this.appService.Data.categories = categories;
      });
    }
  }


  public remove(menuItem: MenuItem) {
    const index: number = this.dataSource.data.indexOf(menuItem);
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
