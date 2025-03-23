import { Component } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd, RouterLink } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Settings, SettingsService } from '@services/settings.service';
import { AdminMenuService } from '@services/admin-menu.service';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-breadcrumb',
    imports: [
        FlexLayoutModule,
        MatIconModule,
        MatCardModule,
        RouterLink,
    ],
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  public pageTitle: string = '';
  public breadcrumbs: {
    name: string;
    url: string
  }[] = [];

  public settings: Settings;
  constructor(public settingsService: SettingsService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public title: Title,
              private menuService: AdminMenuService) {
    this.settings = this.settingsService.settings;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.parseRoute(this.router.routerState.snapshot.root);
        this.pageTitle = "";
        this.breadcrumbs.forEach(breadcrumb => {
          this.pageTitle += ' > ' + breadcrumb.name;
        })
        this.title.setTitle(this.settings.name + this.pageTitle);
      }
    });
  }

  private parseRoute(node: ActivatedRouteSnapshot) {
    if (node.data['breadcrumb']) {
      if (node.url.length) {
        let urlSegments: UrlSegment[] = [];
        node.pathFromRoot.forEach(routerState => {
          urlSegments = urlSegments.concat(routerState.url);
        });
        let url = urlSegments.map(urlSegment => {
          return urlSegment.path;
        }).join('/');
        this.breadcrumbs.push({
          name: node.data['breadcrumb'],
          url: '/' + url
        })
      }
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }

  public closeSubMenus() {
    this.menuService.closeAllSubMenus();
  }

}
