import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { DomHandlerService } from '@services/dom-handler.service';
import { emailValidator, maxWordsValidator } from '../../theme/utils/app-validators';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-checkout',
    imports: [
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        RouterLink,
        CurrencyPipe,
        NgScrollbarModule,
        MatCardModule
    ],
    templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = true;
  public checkoutForm: FormGroup = new FormGroup({});
  public countries: any[] = [];
  public deliveryMethods: any[] = [];
  public months: any[] = [];
  public years: any[] = [];
  public step = 0;
  public deliveryMethodSubmitted: boolean = false;
  public orderCompleted: boolean = false;
  public orderEmail: string = '';

  constructor(public appService: AppService,
              private fb: FormBuilder,
              private domHandlerService: DomHandlerService) { }

  ngOnInit(): void {
    if (this.domHandlerService.window?.innerWidth < 960) {
      this.sidenavOpen = false;
    };
    this.countries = this.appService.getCountries();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.checkoutForm = this.fb.group({
      deliveryAddress: this.fb.group({
        'firstName': [null, Validators.compose([Validators.required, maxWordsValidator(1)])],
        'lastName': [null, Validators.compose([Validators.required, maxWordsValidator(1)])],
        'middleName': [null, maxWordsValidator(1)],
        'company': '',
        'email': [null, Validators.compose([Validators.required, emailValidator])],
        'phone': [null, Validators.required],
        'country': [null, Validators.required],
        'city': [null, Validators.required],
        'place': [null, Validators.required],
        'postalCode': [null, Validators.required],
        'address': [null, Validators.required],
      }),
      deliveryMethod: this.fb.group({
        'method': [null, Validators.required]
      }),
      paymentMethod: this.fb.group({
        'cardHolderName': [null, Validators.required],
        'cardNumber': [null, Validators.required],
        'expiredMonth': [null, Validators.required],
        'expiredYear': [null, Validators.required],
        'cvv': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
      })
    });

  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (this.domHandlerService.window?.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public setStep(index: number) {
    this.step = index;
  }
  
  public onSubmitForm(form: any) {
    if (this.checkoutForm.get(form)?.valid) {
      this.nextStep();
    }
    if (form == 'deliveryMethod') {
      this.deliveryMethodSubmitted = true;
    }
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }

  public placeOrder() {
    this.checkoutForm.updateValueAndValidity();
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      this.step = 4;
      this.orderCompleted = true;
      this.orderEmail = (this.checkoutForm.get('deliveryAddress') as any)['controls'].email.value;
      this.checkoutForm.reset();
      this.appService.Data.cartList.length = 0;
      this.appService.Data.totalPrice = 0;
      this.appService.Data.totalCartCount = 0;
    }
  }

}