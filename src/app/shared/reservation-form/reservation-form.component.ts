import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-reservation-form',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatSelectModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    templateUrl: './reservation-form.component.html'
})
export class ReservationFormComponent implements OnInit {
  public form!: UntypedFormGroup;
  public hours = ['1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am',
                  '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00pm'];
  public today = new Date();
  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();
  constructor(public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, emailValidator])],
      guests: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      message: null
    });
  }

  public submit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.onFormSubmit.emit(this.form);
    }
  }

}
