import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { CommentsHome } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products$!: Observable<Product[]>
  bestSeller!: Product[]
  allProduct$!: Observable<Product[]>
  comments$!: Observable<CommentsHome[]>

  // config slider for products
  slideProductConfig = { 
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

  slideCommentConfig = {
    slidesToShow: 4, 
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
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
  }

  constructor(private productService: ProductService, private commentService: CommentService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProductsByQuantity({quantity: 8, isNew: true})
    this.productService.getProductsByQuantity({quantity: 8, bestSeller: true}).subscribe(res => {
      this.bestSeller = []
      res.forEach((val:any) => {
        this.commentService.getComments(val.id).subscribe(res => {
          val['amountComment'] = res.length
          this.bestSeller.push(val)
        })
      })
    })
    this.allProduct$ = this.productService.getProductByType('all')
    this.comments$ = this.commentService.getAll()
  }
}
