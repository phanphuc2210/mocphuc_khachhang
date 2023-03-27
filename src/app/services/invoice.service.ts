import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private NODE_API = environment.apiURL
  private endpoint = "invoice"
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private http: HttpClient) { }

  public getList(userId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/list/${userId}`)
  }

  public getDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${orderId}`)
  }

  public getListStatus(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/status/${orderId}`)
  }
}
