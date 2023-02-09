import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private NODE_API = "http://localhost:8000/"
  public loginSubject = new BehaviorSubject<boolean>(localStorage.getItem('token')? true : false)
  public userSubject = new BehaviorSubject(
    localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')!) : null
  )

  constructor(private httpClient: HttpClient) { }

  public register(data: User): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}auth/register`, data)
  }

  public login(data: {}): Observable<any> {
    return this.httpClient.post<any>(`${this.NODE_API}auth/login`, data)
  }

  public getUser(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.NODE_API}users/${id}`)
  }

  public updateUser(id: number, data: User): Observable<any> {
    return this.httpClient.put<any>(`${this.NODE_API}users/${id}`, data)
  }

  public changePassword(id: number, data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.NODE_API}users/${id}/change-password`, data)
  }

  public logOut(): void {
    localStorage.clear()
    this.loginSubject.next(false)
  }
}
