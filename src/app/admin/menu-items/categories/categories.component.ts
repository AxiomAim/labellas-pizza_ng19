import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Category } from '@models/app.models';
import { AppService } from '@services/app.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-categories',
    imports: [
        MatCardModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatDividerModule,
        MatPaginatorModule
    ],
    templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'remove'];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.appService.getCategories().subscribe((categories: Category[]) => {
      this.initDataSource(categories);
    })
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public remove(category: Category) {
    const index: number = this.dataSource.data.indexOf(category);
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

  public openCategoryDialog(category: Category | null) {
    const dialogRef = this.appService.openDialog(CategoryDialogComponent, category, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cat => {
      if (cat) {
        let message = '';
        const index: number = this.dataSource.data.findIndex(x => x.id == cat.id);
        if (index !== -1) {
          this.dataSource.data[index] = cat;
          message = 'Category ' + cat.name + ' updated successfully';
        }
        else {
          let last_category = this.dataSource.data[this.dataSource.data.length - 1];
          cat.id = last_category.id + 1;
          this.dataSource.data.push(cat);
          this.paginator.lastPage();
          message = 'New category ' + cat.name + ' added successfully!';
        }
        this.initDataSource(this.dataSource.data);
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    });
  }

}
