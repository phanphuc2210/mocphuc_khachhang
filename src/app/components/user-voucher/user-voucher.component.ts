import { Component, OnInit } from '@angular/core';
import { Voucher } from 'src/app/models/voucher.model';
import { AuthService } from 'src/app/services/auth.service';
import { VoucherService } from 'src/app/services/voucher.service';

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
}
