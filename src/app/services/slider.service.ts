import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Slider } from '../models/slider.model';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private NODE_API = environment.apiURL
  private endpoint = 'slider'
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private httpClient: HttpClient) { }

  public getSliderList(): Observable<Slider[]> {
    return this.httpClient.get<Slider[]>(`${this.API_URL}?isCustomer=true`)
  }
}
