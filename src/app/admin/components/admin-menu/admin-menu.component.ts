import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AdminMenu } from '@models/admin-menu.model';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AdminMenuService } from '@services/admin-menu.service';
import { Settings, SettingsService } from '@services/settings.service';

@Component({
    selector: 'app-admin-menu',
    imports: [
        RouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule
    ],
    templateUrl: './admin-menu.component.html',
    styleUrl: './admin-menu.component.scss'
})
export class AdminMenuComponent implements OnInit {
  @Input('menuItems') menuItems: AdminMenu[] = [];
  @Input('menuParentId') menuParentId = 0;
  parentMenu: Array<any> = [];
  public settings: Settings;

  constructor(public settingsService: SettingsService, public menuService: AdminMenuService) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    this.parentMenu = this.menuItems.filter(item => item.parentId == this.menuParentId);
  }

  onClick(menuId: number) {
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuItems, menuId);
  }

}
