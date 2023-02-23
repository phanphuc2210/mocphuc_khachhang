import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  private user = this.authService.userSubject.value;
  userForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.compose([
      Validators.required, Validators.pattern(/^[0-9]{10}$/i)
    ])],
    address: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authService.getUser(this.user.id).subscribe(res => {
        console.log(res)
        this.userForm.controls['firstname'].setValue(res.firstname);
        this.userForm.controls['lastname'].setValue(res.lastname);
        this.userForm.controls['phone'].setValue(res.phone);
        this.userForm.controls['address'].setValue(res.address);
        this.userForm.controls['email'].setValue(res.email);
        this.userForm.controls['password'].setValue(res.password);
    })
  }

  public changeInfo() {
    const data: User = {
      firstname: this.userForm.controls.firstname.value!,
      lastname: this.userForm.controls.lastname.value!,
      phone: this.userForm.controls.phone.value!,
      address: this.userForm.controls.address.value!,
      email: this.userForm.controls.email.value!,
      password: this.userForm.controls.password.value!,
      role: this.authService.userSubject.value.role
    }

    this.authService.updateUser(this.user.id, data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })
         
        const userLS = {
          ...this.user,
          firstname: this.userForm.controls.firstname.value!
        }
        localStorage.setItem('user', JSON.stringify(userLS)) 
        this.authService.userSubject.next(userLS)
      },
      error: err => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">'+ err.error.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        })
      }
    })
  }
}
