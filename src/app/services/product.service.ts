import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { ProductType } from '../models/productType.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private NODE_API = environment.apiURL

  constructor(private httpClient: HttpClient) { }

  public getProductTypes(): Observable<ProductType[]> {
    return this.httpClient.get<ProductType[]>(`${this.NODE_API}/types`);
  }

  public getChildrenType(parentId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}/types/children/${parentId}`);
  }

  public getTypeBySlug(slug: string): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}/types?slug=${slug}`);
  }

  public getProductById(id:string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.NODE_API}/products/${id}`);
  }

  public getProductByType(slug:string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.NODE_API}/products/list/${slug}`)
  }

  public getAllProducts(typeId?: string): Observable<Product[]> {
    const classify = typeId? `typeId=${typeId}` : '';
    return this.httpClient.get<Product[]>(`${this.NODE_API}/products?${classify}`);
  }

  public getProductsByQuantity(quantity: number): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}/products?limit=${quantity}`);
  }

  public search(searchText: any): Observable<any> {
    let search = searchText.split(' ').join('+')
    return this.httpClient.get<any>(`${this.NODE_API}/products?name=${search}`);
  }
}
