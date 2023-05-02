import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comment, CommentsHome } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private NODE_API = environment.apiURL
  private endpoint = 'comments'
  private API_URL = `${this.NODE_API}/${this.endpoint}`

  constructor(private httpClient: HttpClient) { }

  public getComments(productId: number | string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.API_URL}/${productId}`)
  }

  public getAll(): Observable<CommentsHome[]> {
    return this.httpClient.get<CommentsHome[]>(`${this.API_URL}`)
  }

  public getSingleComment(userId: number | string, productId: number | string): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.API_URL}/${userId}/${productId}`)
  }

  public postComment(data: Comment): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, data)
  }

  public updateComment(data: Comment): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}`, data)
  }
}
