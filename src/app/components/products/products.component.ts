import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products$!: Observable<Product[]>;
  types$!: Observable<ProductType[]>;
  classify: string = ''; 

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.types$ = this.productService.getProductTypes()

    this.products$ = this.productService.getAllProducts()
  }

  // phân loại sản phẩm
  public productClassification() { 
    this.products$ = this.productService.getAllProducts(this.classify)
  }

}
