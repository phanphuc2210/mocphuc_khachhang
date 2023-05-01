import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private NODE_API = environment.apiURL
  private endpoint = 'status'
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private httpClient: HttpClient) { }

  public getStatusList(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(`${this.API_URL}`)
  }
}
