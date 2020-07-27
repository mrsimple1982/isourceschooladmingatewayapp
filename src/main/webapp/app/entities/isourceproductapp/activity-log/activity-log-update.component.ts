import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IActivityLog, ActivityLog } from 'app/shared/model/isourceproductapp/activity-log.model';
import { ActivityLogService } from './activity-log.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-activity-log-update',
  templateUrl: './activity-log-update.component.html',
})
export class ActivityLogUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    activityType: [],
    activityDate: [],
    faculty: [],
    images: [],
    imagesContentType: [],
    comment: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected activityLogService: ActivityLogService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activityLog }) => {
      if (!activityLog.id) {
        const today = moment().startOf('day');
        activityLog.activityDate = today;
      }

      this.updateForm(activityLog);
    });
  }

  updateForm(activityLog: IActivityLog): void {
    this.editForm.patchValue({
      id: activityLog.id,
      activityType: activityLog.activityType,
      activityDate: activityLog.activityDate ? activityLog.activityDate.format(DATE_TIME_FORMAT) : null,
      faculty: activityLog.faculty,
      images: activityLog.images,
      imagesContentType: activityLog.imagesContentType,
      comment: activityLog.comment,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('isourceschooladmingatewayappApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const activityLog = this.createFromForm();
    if (activityLog.id !== undefined) {
      this.subscribeToSaveResponse(this.activityLogService.update(activityLog));
    } else {
      this.subscribeToSaveResponse(this.activityLogService.create(activityLog));
    }
  }

  private createFromForm(): IActivityLog {
    return {
      ...new ActivityLog(),
      id: this.editForm.get(['id'])!.value,
      activityType: this.editForm.get(['activityType'])!.value,
      activityDate: this.editForm.get(['activityDate'])!.value
        ? moment(this.editForm.get(['activityDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      faculty: this.editForm.get(['faculty'])!.value,
      imagesContentType: this.editForm.get(['imagesContentType'])!.value,
      images: this.editForm.get(['images'])!.value,
      comment: this.editForm.get(['comment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActivityLog>>): void {
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
