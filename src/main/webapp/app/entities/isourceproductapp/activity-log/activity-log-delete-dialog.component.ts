import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IActivityLog } from 'app/shared/model/isourceproductapp/activity-log.model';
import { ActivityLogService } from './activity-log.service';

@Component({
  templateUrl: './activity-log-delete-dialog.component.html',
})
export class ActivityLogDeleteDialogComponent {
  activityLog?: IActivityLog;

  constructor(
    protected activityLogService: ActivityLogService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.activityLogService.delete(id).subscribe(() => {
      this.eventManager.broadcast('activityLogListModification');
      this.activeModal.close();
    });
  }
}
