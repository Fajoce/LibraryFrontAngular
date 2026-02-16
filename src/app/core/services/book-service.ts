import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../../models/book';
import { CreateBook } from '../../shared/create-book';
import { PaginatedResponse } from '../../models/paginated-response';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/books`;

getAll() {
  return this.http.get<PaginatedResponse<Book>>(this.url);
}

  create(book: CreateBook): Observable<void> {
    return this.http.post<void>(this.url, book);
  }
}
