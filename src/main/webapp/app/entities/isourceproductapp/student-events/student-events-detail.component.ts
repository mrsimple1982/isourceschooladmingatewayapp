import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';

@Component({
  selector: 'jhi-student-events-detail',
  templateUrl: './student-events-detail.component.html',
})
export class StudentEventsDetailComponent implements OnInit {
  studentEvents: IStudentEvents | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studentEvents }) => (this.studentEvents = studentEvents));
  }

  previousState(): void {
    window.history.back();
  }
}
