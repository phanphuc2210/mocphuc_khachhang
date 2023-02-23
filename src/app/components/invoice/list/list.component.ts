import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  invoice$!: Observable<Order[]>

  constructor(private invoiceService: InvoiceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.invoice$ =  this.invoiceService.getList(this.authService.userSubject.value.id)
  }
}
