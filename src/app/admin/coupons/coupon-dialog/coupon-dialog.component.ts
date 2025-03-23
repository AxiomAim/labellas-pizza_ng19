import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { DialogHeaderControlsComponent } from '@shared/dialog-header-controls/dialog-header-controls.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-coupon-dialog',
    imports: [
        MatDialogModule,
        DialogHeaderControlsComponent,
        ReactiveFormsModule,
        MatTabsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatCheckboxModule,
        FlexLayoutModule,
        MatTooltipModule
    ],
    templateUrl: './coupon-dialog.component.html'
})
export class CouponDialogComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public menuItems: any[] = [];
  public form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CouponDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      code: ['', Validators.required],
      desc: null,
      discountType: null,
      amount: null,
      expiryDate: null,
      allowFreeShipping: false,
      storeId: null,
      showOnStore: false,
      restriction: this.fb.group({
        minimumSpend: null,
        maximumSpend: null,
        individualUseOnly: false,
        excludeSaleItems: false,
        menuItems: [[]],
        categories: [[]]
      }),
      limit: this.fb.group({
        perCoupon: null,
        perItems: null,
        perUser: null
      })
    });

    if (this.data.coupon) {
      this.form.patchValue(this.data.coupon);
      this.menuItems = this.data.coupon.restriction.menuItems;
    };
  }

  public onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  public addMenuItem(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.menuItems.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    (this.form['controls'] as any).restriction['controls'].menuItems.patchValue(this.menuItems);
  }

  public removeMenuItem(item: any): void {
    const index = this.menuItems.indexOf(item);
    if (index >= 0) {
      this.menuItems.splice(index, 1);
    }
    (this.form['controls'] as any).restriction['controls'].menuItems.patchValue(this.menuItems);
  }

}