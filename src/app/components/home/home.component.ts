import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import * as AOS from 'aos';
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
  bestSeller$!: Observable<Product[]>
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
    autoplaySpeed: 3000,
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
    AOS.init()

    this.products$ = this.productService.getProductsByQuantity({quantity: 7, isNew: true})
    this.bestSeller$ = this.productService.getProductsByQuantity({quantity: 7, bestSeller: true})
    this.allProduct$ = this.productService.getProductByType('all')
    this.comments$ = this.commentService.getAll()
  }
}
