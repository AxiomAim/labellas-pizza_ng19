import { Component } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TilesComponent } from './tiles/tiles.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MontlySalesComponent } from './montly-sales/montly-sales.component';
import { LatestOrdersComponent } from './latest-orders/latest-orders.component';
import { AnalyticsComponent } from './analytics/analytics.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        FlexLayoutModule,
        TilesComponent,
        InfoCardsComponent,
        MatCardModule,
        MatIconModule,
        MontlySalesComponent,
        LatestOrdersComponent,
        AnalyticsComponent
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

}
