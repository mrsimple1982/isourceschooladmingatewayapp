import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActivityLog } from 'app/shared/model/isourceproductapp/activity-log.model';

type EntityResponseType = HttpResponse<IActivityLog>;
type EntityArrayResponseType = HttpResponse<IActivityLog[]>;

@Injectable({ providedIn: 'root' })
export class ActivityLogService {
  public resourceUrl = SERVER_API_URL + 'services/isourceproductapp/api/activity-logs';

  constructor(protected http: HttpClient) {}

  create(activityLog: IActivityLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(activityLog);
    return this.http
      .post<IActivityLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(activityLog: IActivityLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(activityLog);
    return this.http
      .put<IActivityLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IActivityLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IActivityLog[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(activityLog: IActivityLog): IActivityLog {
    const copy: IActivityLog = Object.assign({}, activityLog, {
      activityDate: activityLog.activityDate && activityLog.activityDate.isValid() ? activityLog.activityDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.activityDate = res.body.activityDate ? moment(res.body.activityDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((activityLog: IActivityLog) => {
        activityLog.activityDate = activityLog.activityDate ? moment(activityLog.activityDate) : undefined;
      });
    }
    return res;
  }
}
