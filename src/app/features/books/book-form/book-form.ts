import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../core/book-service';
import { AuthorService } from '../../../core/author-service';
import { Author } from '../../../models/author';
import { CommonModule } from '@angular/common';
import { CreateBook } from '../../../shared/create-book';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule , ReactiveFormsModule ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm {
private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private router = inject(Router);
  

  authors: Author[] = [];

form = this.fb.group({
  title: this.fb.control<string>('', { nonNullable: true }),
  genre: this.fb.control<string>('', { nonNullable: true }),
  year: this.fb.control<number>(0, { nonNullable: true }),
  pages: this.fb.control<number>(0, { nonNullable: true }),
  authorId: this.fb.control<number>(1, [
  Validators.required,
  Validators.min(1)
])
});


  ngOnInit() {
    this.authorService.getAll().subscribe(res => this.authors = res.items);
  }



save() {

  if (this.form.invalid) return;

  const raw = this.form.getRawValue();

  const request: CreateBook = {
    ...raw,
    authorId: raw.authorId!
  };

  this.bookService.create(request).subscribe({
    next: () => {
      alert("Libro creado correctamente");
      this.router.navigate(['/books']);
    },
    error: (err: HttpErrorResponse) => {

      if (err.status === 400) {

        // Mensaje que viene del backend
        const backendMessage =
          err.error?.message ||
          err.error?.title ||
          "No es posible registrar el libro, se alcanzó el máximo permitido.";

        alert(backendMessage);
      }

      else {
        alert("Error inesperado");
      }
    }
  });
}
}



