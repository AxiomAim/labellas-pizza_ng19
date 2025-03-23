import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { montly_sales } from '../../../common/data/analytics.data';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-montly-sales',
    imports: [
        FlexLayoutModule,
        NgxChartsModule,
        MatCardModule
    ],
    templateUrl: './montly-sales.component.html'
})
export class MontlySalesComponent implements OnInit {
  public data: any[] = [];
  public showLegend = false;
  public gradient = true;
  public colorScheme: any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  @ViewChild('resizedDiv') resizedDiv!: ElementRef;
  public previousWidthOfResizedDiv: number = 0;
 
  ngOnInit() {
    this.data = montly_sales;
  }

  public onSelect(event: any) {
    console.log(event);
  }

  ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
      setTimeout(() => this.data = [...montly_sales]);
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}