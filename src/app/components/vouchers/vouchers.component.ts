import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, pluck } from 'rxjs';
import { Voucher } from 'src/app/models/voucher.model';
import { AuthService } from 'src/app/services/auth.service';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  voucherList!: Voucher[]
  voucherOfUser: number[] = []
  userId: number

  constructor(private voucherService: VoucherService, private authService: AuthService, private router: Router) {
    this.userId = this.authService.userSubject.getValue() ? this.authService.userSubject.getValue().id : null
  }

  ngOnInit(): void {
    this.voucherService.getVoucher(this.userId).subscribe(res => {
      this.voucherList = res
    })

    if(this.userId) {
      this.voucherService.getVoucherByUserId(this.userId).subscribe(res => {
        this.voucherOfUser = []
        res.forEach(voucher => {
          this.voucherOfUser.push(voucher.id!)
        })
      })
    }
  }

  saveVoucher(voucherId: number) {
    if(!this.authService.loginSubject.getValue()) {
      this.router.navigate(['/login'])
      return
    }

    let data: {userId: number, voucherId: number} = {
      userId: this.userId,
      voucherId: voucherId
    }

    this.voucherService.saveVoucher(data).subscribe({
      next: res => {
        Swal.fire({
          background: '#000',
          icon: 'success',
          title: '<p class="text-xl text-slate-300">Thêm Voucher mới thành công</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
        this.voucherService.getVoucherByUserId(this.userId).subscribe(res => {
          this.voucherOfUser = []
          res.forEach(voucher => {
            this.voucherOfUser.push(voucher.id!)
          })
        })
      },
      error: err => {
        Swal.fire({
          background: '#000',
          icon: 'error',
          title: '<p class="text-xl text-slate-300">'+ err.error.message +'</p>',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1a56db',
        })
      }
    })
  }
}
