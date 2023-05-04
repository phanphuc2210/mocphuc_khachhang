import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validate-input',
  templateUrl: './validate-input.component.html',
  styleUrls: ['./validate-input.component.scss']
})
export class ValidateInputComponent implements OnChanges{
  @Input() label!: string
  @Input() errors!: ValidationErrors | null
  @Input() isDirty!: boolean

  errorMessage!: string

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = this.setErrorMessage()
  }

  setErrorMessage():string {
    if(this.errors?.['required']) {
      return `*${this.label} không được để trống!`
    } else if(this.errors?.['minlength']) {
      return `*${this.label} phải từ ${this.errors?.['minlength']?.['requiredLength']} ký tự trở lên!`
    } else if(this.errors?.['maxlength']) {
      return `*${this.label} không được nhiều hơn ${this.errors?.['maxlength']?.['requiredLength']} ký tự!`
    } else if(this.errors?.['min']) {
      return `*${this.label} tối thiểu là ${this.errors?.['min']?.['min']}!`
    } else if(this.errors?.['max']) {
      return `*${this.label} tối thiểu là ${this.errors?.['max']?.['max']}!`
    } else if(this.errors?.['email'] || this.errors?.['pattern']) {
      return `*${this.label} không đúng định dạng!`
    } else if(this.errors?.['extensionFile']) {
      return `*${this.label} phải có phần mở rộng là ${this.errors?.['extensionFile']?.['allowedExtensions']}!`
    } else if(this.errors?.['isDuplicateCode']) {
      return `*${this.label} bị trùng lặp!`
    } else if(this.errors?.['toDateInvalid']) {
      return `*Ngày đến phải lớn hơn ngày từ!`
    } else if(this.errors?.['fromDateInvalid']) {
      return `*Ngày từ phải nhỏ hơn ngày đến!`
    }

    return ""
  }
}
