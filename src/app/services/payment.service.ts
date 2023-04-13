import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private NODE_API = environment.apiURL
  private endpoint = "payment"
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private http: HttpClient) { }

  public vnpayPayment(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/vnpay-payment`, data)
  }
}
