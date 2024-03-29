import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as CartActions from 'src/app/store/cartStore/cart.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isShowPass: boolean = false;
  typePass: string = 'password';
  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required])],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  public login() {
    const data = {
      email: this.loginForm.controls.email.value!,
      password: this.loginForm.controls.password.value!,
    };

    this.authService.login(data).subscribe({
      next: (res) => {
        this.authService.loginSubject.next(true);
        this.authService.userSubject.next(res.data);

        // Add info into localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.data));

        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-base text-slate-300">' + res.message + '</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.store.dispatch(CartActions.getCart({ userId: res.data.id }));
            this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        const err_message = err.error.message;
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-base text-slate-300">' + err_message + '</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        });
      },
    });
  }

  public showHidePass() {
    this.isShowPass = !this.isShowPass;
    this.typePass = this.isShowPass === true ? 'text' : 'password';
  }
}
