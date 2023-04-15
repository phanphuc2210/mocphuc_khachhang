import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/helper/validateConfirmPassword';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  isShowPass: boolean = false;
  typePass: string = 'password';
  requestForm = this.fb.group(
    {
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      confirmPassword: ['', Validators.compose([Validators.required])],
    },
    { validator: confirmPasswordValidator }
  );
  resetToken?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetToken = params['token'];
    });
  }

  showHidePass() {
    this.isShowPass = !this.isShowPass;
    this.typePass = this.isShowPass === true ? 'text' : 'password';
  }

  resetPassword() {
    const data: {newPass: string, resetToken: string} = {
      newPass: this.requestForm.controls['password'].value!,
      resetToken: this.resetToken!,
    };

    this.authService.resetPassword(data).subscribe({
      next: (res) => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-base text-slate-300">' + res.message + '</p>',
          confirmButtonText: 'Đến trang login',
          confirmButtonColor: '#0e9f6e',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      },
      error: err => {
        const err_message = err.error.message;
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-base text-slate-300">' + err_message + '</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        });
      }
    });
  }
}
