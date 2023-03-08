import { Component, OnInit } from '@angular/core';
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
  items!: GalleryItem[];
  productId: string = '';
  product!: Product;
  quantity: number = 1;
  commentList!: Observable<Comment[]>

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
      });
    this.commentList = this.commentService.getComments(this.productId)
  }

  // Làm chức năng mua hàng cho khách lữ hành thì từ từ sửa lại
  public buyProduct(product: Product) {
    if(this.authService.userSubject.value) {
      for(let i = 0; i < this.quantity; i++) {
        this.store.dispatch(CartAction.addProduct({ product }));
      }
      this.router.navigate(['/cart'])
    } else {
      this.router.navigate(['/login'])
    }
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
}
