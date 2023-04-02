import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Voucher } from '../models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private NODE_API = environment.apiURL
  private endpoint = "voucher"
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private http: HttpClient) { }

  public getVoucher(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.API_URL}?customer=true`)
  }

  public getVoucherByUserId(userId: number): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.API_URL}/user/${userId}`)
  }

  public saveVoucher(data: {userId: number, voucherId: number}): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/save`, data)
  }
}
