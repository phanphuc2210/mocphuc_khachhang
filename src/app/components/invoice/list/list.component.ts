import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { StatusService } from 'src/app/services/status.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { PaymentMethod } from 'src/app/models/paymentMethod.model';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  invoice$!: Observable<Order[]>;
  payments$!: Observable<PaymentMethod[]>;
  status$!: Observable<Status[]>;
  p: number = 1;
  itemsPerPage: number = 5;

  // Lọc hóa đơn
  searchForm = this.fb.group({
    from: [''],
    to: [''],
    payment: [''],
    status: [''],
  });

  constructor(
    private invoiceService: InvoiceService,
    private statusService: StatusService,
    private paymentService: PaymentMethodService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.searchForm.get('to')?.valueChanges.subscribe(val => {
      if(val) {
        console.log(val)
        if (this.searchForm.get('from')?.value) {
          const to = new Date(val);
          const from = new Date(this.searchForm.get('from')?.value!);

          if (to < from) {
            
            this.searchForm.get('to')?.setErrors({toDateInvalid: true})
          }
        }
      }
    })

    this.searchForm.get('from')?.valueChanges.subscribe(val => {
      if(val) {
        if (this.searchForm.get('to')?.value) {
          const from = new Date(val);
          const to = new Date(this.searchForm.get('to')?.value!);

          if (from > to) {
            this.searchForm.get('from')?.setErrors({fromDateInvalid: true})
          }
        }
      }
    })
  }

  ngOnInit(): void {
    this.invoice$ = this.invoiceService.getList(
      this.authService.userSubject.value.id
    );
    this.payments$ = this.paymentService.getList();
    this.status$ = this.statusService.getStatusList();
  }

  // Lọc hóa đơn
  public searchInvoice() {
    const from = this.searchForm.controls.from.value!;
    const to = this.searchForm.controls.to.value!;
    const payment = this.searchForm.controls.payment.value!;
    const status = this.searchForm.controls.status.value!;
    this.invoice$ = this.invoiceService.getList(
      this.authService.userSubject.value.id, from, to, payment, status
    );
  }
}
