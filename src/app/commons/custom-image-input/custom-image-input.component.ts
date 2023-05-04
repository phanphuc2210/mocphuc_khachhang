import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custom-image-input',
  templateUrl: './custom-image-input.component.html',
  styleUrls: ['./custom-image-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomImageInputComponent),
      multi: true
    }
  ]
})
export class CustomImageInputComponent implements ControlValueAccessor {
  @Input() label!: string
  @Input() defaultImgUrl!: string
  @Input() api_upload: string = `${environment.apiURL}/upload`
  @Input() containerClass!: string
  @Input() inputClass!: string
  @Input() imageSizeClass: string = 'w-32 h-32'
  @Input() errors!: ValidationErrors | null

  @Output() imageUrl = new EventEmitter<string>();
  
  isDisabled!: boolean
  isDirty: boolean = false
  input!: string
  hasError!: boolean
  preview_img!: string
  isLoading: boolean = false
  file!: any

  onChange:any = () => {}
  onTouched:any = () => {}

  constructor(private httpClient: HttpClient) {}

  writeValue(input: any): void {
    this.input = input
    this.preview_img = ""
    this.isDirty = false
  }

  registerOnChange(fn: any): void {
    this.onChange = (event:any) => {
      fn(event.target.value);
      this.isDirty = true;
    };
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  sendImgUrl(event: any) {
    this.isLoading = true
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);


    this.httpClient.post<any>(this.api_upload, formData).subscribe(
      res => {
        this.preview_img = res.result
        this.isLoading = false;

        this.imageUrl.emit(res.result)
      },
      err => {
        this.isLoading = false;
        this.preview_img = "../../../assets/err_img.png"
        console.log("Error:", err.error)
      }
    )
  }
}
