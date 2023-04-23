import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import * as CartAction from 'src/app/store/cartStore/cart.action';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @ViewChild('commentDiv') commentDiv!: ElementRef;

  items!: GalleryItem[];
  productId: string = '';
  product!: Product;
  quantity: number = 1;
  commentList!: Comment[]
  amountComment = 0
  starTotal = 0

  starLabel = [
    'Vui lòng đánh giá',
    'Rất không hài lòng',
    'Không hài lòng',
    'Bình thường',
    'Hài lòng',
    'Cực kì hài lòng',
  ];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productService
      .getProductById(this.productId)
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
      });
    this.commentService.getComments(this.productId).subscribe(res => {
      this.commentList = res
      this.amountComment = res.length
      this.commentList.forEach(comment => {
        this.starTotal += comment.star
      })
      this.starTotal = Math.round(this.starTotal / this.amountComment)
    })
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
}
