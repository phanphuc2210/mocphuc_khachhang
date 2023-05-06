import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Product } from 'src/app/models/product.model';
import { Wood } from 'src/app/models/wood.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { WoodService } from 'src/app/services/wood.service';
import * as CartAction from 'src/app/store/cartStore/cart.action';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @ViewChild('commentDiv') commentDiv!: ElementRef;
  @ViewChild('modalEl', {
    read: ElementRef,
    static: true,
  })
  modalEl!: ElementRef<HTMLDivElement>;

  items!: GalleryItem[];
  commentImages!: GalleryItem[];
  productId: string = '';
  productSlug: string = '';
  product!: Product;
  wood!: Wood;
  quantity: number = 1;
  commentList!: Comment[]
  amountComment = 0
  starTotal = 0

  sameProducts!: Product[];

  starLabel = [
    'Vui lòng đánh giá',
    'Rất không hài lòng',
    'Không hài lòng',
    'Bình thường',
    'Hài lòng',
    'Cực kì hài lòng',
  ];

  // Flowbite config
  modal!: ModalInterface;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'static',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  // config slider for same products
  slideConfig = { 
    slidesToShow: 4, 
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  constructor(
    private productService: ProductService,
    private woodService: WoodService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productSlug = params['slug'];
      this.productService
      .getProductBySlug(this.productSlug)
      .subscribe((res) => {
        this.product = res
        // tạo gallery ảnh
        this.items = this.product.image.map((i) => 
          new ImageItem({src: i, thumb: i})
        )
        // Get a lightbox gallery ref
        const lightboxRef = this.gallery.ref('lightbox');

        // Add custom gallery config to the lightbox (optional)
        lightboxRef.setConfig({
          imageSize: ImageSize.Contain,
          thumbPosition: ThumbnailsPosition.Top
        });

        // Load items into the lightbox gallery ref
        lightboxRef.load(this.items);

        // load comment
        this.commentService.getComments(this.product.id!).subscribe(res => {
          this.commentList = res
          this.starTotal = 0
          this.amountComment = res.length
          this.commentList.forEach(comment => {
            this.starTotal += comment.star
          })
          this.starTotal = Math.round(this.starTotal / this.amountComment)

          const commentImages: string[] = []
          this.commentList.forEach(c => {
            if(c.image) {
              commentImages.push(c.image)
            }
          })

          // gallery ảnh cho ảnh đánh giá của khách hàng
          this.commentImages = commentImages.map((i) => new ImageItem({src: i, thumb: i}))
          // Get a lightbox gallery ref
          const commentLightboxRef = this.gallery.ref('commentLightbox');
          // Add custom gallery config to the lightbox (optional)
          commentLightboxRef.setConfig({
            imageSize: ImageSize.Contain,
            thumbPosition: ThumbnailsPosition.Top
          });

          // Load items into the lightbox gallery ref
          commentLightboxRef.load(this.commentImages);
        })

        // get wood detail
        this.woodService.getWood(String(this.product.woodId)).subscribe(res => {
          this.wood = res
        })

        // get same product
        this.productService.getAllProducts(String(this.product.typeId)).subscribe(res => {
          this.sameProducts = res.filter(val => val.id !== this.product.id)
        })
      });
    });

    this.modal = new Modal(this.modalEl.nativeElement, this.modalOptions);
  }

  // Làm chức năng mua hàng cho khách lữ hành thì từ từ sửa lại
  public buyProduct(product: Product) {
    for(let i = 0; i < this.quantity; i++) {
      this.store.dispatch(CartAction.addProduct({ product }));
    }
    this.router.navigate(['/cart'])
  }

  public decrease() {
    if(this.quantity > 1) {
      this.quantity -= 1
    }
  }

  public increase() {
    if(this.quantity < this.product.quantity) {
      this.quantity += 1
    }
  }

  scrollTo() {
    this.commentDiv.nativeElement.scrollIntoView({ behavior: 'smooth' })
  }

  public showModal() {
    this.modal.show();
  }

  public hideModal() {
    this.modal.hide();
  }
}
