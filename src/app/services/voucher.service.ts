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

  public getVoucher(userId: number): Observable<Voucher[]> {
    let query = ''
    if(userId) {
      query += `?userId=${userId}`
    }
    return this.http.get<Voucher[]>(`${this.API_URL}${query}`)
  }

  public getVoucherByUserId(userId: number): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.API_URL}/user/${userId}`)
  }

  public saveVoucher(data: {userId: number, voucherId: number}): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/save`, data)
  }

  public checkAllowApplyVoucher(userId: number, code: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/check-apply?userId=${userId}&code=${code}`)
  }
}
