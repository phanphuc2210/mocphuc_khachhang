import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductType } from 'src/app/models/productType.model';
import { Wood } from 'src/app/models/wood.model';
import { ProductService } from 'src/app/services/product.service';
import { WoodService } from 'src/app/services/wood.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  slug = '';
  title = '';
  // types$!: Observable<ProductType[]>;
  // classify: string = '';

  // Lọc sản phẩm
  types!: ProductType[];
  woods!: Wood[];
  priceFromArr = [
    { value: '50000', price: '50.000' },
    { value: '100000', price: '100.000' },
    { value: '200000', price: '200.000' },
    { value: '300000', price: '300.000' },
    { value: '400000', price: '400.000' },
  ];
  priceToArr = [
    { value: '400000', price: '400.000' },
    { value: '500000', price: '500.000' },
    { value: '600000', price: '600.000' },
    { value: '700000', price: '700.000' },
    { value: '800000', price: '800.000' },
    { value: '900000', price: '900.000' },
    { value: '1000000', price: '1.000.000' },
    { value: '2000000', price: '2.000.000' },
  ];

  searchForm = this.fb.group({
    name: [''],
    type: [''],
    wood: [''],
    priceFrom: [''],
    priceTo: [''],
  });

  constructor(
    private productService: ProductService,
    private woodService: WoodService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.types$ = this.productService.getProductTypes()
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      if (this.slug === 'all') {
        this.title = 'Sản phẩm';
      } else {
        this.productService.getTypeBySlug(this.slug).subscribe((res) => {
          this.title = res[0].name;
        });
      }
      this.products$ = this.productService.getProductByType(this.slug);
    });

    this.productService.getProductTypes().subscribe((res) => {
      this.types = res.filter((val) => val.active === 1);
    });

    this.woodService.getWoodList().subscribe(res => {
      this.woods = res;
    })
    // this.products$ = this.productService.getAllProducts()
  }

  //phân loại sản phẩm
  // public productClassification() {
  //   this.products$ = this.productService.getAllProducts(this.classify)
  // }

  quantityChildren(typeId: number): number {
    let quantity = 0;
    this.types.forEach((type) => {
      if (type.parentId === typeId) {
        quantity++;
      }
    });

    return quantity;
  }

  // Lọc sản phẩm
  public searchProduct() {
    const name = this.searchForm.controls.name.value!;
    const type = this.searchForm.controls.type.value!;
    const wood = this.searchForm.controls.wood.value!;
    const priceFrom = this.searchForm.controls.priceFrom.value!;
    const priceTo = this.searchForm.controls.priceTo.value!;
    this.products$ = this.productService.searchProduct(
      name,
      type,
      wood,
      priceFrom,
      priceTo
    );
  }
}
