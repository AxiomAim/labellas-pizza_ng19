import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator } from '../../../theme/utils/app-validators';
import { ImageUploadComponent } from '@shared/image-upload/image-upload.component';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-profile',
    imports: [
        ReactiveFormsModule,
        ImageUploadComponent,
        MatInputModule,
        FlexLayoutModule,
        MatButtonModule
    ],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public infoForm!: FormGroup;
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      image: null,
      organization: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      instagram: null,
      website: null
    });
  }

  public onInfoFormSubmit(): void {
    if (this.infoForm.valid) {
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public fileChange(files: any) {
    if (files.length) {
      this.infoForm.controls.image.patchValue(files[0].content);
    }
    else {
      this.infoForm.controls.image.patchValue(null);
    }
  }

}
