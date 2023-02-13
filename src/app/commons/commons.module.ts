import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormInputComponent } from './custom-form-input/custom-form-input.component';
import { ValidateInputComponent } from './validate-input/validate-input.component';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomFormInputComponent,
    ValidateInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CustomFormInputComponent,
    ValidateInputComponent
  ]
})
export class CommonsModule { }
