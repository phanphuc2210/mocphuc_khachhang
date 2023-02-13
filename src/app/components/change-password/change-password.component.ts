import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { confirmPasswordValidator } from 'src/app/helper/validateConfirmPassword';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  user = this.authService.userSubject.value;
  isShowPass:boolean = false
  typePass: string = 'password'
  changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    confirmPassword: ['', Validators.compose([Validators.required])],
  }, { validator: confirmPasswordValidator })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store:Store) {}
  
  ngOnInit(): void {

  }

  public showHidePass() {
    this.isShowPass = !this.isShowPass
    this.typePass = this.isShowPass === true? 'text' : 'password'
  }

  public changePassword() {
    const data = {
      oldPass: this.changePasswordForm.controls['oldPassword'].value,
      newPass: this.changePasswordForm.controls['password'].value
    }

    this.authService.changePassword(this.user.id, data).subscribe(
      (res) => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">'+ res.result.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })
        this.authService.logOut()
        this.router.navigate(['/login'])
      },
      (err) => {
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-xl text-slate-300">'+ err.error.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })
      }
    )
  }
}
