import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {
  studentForm!: FormGroup;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    const student = this.studentService.getStudentById(this.studentId);

    if (!student) {
      this.router.navigate(['/students']);
      return;
    }

    this.studentForm = this.fb.group({
      name: [student.name, [Validators.required, Validators.maxLength(30)]],
      surname: [student.surname, [Validators.required, Validators.maxLength(30)]],
      class: [student.class, [Validators.required, Validators.min(1), Validators.max(11)]]
    });
  }

  updateStudent() {
    if (this.studentForm.valid) {
      this.studentService.updateStudent(this.studentId, this.studentForm.value);
      this.router.navigate(['/students']);
    }
  }
}
