import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private NODE_API = "http://localhost:8000/invoice"

  constructor(private http: HttpClient) { }

  public getList(userId: number): Observable<any> {
    return this.http.get<any>(`${this.NODE_API}/list/${userId}`)
  }

  public getDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.NODE_API}/${orderId}`)
  }
}
