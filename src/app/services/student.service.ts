// student.service.ts
import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  surname: string;
  class: number;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'Ali', surname: 'Vəliyev', class: 10 },
    { id: 2, name: 'Ayşe', surname: 'Kərimova', class: 11 },
    { id: 3, name: 'Elvin', surname: 'Hüseynov', class: 9 },
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    const maxId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) : 0;
    this.students.push({ ...student, id: maxId + 1 });
  }

  deleteStudent(id: number): void {
    const index = this.students.findIndex(student => student.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }

  updateStudent(id: number, updatedStudent: any): void {
    const index = this.students.findIndex(s => s.id === id);
    if (index > -1) {
      this.students[index] = { id, ...updatedStudent };
    }
  }

  getStudentById(id: number) {
    return this.students.find(s => s.id === id);
  }

}
