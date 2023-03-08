import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, Order_Detail } from 'src/app/models/order.model';
import { InvoiceService } from 'src/app/services/invoice.service';

import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  orderId!: string;
  invoice_info!: Order;
  invoice_details!: Order_Detail[];
  total_price: number = 0;

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
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private fb: FormBuilder,
    private commentService: CommentService,
    private authService: AuthService
  ) {
    this.commentForm = this.fb.group({
      star: [0, Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')!;
    this.invoiceService.getDetail(Number(this.orderId)).subscribe((res) => {
      this.invoice_info = res.order;
      this.invoice_details = res.order_details;
      this.invoice_details.forEach((d) => {
        this.total_price += d.price! * d.quantity;
      });
      console.log('Invocie #' + this.orderId + ':', {
        invoice_info: this.invoice_info,
        invoice_details: this.invoice_details,
      });
    });

    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  public showCommentModal(productId: number) {
    this.commentForm.controls['star'].setValue(0);
    this.commentForm.controls['message'].setValue('');
    this.productReview = this.invoice_details.find(
      (d) => d.productId === productId
    );
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
        userId: this.authService.userSubject.getValue().id,
        productId: this.productReview.productId,
        star: this.commentForm.controls['star'].value,
        message: this.commentForm.controls['message'].value,
      };

      this.commentService.postComment(data).subscribe({
        next: res => {
          console.log("Comment:",res)
          this.modal.hide();
        },
        error: err => {
          console.log("Comment error:", err)
        }
      })
    } else {
      this.errorComment = 'Bạn cần đánh giá trước khi gửi.';
    }
  }
}
