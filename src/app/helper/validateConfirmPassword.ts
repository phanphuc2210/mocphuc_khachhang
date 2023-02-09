import { AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword')

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { mismatch: true };
}



