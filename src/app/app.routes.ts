import { Routes } from '@angular/router';
import { SubjectListComponent } from './pages/subjects/subject-list/subject-list.component';
import { SubjectAddComponent } from './pages/subjects/subject-add/subject-add.component';
import { StudentsListComponent } from './pages/students/students-list/students-list.component';
import { StudentAddComponent } from './pages/students/student-add/student-add.component';
import { ExamListComponent } from './pages/exams/exam-list/exam-list.component';
import { ExamAddComponent } from './pages/exams/exam-add/exam-add.component';

export const routes: Routes = [
  {
    path: 'subjects',
    component: SubjectListComponent,
  },
  {
    path: 'subjects/add',
    component: SubjectAddComponent,
  },
  {
    path: 'subjects/edit/:id',
    loadComponent: () => import('./pages/subjects/subject-edit/subject-edit.component').then(m => m.SubjectEditComponent)
  },
  {
    path: 'students',
    component: StudentsListComponent,
  },
  {
    path: 'students/add',
    component: StudentAddComponent,
  },
  {
    path: 'students/edit/:id',
    loadComponent: () => import('./pages/students/student-edit/student-edit.component').then(m => m.StudentEditComponent)
  },
  {
    path: 'exams',
    component: ExamListComponent,
  },
  {
    path: 'exams/add',
    component: ExamAddComponent,
  },
  {
    path: 'exams/edit/:id',
    loadComponent: () => import('./pages/exams/exam-edit/exam-edit.component').then(m => m.ExamEditComponent)
  },
  {
    path: '',
    redirectTo: 'subjects',
    pathMatch: 'full',
  }
];
