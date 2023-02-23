import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { debounceTime, fromEvent, Observable, of, pluck, timeout } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit{
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef
  products$!: Observable<Product[]>
  
  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        pluck('target', 'value'),
      )
      .subscribe(res => {
        console.log('searchInput:', res)
        this.products$ = this.productService.search(res)
      })
  }

  ngOnInit(): void {

  }
}


