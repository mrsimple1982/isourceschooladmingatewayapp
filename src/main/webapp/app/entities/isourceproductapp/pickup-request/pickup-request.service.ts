import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';

type EntityResponseType = HttpResponse<IPickupRequest>;
type EntityArrayResponseType = HttpResponse<IPickupRequest[]>;

@Injectable({ providedIn: 'root' })
export class PickupRequestService {
  public resourceUrl = SERVER_API_URL + 'services/isourceproductapp/api/pickup-requests';

  constructor(protected http: HttpClient) {}

  create(pickupRequest: IPickupRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pickupRequest);
    return this.http
      .post<IPickupRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pickupRequest: IPickupRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pickupRequest);
    return this.http
      .put<IPickupRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPickupRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPickupRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(pickupRequest: IPickupRequest): IPickupRequest {
    const copy: IPickupRequest = Object.assign({}, pickupRequest, {
      pickupDate: pickupRequest.pickupDate && pickupRequest.pickupDate.isValid() ? pickupRequest.pickupDate.toJSON() : undefined,
      pickupTime: pickupRequest.pickupTime && pickupRequest.pickupTime.isValid() ? pickupRequest.pickupTime.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.pickupDate = res.body.pickupDate ? moment(res.body.pickupDate) : undefined;
      res.body.pickupTime = res.body.pickupTime ? moment(res.body.pickupTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pickupRequest: IPickupRequest) => {
        pickupRequest.pickupDate = pickupRequest.pickupDate ? moment(pickupRequest.pickupDate) : undefined;
        pickupRequest.pickupTime = pickupRequest.pickupTime ? moment(pickupRequest.pickupTime) : undefined;
      });
    }
    return res;
  }
}
