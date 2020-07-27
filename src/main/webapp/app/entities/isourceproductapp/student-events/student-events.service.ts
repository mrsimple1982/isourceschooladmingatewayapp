import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';

type EntityResponseType = HttpResponse<IStudentEvents>;
type EntityArrayResponseType = HttpResponse<IStudentEvents[]>;

@Injectable({ providedIn: 'root' })
export class StudentEventsService {
  public resourceUrl = SERVER_API_URL + 'services/isourceproductapp/api/student-events';

  constructor(protected http: HttpClient) {}

  create(studentEvents: IStudentEvents): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studentEvents);
    return this.http
      .post<IStudentEvents>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(studentEvents: IStudentEvents): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studentEvents);
    return this.http
      .put<IStudentEvents>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStudentEvents>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStudentEvents[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(studentEvents: IStudentEvents): IStudentEvents {
    const copy: IStudentEvents = Object.assign({}, studentEvents, {
      eventDate: studentEvents.eventDate && studentEvents.eventDate.isValid() ? studentEvents.eventDate.toJSON() : undefined,
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
      res.body.forEach((studentEvents: IStudentEvents) => {
        studentEvents.eventDate = studentEvents.eventDate ? moment(studentEvents.eventDate) : undefined;
      });
    }
    return res;
  }
}
