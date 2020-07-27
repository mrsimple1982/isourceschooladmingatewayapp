import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';

type EntityResponseType = HttpResponse<IAbsenceRequest>;
type EntityArrayResponseType = HttpResponse<IAbsenceRequest[]>;

@Injectable({ providedIn: 'root' })
export class AbsenceRequestService {
  public resourceUrl = SERVER_API_URL + 'services/isourceproductapp/api/absence-requests';

  constructor(protected http: HttpClient) {}

  create(absenceRequest: IAbsenceRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(absenceRequest);
    return this.http
      .post<IAbsenceRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(absenceRequest: IAbsenceRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(absenceRequest);
    return this.http
      .put<IAbsenceRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAbsenceRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAbsenceRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(absenceRequest: IAbsenceRequest): IAbsenceRequest {
    const copy: IAbsenceRequest = Object.assign({}, absenceRequest, {
      absenceDate: absenceRequest.absenceDate && absenceRequest.absenceDate.isValid() ? absenceRequest.absenceDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.absenceDate = res.body.absenceDate ? moment(res.body.absenceDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((absenceRequest: IAbsenceRequest) => {
        absenceRequest.absenceDate = absenceRequest.absenceDate ? moment(absenceRequest.absenceDate) : undefined;
      });
    }
    return res;
  }
}
