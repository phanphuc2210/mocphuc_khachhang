import { AbstractControl, ValidatorFn } from "@angular/forms";

export function fileUploadValidator(allowedExtensions: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Enter to validation only if has value or it's not undefined
      if (control.value !== undefined && isNaN(control.value)) {
        const file = control.value;
        // Get extension from file name
        const ext = file.substring(file.lastIndexOf('.') + 1);
        // Find extension file inside allowed extensions array
        if (allowedExtensions.includes(ext.toLowerCase())) {
        } else {
          return { extensionFile:  { allowedExtensions: allowedExtensions.join(', ') } };
        }
      }
      return null;
    };
}