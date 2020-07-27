import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';

@Component({
  selector: 'jhi-pickup-request-detail',
  templateUrl: './pickup-request-detail.component.html',
})
export class PickupRequestDetailComponent implements OnInit {
  pickupRequest: IPickupRequest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pickupRequest }) => (this.pickupRequest = pickupRequest));
  }

  previousState(): void {
    window.history.back();
  }
}
