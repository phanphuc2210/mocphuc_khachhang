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

  public vnpayIPN(params: string): Observable<any> {
    // const query = `vnp_Amount=${params['vnp_Amount']}&vnp_BankCode=${params['vnp_BankCode']}&vnp_BankTranNo=${params['vnp_BankTranNo']}&vnp_CardType=${params['vnp_CardType']}&vnp_OrderInfo=${params['vnp_OrderInfo']}&vnp_PayDate=${params['vnp_PayDate']}&vnp_ResponseCode=${params['vnp_ResponseCode']}&vnp_TmnCode=${params['vnp_TmnCode']}&vnp_TransactionNo=${params['vnp_TransactionNo']}&vnp_TxnRef=${params['vnp_TxnRef']}&vnp_SecureHashType=${params['vnp_SecureHashType']}&vnp_SecureHash=${params['vnp_SecureHash']}`
    return this.http.get<any>(`${this.API_URL}/vnpay-ipn?${params}`)
  }
}
