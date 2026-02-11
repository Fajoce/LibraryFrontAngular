import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private http = inject(HttpClient);
  private url = 'https://localhost:7230/api/Authors';

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.url);
  }

  create(author: Author): Observable<void> {
    return this.http.post<void>(this.url, author);
  }
}


