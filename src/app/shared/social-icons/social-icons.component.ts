import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-social-icons',
    imports: [
        NgClass
    ],
    templateUrl: './social-icons.component.html'
})
export class SocialIconsComponent {
  @Input() iconSize: string = '';
  @Input() iconColor: string = '';
}
