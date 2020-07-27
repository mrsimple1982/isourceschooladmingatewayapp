import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IParent } from 'app/shared/model/isourceserviceapp/parent.model';

type EntityResponseType = HttpResponse<IParent>;
type EntityArrayResponseType = HttpResponse<IParent[]>;

@Injectable({ providedIn: 'root' })
export class ParentService {
  public resourceUrl = SERVER_API_URL + 'services/isourceserviceapp/api/parents';

  constructor(protected http: HttpClient) {}

  create(parent: IParent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(parent);
    return this.http
      .post<IParent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(parent: IParent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(parent);
    return this.http
      .put<IParent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(parent: IParent): IParent {
    const copy: IParent = Object.assign({}, parent, {
      dateOfBirth: parent.dateOfBirth && parent.dateOfBirth.isValid() ? parent.dateOfBirth.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfBirth = res.body.dateOfBirth ? moment(res.body.dateOfBirth) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((parent: IParent) => {
        parent.dateOfBirth = parent.dateOfBirth ? moment(parent.dateOfBirth) : undefined;
      });
    }
    return res;
  }
}
