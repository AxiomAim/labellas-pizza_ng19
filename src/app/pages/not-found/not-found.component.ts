import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DomHandlerService } from '@services/dom-handler.service';

@Component({
    selector: 'app-not-found',
    imports: [
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        RouterModule
    ],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(public router: Router, private domHandlerService: DomHandlerService) { } 

  public goHome(): void {
    if (this.router.routerState.snapshot.url.includes("/admin")) {
      this.router.navigate(['/admin']);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    this.domHandlerService.hidePreloader();
  }
  
}