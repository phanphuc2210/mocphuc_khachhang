import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductType } from '../models/productType.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private NODE_API = "http://localhost:8000/"

  constructor(private httpClient: HttpClient) { }

  public getProductTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}types`);
  }

  public getProductById(id:string): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}products/${id}`);
  }

  public getAllProducts(typeId?: string): Observable<any> {
    const classify = typeId? `typeId=${typeId}` : '';
    return this.httpClient.get<any>(`${this.NODE_API}products?${classify}`);
  }

  public getProductsByQuantity(quantity: number): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}products?limit=${quantity}`);
  }

  public search(searchText: any): Observable<any> {
    let search = searchText.split(' ').join('+')
    return this.httpClient.get<any>(`${this.NODE_API}products?name=${search}`);
  }
}
