import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';
import { BusEventsService } from './bus-events.service';

@Component({
  templateUrl: './bus-events-delete-dialog.component.html',
})
export class BusEventsDeleteDialogComponent {
  busEvents?: IBusEvents;

  constructor(protected busEventsService: BusEventsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.busEventsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('busEventsListModification');
      this.activeModal.close();
    });
  }
}
