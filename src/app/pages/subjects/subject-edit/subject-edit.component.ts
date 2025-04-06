import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SubjectService } from '../../../services/subject.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subject-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {
  subjectForm!: FormGroup;
  subjectId!: number;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subjectId = +this.route.snapshot.paramMap.get('id')!;
    const subject = this.subjectService.getSubjectById(this.subjectId);

    if (!subject) {
      this.router.navigate(['/subjects']);
      return;
    }

    this.subjectForm = this.fb.group({
      name: [subject.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      class: [subject.class, [Validators.required, Validators.min(1), Validators.max(11)]],
      teacher: [subject.teacher, [Validators.required, Validators.minLength(2)]]
    });
  }

  updateSubject() {
    if (this.subjectForm.valid) {
      this.subjectService.updateSubject(this.subjectId, this.subjectForm.value);
      this.router.navigate(['/subjects']);
    }
  }
}
