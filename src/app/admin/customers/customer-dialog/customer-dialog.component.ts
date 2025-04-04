import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DialogHeaderControlsComponent } from '@shared/dialog-header-controls/dialog-header-controls.component';

@Component({
    selector: 'app-customer-dialog',
    imports: [
        MatDialogModule,
        DialogHeaderControlsComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatTabsModule,
        MatSelectModule,
        FlexLayoutModule,
        MatButtonModule
    ],
    templateUrl: './customer-dialog.component.html'
})
export class CustomerDialogComponent implements OnInit {
  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CustomerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      username: ['', Validators.required],
      email: null,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: null,
      storeId: null,
      walletBalance: null,
      revenue: null,
      billing: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: '',
        company: '',
        email: ['', Validators.required],
        phone: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        state: '',
        zip: ['', Validators.required],
        address: ['', Validators.required]
      })
    });

    if (this.data.customer) {
      this.form.patchValue(this.data.customer);
    };
  }

  public onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  public compareFunction(o1: any, o2: any) {
    return (o1.name == o2.name && o1.code == o2.code);
  }

}
