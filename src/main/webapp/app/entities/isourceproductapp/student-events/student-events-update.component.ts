import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStudentEvents, StudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';
import { StudentEventsService } from './student-events.service';
import { IStudent } from 'app/shared/model/isourceproductapp/student.model';
import { StudentService } from 'app/entities/isourceproductapp/student/student.service';

@Component({
  selector: 'jhi-student-events-update',
  templateUrl: './student-events-update.component.html',
})
export class StudentEventsUpdateComponent implements OnInit {
  isSaving = false;
  students: IStudent[] = [];

  editForm = this.fb.group({
    id: [],
    eventType: [],
    eventDate: [],
    eventStatus: [],
    student: [],
  });

  constructor(
    protected studentEventsService: StudentEventsService,
    protected studentService: StudentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studentEvents }) => {
      if (!studentEvents.id) {
        const today = moment().startOf('day');
        studentEvents.eventDate = today;
      }

      this.updateForm(studentEvents);

      this.studentService.query().subscribe((res: HttpResponse<IStudent[]>) => (this.students = res.body || []));
    });
  }

  updateForm(studentEvents: IStudentEvents): void {
    this.editForm.patchValue({
      id: studentEvents.id,
      eventType: studentEvents.eventType,
      eventDate: studentEvents.eventDate ? studentEvents.eventDate.format(DATE_TIME_FORMAT) : null,
      eventStatus: studentEvents.eventStatus,
      student: studentEvents.student,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const studentEvents = this.createFromForm();
    if (studentEvents.id !== undefined) {
      this.subscribeToSaveResponse(this.studentEventsService.update(studentEvents));
    } else {
      this.subscribeToSaveResponse(this.studentEventsService.create(studentEvents));
    }
  }

  private createFromForm(): IStudentEvents {
    return {
      ...new StudentEvents(),
      id: this.editForm.get(['id'])!.value,
      eventType: this.editForm.get(['eventType'])!.value,
      eventDate: this.editForm.get(['eventDate'])!.value ? moment(this.editForm.get(['eventDate'])!.value, DATE_TIME_FORMAT) : undefined,
      eventStatus: this.editForm.get(['eventStatus'])!.value,
      student: this.editForm.get(['student'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentEvents>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IStudent): any {
    return item.id;
  }
}
