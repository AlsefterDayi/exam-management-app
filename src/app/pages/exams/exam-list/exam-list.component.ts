import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService, Exam } from '../../../services/exam.service';
import { SubjectService, Subject } from '../../../services/subject.service';
import { StudentService, Student } from '../../../services/student.service';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    MatToolbarModule
  ],
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'subject', 'student', 'date', 'grade', 'actions'];
  exams: Exam[] = [];
  subjects: Subject[] = [];
  students: Student[] = [];

  constructor(
    private examService: ExamService,
    private subjectService: SubjectService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.subjects = this.subjectService.getSubjects();
    this.students = this.studentService.getStudents();
    this.loadExams();
  }

  loadExams() {
    this.exams = this.examService.getExams();
  }

  getSubjectName(subjectId: number): string {
    const subject = this.subjects.find(s => s.id === subjectId);
    return subject ? subject.name : '–';
  }

  getStudentFullName(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? `${student.name} ${student.surname}` : '–';
  }

  deleteExam(id: number) {
    this.examService.deleteExam(id);
    this.loadExams();
  }
}
