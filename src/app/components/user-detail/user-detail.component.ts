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
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authService.getUser(this.user.id).subscribe(res => {
      if(res.result) {
        console.log(res.result[0])
        this.userForm = this.fb.group({
          firstname: [res.result[0].firstname, Validators.required],
          lastname: [res.result[0].lastname, Validators.required],
          phone: [res.result[0].phone, Validators.compose([
            Validators.required, Validators.pattern(/^[0-9]{10}$/i)
          ])],
          address: [res.result[0].address, Validators.required],
          email: [res.result[0].email, Validators.required],
          password: [res.result[0].password, Validators.required],
        })
      }
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
          title: '<p class="text-xl text-slate-300">Thay đổi thông tin thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0e9f6e',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            const userLS = {
              ...this.user,
              firstname: this.userForm.controls.firstname.value!
            }
            localStorage.setItem('user', JSON.stringify(userLS)) 
            this.authService.userSubject.next(userLS)
          }
        })
      },
      error: err => {
        alert('Something went wrong!')
      }
    })
  }
}
