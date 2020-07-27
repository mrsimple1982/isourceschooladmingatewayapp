import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IParent, Parent } from 'app/shared/model/isourceserviceapp/parent.model';
import { ParentService } from './parent.service';

@Component({
  selector: 'jhi-parent-update',
  templateUrl: './parent-update.component.html',
})
export class ParentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    dateOfBirth: [],
    parentMobileNumber: [],
    parentEmail: [],
    approvalStatus: [],
    studentId: [],
  });

  constructor(protected parentService: ParentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parent }) => {
      if (!parent.id) {
        const today = moment().startOf('day');
        parent.dateOfBirth = today;
      }

      this.updateForm(parent);
    });
  }

  updateForm(parent: IParent): void {
    this.editForm.patchValue({
      id: parent.id,
      name: parent.name,
      dateOfBirth: parent.dateOfBirth ? parent.dateOfBirth.format(DATE_TIME_FORMAT) : null,
      parentMobileNumber: parent.parentMobileNumber,
      parentEmail: parent.parentEmail,
      approvalStatus: parent.approvalStatus,
      studentId: parent.studentId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parent = this.createFromForm();
    if (parent.id !== undefined) {
      this.subscribeToSaveResponse(this.parentService.update(parent));
    } else {
      this.subscribeToSaveResponse(this.parentService.create(parent));
    }
  }

  private createFromForm(): IParent {
    return {
      ...new Parent(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      dateOfBirth: this.editForm.get(['dateOfBirth'])!.value
        ? moment(this.editForm.get(['dateOfBirth'])!.value, DATE_TIME_FORMAT)
        : undefined,
      parentMobileNumber: this.editForm.get(['parentMobileNumber'])!.value,
      parentEmail: this.editForm.get(['parentEmail'])!.value,
      approvalStatus: this.editForm.get(['approvalStatus'])!.value,
      studentId: this.editForm.get(['studentId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParent>>): void {
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
}
