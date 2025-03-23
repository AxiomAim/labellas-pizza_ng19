import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { reviews } from '../../common/data/reviews';
import { AppService } from '@services/app.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { RatingComponent } from '@shared/rating/rating.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-reviews',
    imports: [
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        PipesModule,
        RatingComponent,
        DatePipe
    ],
    templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {
  displayedColumns: string[] = ['statusId', 'image', 'author', 'menuItem', 'comment', 'rating', 'date', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public statuses = [
    { id: 1, name: 'Approved' },
    { id: 2, name: 'Pending' }
  ];

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.initDataSource(reviews);
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public unApprove(review: any) {
    const index: number = this.dataSource.data.findIndex(x => x.id == review.id);
    if (index !== -1) {
      review.statusId = 2;
      this.dataSource.data[index] = review;
    }
  }

  public remove(review: any) {
    const index: number = this.dataSource.data.indexOf(review);
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
