import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/comment.model';
import { StatusService } from 'src/app/services/status.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { PaymentMethod } from 'src/app/models/paymentMethod.model';
import { Status } from 'src/app/models/status.model';
import { ProductService } from 'src/app/services/product.service';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import Swal from 'sweetalert2';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

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

  commentProducts$!: Observable<{id: number; name: string; image: string}[]>;

  // config slider for same products
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  // Flowbite config
  modal!: ModalInterface;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  // Comment Form
  commentForm!: FormGroup;
  productReview: any;
  errorComment!: string;

  starLabel = [
    'Vui lòng đánh giá',
    'Rất không hài lòng',
    'Không hài lòng',
    'Bình thường',
    'Hài lòng',
    'Cực kì hài lòng',
  ];

  constructor(
    private invoiceService: InvoiceService,
    private statusService: StatusService,
    private paymentService: PaymentMethodService,
    private productService: ProductService,
    private commentService: CommentService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      star: [0, Validators.required],
      message: ['', Validators.required],
    });

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
    this.commentProducts$ = this.productService.getProductNotComment(this.authService.userSubject.value.id)

    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
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

  public showCommentModal(productId: number) {
    // this.commentForm.controls['star'].setValue(0);
    // this.commentForm.controls['message'].setValue('');
    this.commentForm.controls['star'].setValue(0);
    this.commentForm.controls['message'].setValue('');
    this.commentProducts$.subscribe(res => {
      this.productReview  = res.find(p => p.id === productId)
    })
    this.modal.show();
  }

  public hideModal() {
    this.modal.hide();
    this.commentForm.reset();
    this.errorComment = '';
  }

  public submitReview() {
    if (this.commentForm.valid) {
      const data: Comment = {
        userId: this.authService.userSubject.value.id!,
        productId: this.productReview.id,
        star: this.commentForm.controls['star'].value,
        message: this.commentForm.controls['message'].value,
      };

  
      this.commentService.postComment(data).subscribe({
        next: res => {
          this.modal.hide();
          Swal.fire({
            background: '#000',
            icon: 'success',
            title: '<p class="text-xl text-slate-300">Đã thêm đánh giá thành công</p>',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#1a56db',
          })
          this.commentProducts$ = this.productService.getProductNotComment(this.authService.userSubject.value.id)
        },
        error: err => {
          this.modal.hide();
          Swal.fire({
            background: '#000',
            icon: 'error',
            title: '<p class="text-xl text-slate-300">'+ err.error.message +'</p>',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#1a56db',
          })
        }
      })
    } else {
      this.errorComment = 'Bạn cần đánh giá trước khi gửi.';
    }
  }
}
