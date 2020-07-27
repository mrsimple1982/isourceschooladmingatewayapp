import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';

type EntityResponseType = HttpResponse<IBusEvents>;
type EntityArrayResponseType = HttpResponse<IBusEvents[]>;

@Injectable({ providedIn: 'root' })
export class BusEventsService {
  public resourceUrl = SERVER_API_URL + 'services/isourceproductapp/api/bus-events';

  constructor(protected http: HttpClient) {}

  create(busEvents: IBusEvents): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(busEvents);
    return this.http
      .post<IBusEvents>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(busEvents: IBusEvents): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(busEvents);
    return this.http
      .put<IBusEvents>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBusEvents>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBusEvents[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(busEvents: IBusEvents): IBusEvents {
    const copy: IBusEvents = Object.assign({}, busEvents, {
      eventDate: busEvents.eventDate && busEvents.eventDate.isValid() ? busEvents.eventDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.eventDate = res.body.eventDate ? moment(res.body.eventDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((busEvents: IBusEvents) => {
        busEvents.eventDate = busEvents.eventDate ? moment(busEvents.eventDate) : undefined;
      });
    }
    return res;
  }
}
