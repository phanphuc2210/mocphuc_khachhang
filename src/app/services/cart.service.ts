import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.model';
import { Payment } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private NODE_API = environment.apiURL
  private endpoint = "cart"
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private http: HttpClient) { }

  public getCart(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/${userId}`)
  }

  public addProduct(data: Cart): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, data)
  }

  public decreaseProduct(data: Cart): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${data.userId}/${data.productId}`)
  }

  public removeProduct(data: Cart): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/remove/${data.userId}/${data.productId}`)
  }

  public clearCart(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${userId}`)
  }

  public payment(data: Payment): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/payment`, data)
  }
}
