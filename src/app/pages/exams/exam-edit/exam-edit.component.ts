import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SubjectService, Subject } from '../../../services/subject.service';
import { StudentService, Student } from '../../../services/student.service';
import { ExamService } from '../../../services/exam.service';

// Material komponentləri
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-exam-edit',
  standalone: true,
  templateUrl: './exam-edit.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
  ],
})
export class ExamEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private examService = inject(ExamService);
  private subjectService = inject(SubjectService);
  private studentService = inject(StudentService);

  examForm!: FormGroup;
  examId!: number;

  allSubjects: Subject[] = [];
  allStudents: Student[] = [];
  availableSubjects: Subject[] = [];
  filteredStudents: Student[] = [];

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    const exam = this.examService.getExamById(this.examId);

    if (!exam) {
      this.router.navigate(['/exams']);
      return;
    }

    this.allSubjects = this.subjectService.getSubjects();
    this.allStudents = this.studentService.getStudents();

    this.availableSubjects = this.allSubjects.filter(subject =>
      this.allStudents.some(student => student.class === subject.class)
    );

    this.examForm = this.fb.group({
      subjectId: [exam.subjectId, Validators.required],
      studentId: [exam.studentId, Validators.required],
      examDate: [new Date(exam.examDate), [Validators.required, this.examDateValidator]],
      grade: [exam.grade, [Validators.required, Validators.min(0), Validators.max(5)]],
    });

    this.updateFilteredStudents(exam.subjectId);

    this.examForm.get('subjectId')?.valueChanges.subscribe(id => {
      this.updateFilteredStudents(id);
      this.examForm.get('studentId')?.setValue(null);
    });
  }

  updateFilteredStudents(subjectId: number): void {
    const selectedSubject = this.availableSubjects.find(s => s.id === subjectId);
    if (selectedSubject) {
      this.filteredStudents = this.allStudents.filter(s => s.class === selectedSubject.class);
    } else {
      this.filteredStudents = [];
    }
  }

  examDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    if (inputDate > today) return { futureDate: true };
    if (inputDate < oneMonthAgo) return { tooOld: true };
    return null;
  }

  updateExam(): void {
    if (this.examForm.invalid) return;

    const formValue = this.examForm.value;

    this.examService.updateExam(this.examId, {
      subjectId: formValue.subjectId,
      studentId: formValue.studentId,
      examDate: new Date(formValue.examDate),
      grade: formValue.grade,
    });

    this.router.navigate(['/exams']);
  }
}
