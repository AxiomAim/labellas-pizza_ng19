import { NgClass } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser'
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { Settings, SettingsService } from '@services/settings.service';

@Component({
    selector: 'app-header-image',
    imports: [
        NgClass,
        FlexLayoutModule,
        MatButtonModule,
        RouterLink,
        TranslateModule
    ],
    templateUrl: './header-image.component.html',
    styleUrls: ['./header-image.component.scss']
})
export class HeaderImageComponent implements OnInit {
  @Input('backgroundImage') backgroundImage: any;
  @Input('bgImageAnimate') bgImageAnimate: any;
  @Input('contentOffsetToTop') contentOffsetToTop: boolean = false;
  @Input('contentMinHeight') contentMinHeight: any;
  @Input('title') title: any;
  @Input('desc') desc: any;
  @Input('isHomePage') isHomePage: boolean = false;
  @Input('fullscreen') fullscreen: boolean = false;
  public bgImage: any;
  public settings: Settings;

  constructor(public settingsService: SettingsService, private sanitizer: DomSanitizer) {
    this.settings = this.settingsService.settings;
    setTimeout(() => {
      this.settings.headerBgImage = true;
    });
  }

  ngOnInit() {
    if (this.contentOffsetToTop) {
      setTimeout(() => {
        this.settings.contentOffsetToTop = this.contentOffsetToTop;
      });
    }
    if (this.backgroundImage) {
      this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(' + this.backgroundImage + ')');
    }
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.settings.headerBgImage = false;
      this.settings.contentOffsetToTop = false;
    });
  }

}
