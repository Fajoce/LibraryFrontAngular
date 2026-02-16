import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../../core/services/author-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './author-form.html',
  styleUrl: './author-form.scss',
})
export class AuthorForm {
authorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router
  ){
    this.authorForm = this.fb.group({
      fullName: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required]
    });
  }

  save(){
    if(this.authorForm.invalid) return;

    this.authorService.create(this.authorForm.value)
      .subscribe({
        next: () => this.router.navigate(['/authors']),
        error: err => console.error(err)
      });
  }

}
