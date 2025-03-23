import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { RatingComponent } from '@shared/rating/rating.component';
import { Subscription } from 'rxjs';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { CommentsComponent } from '@shared/comments/comments.component';
import { SocialIconsComponent } from '@shared/social-icons/social-icons.component';

@Component({
    selector: 'app-detail',
    imports: [
        MatCardModule,
        MatChipsModule,
        FlexLayoutModule,
        RatingComponent,
        MatIconModule,
        MatTabsModule,
        CurrencyPipe,
        PipesModule,
        CommentsComponent,
        SocialIconsComponent
    ],
    templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  private sub: Subscription;
  public menuItem!: MenuItem;
  constructor(public appService: AppService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.getMenuItemById(params['id']);
      }
      else {
        this.getMenuItemById(20);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getCategories() {
    if (!this.appService.Data.categories.length) {
      this.appService.getCategories().subscribe(categories => {
        this.appService.Data.categories = categories;
      });
    }
  }

  public getMenuItemById(id: number) {
    this.appService.getMenuItemById(id).subscribe(data => {
      this.menuItem = data;
    });
  }

}
