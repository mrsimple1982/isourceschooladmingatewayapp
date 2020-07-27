import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';

@Component({
  selector: 'jhi-bus-events-detail',
  templateUrl: './bus-events-detail.component.html',
})
export class BusEventsDetailComponent implements OnInit {
  busEvents: IBusEvents | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ busEvents }) => (this.busEvents = busEvents));
  }

  previousState(): void {
    window.history.back();
  }
}
