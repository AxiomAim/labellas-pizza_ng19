import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-social-icons',
    imports: [
        NgClass,
        MatToolbarModule,
        MatButtonModule
    ],
    templateUrl: './social-icons.component.html'
})
export class SocialIconsComponent {
  @Input() iconSize: string = '';
  @Input() iconColor: string = '';
}
