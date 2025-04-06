import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StudentService, Student } from '../../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'class', 'actions'];
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.studentService.getStudents();
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
    this.loadStudents();
    if (this.cdRef) {
      this.cdRef.detectChanges();
    }
  }
}
