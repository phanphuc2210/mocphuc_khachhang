import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string
  @Input() selectedOptionValue!: string
  @Input() selectedOptionLabel!: string
  @Input() optionsLabel: string = "name"
  @Input() optionsValue: string = "id"
  @Input() options!: any
  @Input() containerClass!: string
  @Input() inputClass!: string
  @Input() errors!: ValidationErrors | null
  
  isDisabled!: boolean
  isDirty: boolean = false
  input!: string

  onChange:any = () => {}
  onTouched:any = () => {}

  ngOnInit(): void {
    
  }

  writeValue(input: any): void {
    this.input = input
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
}
