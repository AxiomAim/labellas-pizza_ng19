import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-get-in-touch',
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        RouterLink,
        MatIconModule
    ],
    templateUrl: './get-in-touch.component.html',
    styleUrls: ['./get-in-touch.component.scss']
})
export class GetInTouchComponent { 

}
