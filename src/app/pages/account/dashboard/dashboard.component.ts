import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-dashboard',
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        RouterLink,
        MatProgressBarModule
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

}
