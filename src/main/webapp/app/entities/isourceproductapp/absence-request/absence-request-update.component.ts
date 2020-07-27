import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAbsenceRequest, AbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';
import { AbsenceRequestService } from './absence-request.service';
import { IStudent } from 'app/shared/model/isourceproductapp/student.model';
import { StudentService } from 'app/entities/isourceproductapp/student/student.service';

@Component({
  selector: 'jhi-absence-request-update',
  templateUrl: './absence-request-update.component.html',
})
export class AbsenceRequestUpdateComponent implements OnInit {
  isSaving = false;
  students: IStudent[] = [];

  editForm = this.fb.group({
    id: [],
    absenceDate: [],
    reason: [],
    approvalStatus: [],
    student: [],
  });

  constructor(
    protected absenceRequestService: AbsenceRequestService,
    protected studentService: StudentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ absenceRequest }) => {
      if (!absenceRequest.id) {
        const today = moment().startOf('day');
        absenceRequest.absenceDate = today;
      }

      this.updateForm(absenceRequest);

      this.studentService
        .query({ filter: 'absencerequest-is-null' })
        .pipe(
          map((res: HttpResponse<IStudent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IStudent[]) => {
          if (!absenceRequest.student || !absenceRequest.student.id) {
            this.students = resBody;
          } else {
            this.studentService
              .find(absenceRequest.student.id)
              .pipe(
                map((subRes: HttpResponse<IStudent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IStudent[]) => (this.students = concatRes));
          }
        });
    });
  }

  updateForm(absenceRequest: IAbsenceRequest): void {
    this.editForm.patchValue({
      id: absenceRequest.id,
      absenceDate: absenceRequest.absenceDate ? absenceRequest.absenceDate.format(DATE_TIME_FORMAT) : null,
      reason: absenceRequest.reason,
      approvalStatus: absenceRequest.approvalStatus,
      student: absenceRequest.student,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const absenceRequest = this.createFromForm();
    if (absenceRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.absenceRequestService.update(absenceRequest));
    } else {
      this.subscribeToSaveResponse(this.absenceRequestService.create(absenceRequest));
    }
  }

  private createFromForm(): IAbsenceRequest {
    return {
      ...new AbsenceRequest(),
      id: this.editForm.get(['id'])!.value,
      absenceDate: this.editForm.get(['absenceDate'])!.value
        ? moment(this.editForm.get(['absenceDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      reason: this.editForm.get(['reason'])!.value,
      approvalStatus: this.editForm.get(['approvalStatus'])!.value,
      student: this.editForm.get(['student'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAbsenceRequest>>): void {
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
