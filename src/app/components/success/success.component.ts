import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  currentUrl: string;
  queryParams: string;
  result!: {rspCode: string, orderId?: number,message: string};

  constructor(private paymentService: PaymentService, private location: Location) {
    this.currentUrl = this.location.path();
    this.queryParams = this.currentUrl.split('?')[1]
  }

  ngOnInit(): void {
    this.paymentService.vnpayIPN(this.queryParams).subscribe({
      next: res => {
        this.result = res
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
