import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SubjectService, Subject } from '../../../services/subject.service';

@Component({
  selector: 'app-subject-list',
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
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent {
  displayedColumns: string[] = ['id', 'name', 'class', 'teacher', 'actions'];
  subjects: Subject[] = [];

  constructor(
    private subjectService: SubjectService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadSubjects();
  }
  loadSubjects(): void {
    this.subjects = this.subjectService.getSubjects();
  }
  deleteSubject(id: number): void {
    this.subjectService.deleteSubject(id);
    this.loadSubjects();
    if (this.cdRef) {
      this.cdRef.detectChanges();
    }
  }


}
