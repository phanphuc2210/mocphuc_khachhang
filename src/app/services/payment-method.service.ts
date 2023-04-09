import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../models/paymentMethod.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private NODE_API = environment.apiURL
  private endpoint = "payment-method"
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private http: HttpClient) { }

  public getList(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.API_URL}`)
  }
}
