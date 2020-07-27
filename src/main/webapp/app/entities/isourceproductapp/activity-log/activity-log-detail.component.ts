import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IActivityLog } from 'app/shared/model/isourceproductapp/activity-log.model';

@Component({
  selector: 'jhi-activity-log-detail',
  templateUrl: './activity-log-detail.component.html',
})
export class ActivityLogDetailComponent implements OnInit {
  activityLog: IActivityLog | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activityLog }) => (this.activityLog = activityLog));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
