import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-timeline',
    imports: [
        FlexLayoutModule,
        NgClass
    ],
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  public times = [
    { icon: 'coffee-cup', title: 'Breakfast', hours: '8.00 am 10.00 am' },
    { icon: 'lunch', title: 'Lunch', hours: '1.00 am 2.00 am' },
    { icon: 'dinner-table', title: 'Dinner', hours: '7.00 am 9.00 am' },
    { icon: 'ice-cream', title: 'Dessert', hours: 'All time' }
  ] 
}
