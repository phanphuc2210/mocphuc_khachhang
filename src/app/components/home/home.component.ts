import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';
import * as AOS from 'aos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products$!: Observable<Product[]>

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    AOS.init()

    this.products$ = this.productService.getProductsByQuantity(4)
  }
}
