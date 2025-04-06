import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SubjectService } from '../../../services/subject.service'; // yol uyğunlaşdır
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.scss']
})
export class SubjectAddComponent {
  subjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private router: Router
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', [Validators.required, Validators.min(1),Validators.max(11)]],
      teacher: ['', Validators.required]
    });
  }

  addSubject() {
    if (this.subjectForm.valid) {
      const newSubject = this.subjectForm.value;
      this.subjectService.addSubject(newSubject);
      this.subjectForm.reset();
      this.router.navigate(['/subjects']);
    } else {
      this.subjectForm.markAllAsTouched();
    }
  }
}
