import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormInputComponent } from './custom-form-input/custom-form-input.component';
import { ValidateInputComponent } from './validate-input/validate-input.component';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomImageInputComponent } from './custom-image-input/custom-image-input.component';



@NgModule({
  declarations: [
    CustomFormInputComponent,
    ValidateInputComponent,
    CustomSelectComponent,
    CustomImageInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CustomFormInputComponent,
    CustomSelectComponent,
    ValidateInputComponent,
    CustomImageInputComponent
  ]
})
export class CommonsModule { }
