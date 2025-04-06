import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from './app/layout/main-layout/main-layout.component';
import { StudentsListComponent } from './app/pages/students/students-list/students-list.component';
import { StudentAddComponent } from './app/pages/students/student-add/student-add.component';
import { StudentEditComponent } from './app/pages/students/student-edit/student-edit.component';
import { SubjectListComponent } from './app/pages/subjects/subject-list/subject-list.component';
import { SubjectAddComponent } from './app/pages/subjects/subject-add/subject-add.component';
import { SubjectEditComponent } from './app/pages/subjects/subject-edit/subject-edit.component';
import { ExamListComponent } from './app/pages/exams/exam-list/exam-list.component';
import { ExamAddComponent } from './app/pages/exams/exam-add/exam-add.component';
import { ExamEditComponent } from './app/pages/exams/exam-edit/exam-edit.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    provideRouter([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          { path: 'students', component: StudentsListComponent },
          { path: 'students/add', component: StudentAddComponent },
          { path: 'students/edit/:id', component: StudentEditComponent },
          { path: 'subjects', component: SubjectListComponent },
          { path: 'subjects/add', component: SubjectAddComponent },
          { path: 'subjects/edit/:id', component: SubjectEditComponent },
          { path: 'exams', component: ExamListComponent },
          { path: 'exams/add', component: ExamAddComponent },
          { path: 'exams/edit/:id', component: ExamEditComponent },
          { path: '', redirectTo: 'subjects', pathMatch: 'full' }
        ]
      }
    ])
  ]
});
