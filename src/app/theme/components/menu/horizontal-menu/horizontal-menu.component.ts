import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Menu } from '@models/menu.model';
import { TranslateModule } from '@ngx-translate/core';
import { MenuService } from '@services/menu.service';

@Component({
    selector: 'app-horizontal-menu',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        TranslateModule,
        RouterModule
    ],
    templateUrl: './horizontal-menu.component.html',
    providers: [MenuService]
})
export class HorizontalMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId = 0;
  public menuItems: Array<Menu> = [];
  @ViewChildren(MatMenuTrigger) triggers!: QueryList<MatMenuTrigger>;

  constructor(public menuService: MenuService) { }

  ngOnInit() {
    this.menuItems = this.menuService.getHorizontalMenuItems();
    this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);
  }

  public closeOthers(trigger: MatMenuTrigger) {
    const currentIndex: number = this.triggers.toArray().findIndex(t => t == trigger);
    this.triggers.forEach((menu, index) => {
      if (index != currentIndex) {
        menu.closeMenu();
      }
    });
  }

}
