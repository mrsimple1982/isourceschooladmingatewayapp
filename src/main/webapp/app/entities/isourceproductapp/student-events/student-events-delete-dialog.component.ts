import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';
import { StudentEventsService } from './student-events.service';

@Component({
  templateUrl: './student-events-delete-dialog.component.html',
})
export class StudentEventsDeleteDialogComponent {
  studentEvents?: IStudentEvents;

  constructor(
    protected studentEventsService: StudentEventsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studentEventsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('studentEventsListModification');
      this.activeModal.close();
    });
  }
}
