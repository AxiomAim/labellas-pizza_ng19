import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router'; 
import { AdminMenu } from '@models/admin-menu.model';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AdminMenuService } from '@services/admin-menu.service';
import { DomHandlerService } from '@services/dom-handler.service'; 
import { Settings, SettingsService } from '@services/settings.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component';
import { LangComponent } from '@shared/lang/lang.component';
import { MessagesComponent } from './components/messages/messages.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { LogoComponent } from '@shared/logo/logo.component';

@Component({
    selector: 'app-admin',
    imports: [
        RouterModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        NgScrollbarModule,
        BreadcrumbComponent,
        FullScreenComponent,
        LangComponent,
        MessagesComponent,
        UserMenuComponent,
        AdminMenuComponent,
        LogoComponent
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public userImage = 'images/others/admin.jpg';
  public settings: Settings;
  public menuItems: Array<AdminMenu> = [];
  public toggleSearchBar: boolean = false;
  constructor(public settingsService: SettingsService,
              public router: Router,
              private menuService: AdminMenuService,
              private domHandlerService: DomHandlerService) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit() {
    if (this.domHandlerService.window?.innerWidth <= 960) {
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    };
    this.menuItems = this.menuService.getMenuItems();
  }

  ngAfterViewInit() { 
    this.domHandlerService.hidePreloader();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.domHandlerService.isBrowser) {
          this.scrollToTop();
        }
      }
      if (this.domHandlerService.window?.innerWidth <= 960) {
        this.sidenav.close();
      }
    });
    this.menuService.expandActiveSubMenu(this.menuService.getMenuItems());
  }

  public toggleSidenav() {
    this.sidenav.toggle();
  }

  public scrollToTop() {
    var scrollDuration = 200;
    var scrollStep = -this.domHandlerService.window?.pageYOffset / (scrollDuration / 20);
    var scrollInterval = setInterval(() => {
      if (this.domHandlerService.window?.pageYOffset != 0) {
        this.domHandlerService.window?.scrollBy(0, scrollStep);
      }
      else {
        clearInterval(scrollInterval);
      }
    }, 10);

    if (this.domHandlerService.window?.innerWidth <= 768) {
      this.domHandlerService.winScroll(0, 0);
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (this.domHandlerService.window?.innerWidth <= 960) {
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    }
    else {
      this.settings.adminSidenavIsOpened = true;
      this.settings.adminSidenavIsPinned = true;
    }
  }

}
