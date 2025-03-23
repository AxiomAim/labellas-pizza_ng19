import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '@models/app.models';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { AppService } from '@services/app.service';
import { ImageUploadComponent } from '@shared/image-upload/image-upload.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-add',
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        ImageUploadComponent,
        MatInputModule,
        MatSelectModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatButtonModule
    ],
    templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {
  public form!: FormGroup;
  private sub: any;
  public id: any;
  public showImage: boolean = false;

  constructor(public appService: AppService,
              public formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "id": 0,
      "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      "description": null,
      "price": [null, Validators.required],
      "image": null,
      "discount": null,
      "availibilityCount": null,
      "weight": null,
      "isVegetarian": false,
      "categoryId": [null, Validators.required]
    });
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.getMenuItemById();
      }
      else {
        this.showImage = true;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getCategories() {
    if (!this.appService.Data.categories.length) {
      this.appService.getCategories().subscribe(categories => {
        this.appService.Data.categories = categories;
      });
    }
  }

  public getMenuItemById() {
    this.appService.getMenuItemById(this.id).subscribe((menuItem: MenuItem) => {
      this.form.patchValue(menuItem);
      if (isPlatformBrowser(this.platformId)) {
        this.appService.convertImgToBase64(menuItem.image.medium, (dataUrl: string) => {
          this.showImage = true;
          this.form.controls.image.patchValue(dataUrl.toString());
        })
      }
    });
  }

  public fileChange(files: any) {
    console.log(files)
    if (files.length) {
      this.form.controls.image.patchValue(files[0].content);
    }
    else {
      this.form.controls.image.patchValue(null);
    }
  }

  public onSubmit() {
    console.log(this.form.value);
  }

} 