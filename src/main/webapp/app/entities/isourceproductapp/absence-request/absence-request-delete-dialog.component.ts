import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';
import { AbsenceRequestService } from './absence-request.service';

@Component({
  templateUrl: './absence-request-delete-dialog.component.html',
})
export class AbsenceRequestDeleteDialogComponent {
  absenceRequest?: IAbsenceRequest;

  constructor(
    protected absenceRequestService: AbsenceRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.absenceRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast('absenceRequestListModification');
      this.activeModal.close();
    });
  }
}
