import { Component, ElementRef, ViewChild } from '@angular/core';
import { refunds } from '../../../common/data/analytics.data';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-refunds',
    imports: [
        FlexLayoutModule,
        NgxChartsModule,
        MatCardModule
    ],
    templateUrl: './refunds.component.html'
})
export class RefundsComponent {
  public refunds: any[] = [];
  public showLegend = true;
  public gradient = true;
  public colorScheme: any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;

  @ViewChild('resizedDiv') resizedDiv!: ElementRef;
  public previousWidthOfResizedDiv: number = 0;

  constructor() {
    Object.assign(this, { refunds });
  }

  public onSelect(event: any) {
    console.log(event);
  }

  ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
      setTimeout(() => this.refunds = [...refunds]);
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }
}
