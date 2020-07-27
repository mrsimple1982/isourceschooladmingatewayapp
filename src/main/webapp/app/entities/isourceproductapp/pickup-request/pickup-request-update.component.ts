import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPickupRequest, PickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';
import { PickupRequestService } from './pickup-request.service';
import { IStudent } from 'app/shared/model/isourceproductapp/student.model';
import { StudentService } from 'app/entities/isourceproductapp/student/student.service';

@Component({
  selector: 'jhi-pickup-request-update',
  templateUrl: './pickup-request-update.component.html',
})
export class PickupRequestUpdateComponent implements OnInit {
  isSaving = false;
  students: IStudent[] = [];

  editForm = this.fb.group({
    id: [],
    pickupDate: [],
    pickupTime: [],
    reason: [],
    approvalStatus: [],
    student: [],
  });

  constructor(
    protected pickupRequestService: PickupRequestService,
    protected studentService: StudentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pickupRequest }) => {
      if (!pickupRequest.id) {
        const today = moment().startOf('day');
        pickupRequest.pickupDate = today;
        pickupRequest.pickupTime = today;
      }

      this.updateForm(pickupRequest);

      this.studentService
        .query({ filter: 'pickuprequest-is-null' })
        .pipe(
          map((res: HttpResponse<IStudent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IStudent[]) => {
          if (!pickupRequest.student || !pickupRequest.student.id) {
            this.students = resBody;
          } else {
            this.studentService
              .find(pickupRequest.student.id)
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

  updateForm(pickupRequest: IPickupRequest): void {
    this.editForm.patchValue({
      id: pickupRequest.id,
      pickupDate: pickupRequest.pickupDate ? pickupRequest.pickupDate.format(DATE_TIME_FORMAT) : null,
      pickupTime: pickupRequest.pickupTime ? pickupRequest.pickupTime.format(DATE_TIME_FORMAT) : null,
      reason: pickupRequest.reason,
      approvalStatus: pickupRequest.approvalStatus,
      student: pickupRequest.student,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pickupRequest = this.createFromForm();
    if (pickupRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.pickupRequestService.update(pickupRequest));
    } else {
      this.subscribeToSaveResponse(this.pickupRequestService.create(pickupRequest));
    }
  }

  private createFromForm(): IPickupRequest {
    return {
      ...new PickupRequest(),
      id: this.editForm.get(['id'])!.value,
      pickupDate: this.editForm.get(['pickupDate'])!.value ? moment(this.editForm.get(['pickupDate'])!.value, DATE_TIME_FORMAT) : undefined,
      pickupTime: this.editForm.get(['pickupTime'])!.value ? moment(this.editForm.get(['pickupTime'])!.value, DATE_TIME_FORMAT) : undefined,
      reason: this.editForm.get(['reason'])!.value,
      approvalStatus: this.editForm.get(['approvalStatus'])!.value,
      student: this.editForm.get(['student'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPickupRequest>>): void {
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
