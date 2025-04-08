import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AppService } from '@services/app.service';
import { DomHandlerService } from '@services/dom-handler.service';
import { Settings, SettingsService } from '@services/settings.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { VerticalMenuComponent } from '../theme/components/menu/vertical-menu/vertical-menu.component';
import { SocialIconsComponent } from '@shared/social-icons/social-icons.component';
import { Toolbar1Component } from '../theme/components/toolbar1/toolbar1.component';
import { FooterComponent } from '../theme/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { User } from '@services/data-service/user.model';

@Component({
    selector: 'app-pages',
    imports: [
        RouterModule,
        FormsModule,
        MatSidenavModule,
        MatIconModule,
        NgScrollbarModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        MatRadioModule,
        VerticalMenuComponent,
        SocialIconsComponent,
        Toolbar1Component,
        FooterComponent,
        MatButtonModule
    ],
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {
// _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
  @ViewChild('sidenav') sidenav: any;
  public headerTypes = ['default', 'image', 'carousel', 'video'];
  public headerTypeOption: string = '';
  public headerFixed: boolean = false;
  public showBackToTop: boolean = false;
  public settings: Settings;
  public loginUser: User;

  constructor(public settingsService: SettingsService,
              public router: Router,
              public appService: AppService,
              private domHandlerService: DomHandlerService) {
    this.settings = this.settingsService.settings;
    // this.loginUser = this._firebaseAuthV2Service.loginUser();
  }

  ngOnInit() {
    this.headerTypeOption = this.settings.header;
    this.getCategories();
  }

  public changeTheme(theme: string) {
    this.settings.theme = theme;
  }

  public chooseHeaderType() {
    this.settings.header = this.headerTypeOption;
    this.domHandlerService.winScroll(0, 0);
    this.router.navigate(['/']);
  }

  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(this.domHandlerService.window?.pageYOffset, this.domHandlerService.winDocument.documentElement.scrollTop, this.domHandlerService.winDocument.body.scrollTop);
    (scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;

    if (this.settings.stickyMenuToolbar) {
      let top_toolbar = this.domHandlerService.winDocument.getElementById('top-toolbar');
      if (top_toolbar) {
        if (scrollTop >= top_toolbar.clientHeight) {
          this.settings.mainToolbarFixed = true;
        }
        else {
          if (!this.domHandlerService.winDocument.documentElement.classList.contains('cdk-global-scrollblock')) {
            this.settings.mainToolbarFixed = false;
          }
        }
      }
    }
  }

  public scrollToTop() {
    if (this.domHandlerService.isBrowser) {
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
    }
    if (this.domHandlerService.window?.innerWidth <= 768) {
      this.domHandlerService.winScroll(0, 0);
    }
  }

  ngAfterViewInit() {
    this.domHandlerService.hidePreloader(); 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
        this.settings.mainToolbarFixed = false;
        this.domHandlerService.winScroll(0, 0);
      }
    });
  }

  public getCategories() {
    if (this.appService.Data.categories.length == 0) {
      this.appService.getCategories().subscribe(data => {
        this.appService.Data.categories = data;
      });
    }
  }

}
