import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBusEvents, BusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';
import { BusEventsService } from './bus-events.service';
import { IBusRoute } from 'app/shared/model/isourceproductapp/bus-route.model';
import { BusRouteService } from 'app/entities/isourceproductapp/bus-route/bus-route.service';

@Component({
  selector: 'jhi-bus-events-update',
  templateUrl: './bus-events-update.component.html',
})
export class BusEventsUpdateComponent implements OnInit {
  isSaving = false;
  busroutes: IBusRoute[] = [];

  editForm = this.fb.group({
    id: [],
    eventType: [],
    eventDate: [],
    eventStatus: [],
    busRoute: [],
  });

  constructor(
    protected busEventsService: BusEventsService,
    protected busRouteService: BusRouteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ busEvents }) => {
      if (!busEvents.id) {
        const today = moment().startOf('day');
        busEvents.eventDate = today;
      }

      this.updateForm(busEvents);

      this.busRouteService.query().subscribe((res: HttpResponse<IBusRoute[]>) => (this.busroutes = res.body || []));
    });
  }

  updateForm(busEvents: IBusEvents): void {
    this.editForm.patchValue({
      id: busEvents.id,
      eventType: busEvents.eventType,
      eventDate: busEvents.eventDate ? busEvents.eventDate.format(DATE_TIME_FORMAT) : null,
      eventStatus: busEvents.eventStatus,
      busRoute: busEvents.busRoute,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const busEvents = this.createFromForm();
    if (busEvents.id !== undefined) {
      this.subscribeToSaveResponse(this.busEventsService.update(busEvents));
    } else {
      this.subscribeToSaveResponse(this.busEventsService.create(busEvents));
    }
  }

  private createFromForm(): IBusEvents {
    return {
      ...new BusEvents(),
      id: this.editForm.get(['id'])!.value,
      eventType: this.editForm.get(['eventType'])!.value,
      eventDate: this.editForm.get(['eventDate'])!.value ? moment(this.editForm.get(['eventDate'])!.value, DATE_TIME_FORMAT) : undefined,
      eventStatus: this.editForm.get(['eventStatus'])!.value,
      busRoute: this.editForm.get(['busRoute'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusEvents>>): void {
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

  trackById(index: number, item: IBusRoute): any {
    return item.id;
  }
}
