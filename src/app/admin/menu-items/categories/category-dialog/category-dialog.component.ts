import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Category } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DialogHeaderControlsComponent } from '@shared/dialog-header-controls/dialog-header-controls.component';

@Component({
    selector: 'app-category-dialog',
    imports: [
        DialogHeaderControlsComponent,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './category-dialog.component.html'
})
export class CategoryDialogComponent implements OnInit {
  public form!: FormGroup;
  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: [null, Validators.required],
      description: null
    });

    if (this.category) {
      this.form.patchValue(this.category);
    };
  }

  public onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}
