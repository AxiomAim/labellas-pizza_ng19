import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-lang',
    imports: [
        MatButtonModule,
        MatMenuModule,
        TranslateModule
    ],
    templateUrl: './lang.component.html'
})
export class LangComponent {
  constructor(public translateService: TranslateService) { } 

  public changeLang(lang: string) {
    this.translateService.use(lang);
  }

}
