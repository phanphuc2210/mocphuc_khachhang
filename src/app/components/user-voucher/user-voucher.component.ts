import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { AuthService } from 'src/app/services/auth.service';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-voucher',
  templateUrl: './user-voucher.component.html',
  styleUrls: ['./user-voucher.component.scss']
})
export class UserVoucherComponent implements OnInit {
  voucherList!: Voucher[]
  userId: number

  constructor(private voucherService: VoucherService, private authService: AuthService) {
    this.userId = this.authService.userSubject.getValue().id
  }

  ngOnInit(): void {
    this.voucherService.getVoucherByUserId(this.userId).subscribe(res => {
      this.voucherList = res
    })
  }

  removeVoucher(voucherId: number) {
    Swal.fire({
      title: '<p class="text-xl text-slate-300">Bạn thật sự muốn xóa voucher này?</p>',
      background: '#000',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      confirmButtonColor: '#c81e1e',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.voucherService.deleteVoucher(this.userId, voucherId).subscribe({
          next: res => {
            Swal.fire({
              background: '#000',
              icon: 'success',
              title: '<p class="text-xl text-slate-300">'+ res.message +'</p>',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#1a56db',
            })
            this.voucherService.getVoucherByUserId(this.userId).subscribe(res => {
              this.voucherList = res
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
    })
  }
}
