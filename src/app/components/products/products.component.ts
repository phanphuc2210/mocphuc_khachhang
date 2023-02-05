import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  types: ProductType[] = [];
  classify: string = ''; 

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productService.getProductTypes().subscribe(res => {
      this.types = res.result;
    })

    this.productService.getAllProducts().subscribe(res => {
      this.products = res.result;
    })
  }

  // phân loại sản phẩm
  public productClassification() { 
    this.productService.getAllProducts(this.classify).subscribe(res => {
      this.products = res.result;
    })
  }

}
