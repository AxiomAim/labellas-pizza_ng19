import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DomHandlerService } from '@services/dom-handler.service';

@Component({
    selector: 'app-dialog-header-controls',
    imports: [
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule
    ],
    templateUrl: './dialog-header-controls.component.html'
})
export class DialogHeaderControlsComponent {
  @Input('dialogRef') dialogRef: any;
  @Input('showFullscreenIcon') showFullscreenIcon: boolean = true;
  public isFullScreen: boolean = false;

  constructor(private domHandlerService: DomHandlerService) { }

  public toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      this.dialogRef.addPanelClass('fullscreen');
      this.domHandlerService.winDocument.getElementsByTagName('html')[0].style.overflowY = "hidden";
    }
    else {
      this.dialogRef.removePanelClass('fullscreen');
      (this.domHandlerService.winDocument.getElementsByTagName('html')[0] as any).style.overflowY = null;
    }
  }

  public close() {
    this.dialogRef.close();
    (this.domHandlerService.winDocument.getElementsByTagName('html')[0] as any).style.overflowY = null;
  }

}
