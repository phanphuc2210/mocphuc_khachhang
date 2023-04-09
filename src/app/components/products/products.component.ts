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
  title = ''
  // types$!: Observable<ProductType[]>;
  // classify: string = ''; 

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.types$ = this.productService.getProductTypes()
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if(slug === 'all') {
        this.title = 'Sản phẩm'
      } else {
        this.productService.getTypeBySlug(slug).subscribe(res => {
          this.title = res[0].name
        })
      }
      this.products$ = this.productService.getProductByType(slug)
    });
    // this.products$ = this.productService.getAllProducts()
  }

  //phân loại sản phẩm
  // public productClassification() { 
  //   this.products$ = this.productService.getAllProducts(this.classify)
  // }

}
