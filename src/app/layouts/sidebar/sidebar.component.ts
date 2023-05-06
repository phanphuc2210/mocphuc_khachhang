import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductType } from 'src/app/models/productType.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUrl!: string
  parentTypes!: ProductType[];
  childrenTypes!: ProductType[];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    this.productService.getProductTypes().subscribe(res => {
      this.parentTypes = res.filter(type => type.parentId === 0 && type.active === 1)
      this.childrenTypes = res.filter(type => type.parentId !== 0 && type.active === 1)
    })
  }

  getChildrenTypeByPRId(typeId: number): ProductType[] {
    return this.childrenTypes.filter(type => type.parentId === typeId)
  }
}
