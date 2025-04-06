import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SubjectService, Subject } from '../../../services/subject.service';
import { StudentService, Student } from '../../../services/student.service';
import { ExamService } from '../../../services/exam.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-exam-add',
  standalone: true,
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
  templateUrl: './exam-add.component.html',
})
export class ExamAddComponent implements OnInit {
  private fb = inject(FormBuilder);
  private subjectService = inject(SubjectService);
  private studentService = inject(StudentService);
  private examService = inject(ExamService);
  private router = inject(Router);

  examForm!: FormGroup;

  allSubjects: Subject[] = [];
  allStudents: Student[] = [];

  availableSubjects: Subject[] = [];
  filteredStudents: Student[] = [];

  ngOnInit(): void {
    this.allSubjects = this.subjectService.getSubjects();
    this.allStudents = this.studentService.getStudents();

    this.availableSubjects = this.allSubjects.filter(subject =>
      this.allStudents.some(student => student.class === subject.class)
    );

    this.examForm = this.fb.group({
      subjectId: [null, Validators.required],
      studentId: [null, Validators.required],
      examDate: [null, [Validators.required, this.examDateValidator]],
      grade: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
    });

    this.examForm.get('subjectId')?.valueChanges.subscribe(id => {
      const selectedSubject = this.availableSubjects.find(s => s.id === id);
      if (selectedSubject) {
        this.filteredStudents = this.allStudents.filter(s => s.class === selectedSubject.class);
      } else {
        this.filteredStudents = [];
      }

      this.examForm.get('studentId')?.setValue(null);
    });
  }

  examDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    if (inputDate > today) {
      return { futureDate: true };
    }

    if (inputDate < oneMonthAgo) {
      return { tooOld: true };
    }

    return null;
  }

  submitExam() {
    if (this.examForm.invalid) return;

    const formValue = this.examForm.value;

    this.examService.addExam({
      subjectId: formValue.subjectId,
      studentId: formValue.studentId,
      examDate: new Date(formValue.examDate),
      grade: formValue.grade,
    });

    // ✅ İmtahan əlavə edildikdən sonra yönləndirmə
    this.router.navigate(['/exams']);
  }
}
