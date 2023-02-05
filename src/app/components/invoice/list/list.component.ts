import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  invoice!: Order[]

  constructor(private invoiceService: InvoiceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.invoiceService.getList(this.authService.userSubject.value.id).subscribe(res => {
      if(res.result) {
        this.invoice = res.result
      }
    })
  }
}
