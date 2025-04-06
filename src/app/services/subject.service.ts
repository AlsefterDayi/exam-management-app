import { Injectable } from '@angular/core';

export interface Subject {
  id: number;
  name: string;
  class: number;
  teacher: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjects: Subject[] = [
    { id: 1, name: 'Riyaziyyat', class: 9, teacher: 'Şəmsəddin Əliyev' },
    { id: 2, name: 'Ədəbiyyat', class: 10, teacher: 'Əli Adamlı' },
    { id: 3, name: 'Həndəsə', class: 11, teacher: 'Səidə Auliyeva' },
  ];

  getSubjects() {
    return this.subjects;
  }

  addSubject(subject: Subject) {
    const maxId = this.subjects.length > 0
      ? Math.max(...this.subjects.map(s => s.id))
      : 0;
    this.subjects.push({ ...subject, id: maxId + 1 });
  }

  getSubjectById(id: number) {
    return this.subjects.find(s => s.id === id);
  }

  updateSubject(id: number, updatedSubject: any) {
    const index = this.subjects.findIndex(s => s.id === id);
    if (index > -1) {
      this.subjects[index] = { id, ...updatedSubject };
    }
  }
  deleteSubject(id: number): void {
    const index = this.subjects.findIndex(subject => subject.id === id);
    if (index !== -1) {
      this.subjects.splice(index, 1);
    }
  }
}
