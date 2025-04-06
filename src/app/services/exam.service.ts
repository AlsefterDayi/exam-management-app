import { Injectable } from '@angular/core';

export interface Exam {
  id: number;
  subjectId: number;
  studentId: number;
  examDate: Date;
  grade: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private exams: Exam[] = [];

  getExams(): Exam[] {
    return this.exams;
  }

  getExamById(id: number): Exam | undefined {
    return this.exams.find(exam => exam.id === id);
  }

  addExam(exam: Omit<Exam, 'id'>): void {
    const newId = this.exams.length > 0 ? Math.max(...this.exams.map(e => e.id)) + 1 : 1;
    const newExam: Exam = { ...exam, id: newId };
    this.exams.push(newExam);
  }

  updateExam(id: number, updatedExam: Omit<Exam, 'id'>): void {
    const index = this.exams.findIndex(e => e.id === id);
    if (index !== -1) {
      this.exams[index] = { id, ...updatedExam };
    }
  }

  deleteExam(id: number): void {
    const index = this.exams.findIndex(e => e.id === id);
    if (index !== -1) {
      this.exams.splice(index, 1);
    }
  }
}
