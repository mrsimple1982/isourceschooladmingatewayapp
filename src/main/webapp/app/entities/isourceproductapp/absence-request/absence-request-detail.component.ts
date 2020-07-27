import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';

@Component({
  selector: 'jhi-absence-request-detail',
  templateUrl: './absence-request-detail.component.html',
})
export class AbsenceRequestDetailComponent implements OnInit {
  absenceRequest: IAbsenceRequest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ absenceRequest }) => (this.absenceRequest = absenceRequest));
  }

  previousState(): void {
    window.history.back();
  }
}
