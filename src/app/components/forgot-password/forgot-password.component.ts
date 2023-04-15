import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  requestForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
  })

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  sendEmail() {
    const data = {
      email: this.requestForm.controls['email'].value!
    }

    this.authService.forgotPassword(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-base text-slate-300">'+ res.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })
      },
      error: err => {
        const err_message = err.error.message
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-base text-slate-300">'+ err_message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })
      }
    })
  }
}
