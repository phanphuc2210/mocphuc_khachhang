import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, Order_Detail } from 'src/app/models/order.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  orderId!: string
  invoice_info!: Order
  invoice_details!: Order_Detail[]
  total_price: number = 0

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')!
    this.invoiceService.getDetail(Number(this.orderId)).subscribe(res => {
      if(res.result) {
        this.invoice_info = res.result.order
        this.invoice_details = res.result.order_details
        this.invoice_details.forEach(d => {
          this.total_price += d.price! * d.quantity
        })
        console.log('Invocie #' + this.orderId + ':', { invoice_info: this.invoice_info, invoice_details: this.invoice_details})
      }
    })
  }
}
