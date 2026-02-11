import { Routes } from '@angular/router';
import { AuthorList } from './features/authors/author-list/author-list';
import { BookForm } from './features/books/book-form/book-form';
import { AuthorForm } from './features/authors/author-form/author-form';
import { BookList } from './features/books/book-list/book-list';

export const routes: Routes = [
    { path: 'authors', component: AuthorList },
  { path: 'authors/create', component: AuthorForm },
  { path: 'books', component: BookList },
  { path: 'books/create', component: BookForm }
];
