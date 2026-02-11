import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../core/book-service';
import { AuthorService } from '../../../core/author-service';
import { Author } from '../../../models/author';
import { CommonModule } from '@angular/common';
import { CreateBook } from '../../../shared/create-book';

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
    this.authorService.getAll().subscribe(res => this.authors = res);
  }

save() {
  console.log(this.form.value);
  console.log(this.form.valid);
  console.log(this.form.errors);
  if (this.form.invalid) return;

  const raw = this.form.getRawValue();

  const request: CreateBook = {
    ...raw,
    authorId: raw.authorId!   // <- non-null assertion
  };

  this.bookService.create(request).subscribe();
} 
}


