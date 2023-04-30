import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Wood } from '../models/wood.model';

@Injectable({
  providedIn: 'root'
})
export class WoodService {
  private NODE_API = environment.apiURL
  private endpoint = 'woods'
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private httpClient: HttpClient) { }

  public getWoodList(): Observable<Wood[]> {
    return this.httpClient.get<Wood[]>(`${this.API_URL}`)
  }

  public getWood(id: string): Observable<Wood> {
    return this.httpClient.get<Wood>(`${this.API_URL}/${id}`)
  }
}
