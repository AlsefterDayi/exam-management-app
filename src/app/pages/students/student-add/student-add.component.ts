import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      class: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
    });
  }

  addStudent() {
    if (this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      this.studentService.addStudent(newStudent);
      this.studentForm.reset();
      this.router.navigate(['/students']);
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
}
