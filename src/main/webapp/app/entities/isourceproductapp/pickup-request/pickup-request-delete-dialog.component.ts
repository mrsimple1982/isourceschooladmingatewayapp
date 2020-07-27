import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';
import { PickupRequestService } from './pickup-request.service';

@Component({
  templateUrl: './pickup-request-delete-dialog.component.html',
})
export class PickupRequestDeleteDialogComponent {
  pickupRequest?: IPickupRequest;

  constructor(
    protected pickupRequestService: PickupRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pickupRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pickupRequestListModification');
      this.activeModal.close();
    });
  }
}
