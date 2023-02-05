import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Payment } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private NODE_API = "http://localhost:8000/cart"

  constructor(private http: HttpClient) { }

  public getCart(userId: number): Observable<{result: Product[]}> {
    return this.http.get<{result: Product[]}>(`${this.NODE_API}/${userId}`)
  }

  public addProduct(data: Cart): Observable<any> {
    return this.http.post<any>(`${this.NODE_API}`, data)
  }

  public decreaseProduct(data: Cart): Observable<any> {
    return this.http.delete<any>(`${this.NODE_API}/${data.userId}/${data.productId}`)
  }

  public removeProduct(data: Cart): Observable<any> {
    return this.http.delete<any>(`${this.NODE_API}/remove/${data.userId}/${data.productId}`)
  }

  public clearCart(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.NODE_API}/${userId}`)
  }

  public payment(data: Payment): Observable<any> {
    return this.http.post<any>(`${this.NODE_API}/payment`, data)
  }
}
