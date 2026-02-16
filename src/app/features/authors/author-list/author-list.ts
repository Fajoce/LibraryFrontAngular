import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthorService } from '../../../core/author-service';
import { Author } from '../../../models/author';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './author-list.html',
  styleUrl: './author-list.scss',
})
export class AuthorList {
private service = inject(AuthorService);
  private router = inject(Router);
private cdr = inject(ChangeDetectorRef);
  authors: Author[] = [];

ngOnInit() {
  this.getAllAuthors();
}

getAllAuthors(){
 this.service.getAll().subscribe(res => {
    this.authors = res.items;
    this.cdr.detectChanges();
  });  
}

  goToCreate(){
    this.router.navigate(['/authors/create']);
  }
}
