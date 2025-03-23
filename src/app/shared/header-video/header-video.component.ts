import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DomHandlerService } from '@services/dom-handler.service';
import { Settings, SettingsService } from '@services/settings.service';

@Component({
    selector: 'app-header-video',
    imports: [
        NgClass,
        FlexLayoutModule,
        MatButtonModule,
        TranslateModule,
        RouterLink
    ],
    templateUrl: './header-video.component.html',
    styleUrls: ['./header-video.component.scss']
})
export class HeaderVideoComponent implements OnInit {
  @Input('backgroundVideo') backgroundVideo: any;
  @Input('contentOffsetToTop') contentOffsetToTop: boolean = false;
  @Input('contentMinHeight') contentMinHeight: any;
  @Input('title') title: any;
  @Input('desc') desc: any;
  @Input('isHomePage') isHomePage: boolean = false;
  @Input('fullscreen') fullscreen: boolean = false;
  public settings: Settings;
  
  constructor(public settingsService: SettingsService, private domHandlerService: DomHandlerService) {
    this.settings = this.settingsService.settings;
    setTimeout(() => {
      this.settings.headerBgVideo = true;
    });
  }

  ngOnInit(): void {
    if (this.contentOffsetToTop) {
      setTimeout(() => {
        this.settings.contentOffsetToTop = this.contentOffsetToTop;
      });
    }
    var vid = <HTMLVideoElement>this.domHandlerService.winDocument.getElementById("bgVideo");
    vid.muted = true;
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.settings.headerBgVideo = false;
      this.settings.contentOffsetToTop = false;
    });
  }

}
