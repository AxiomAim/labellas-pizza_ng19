import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { CommentsComponent } from '@shared/comments/comments.component';
import { MenuItemHoverableComponent } from '@shared/menu-item-hoverable/menu-item-hoverable.component';
import { RatingComponent } from '@shared/rating/rating.component';

@Component({
    selector: 'app-chef',
    imports: [
        MatCardModule,
        RatingComponent,
        MatIconModule,
        MatBadgeModule,
        MenuItemHoverableComponent,
        CommentsComponent,
        FlexLayoutModule
    ],
    templateUrl: './chef.component.html',
    styleUrl: './chef.component.scss'
})
export class ChefComponent implements OnInit {
  private sub: any;
  public chef: any;
  public menuItems: MenuItem[] = [];
  
  constructor(private activatedRoute: ActivatedRoute, public appService: AppService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getChefById(params['id']);
      this.getMenuItems();
    });
  }

  public getChefById(id: any) {
    this.chef = this.appService.getChefs().find(chef => chef.id == id);
  }

  public getMenuItems() {
    this.appService.getMenuItems().subscribe(data => {
      this.menuItems = this.appService.shuffleArray(data).slice(0, 12);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
