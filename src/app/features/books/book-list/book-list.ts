import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BookService } from '../../../core/book-service';
import { Router, RouterModule } from '@angular/router';
import { Book } from '../../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {
private service = inject(BookService);
  private cdr = inject(ChangeDetectorRef);
   private router = inject(Router);

  books: Book[] = [];

ngOnInit() {
this.getAllBooks();
}
getAllBooks(){
  this.service.getAll().subscribe(res => {
    this.books = res.items;
     this.cdr.detectChanges();
    console.log(this.books)
  });
}

  goToCreate() {
    this.router.navigate(['/books/create']);
  }
}
