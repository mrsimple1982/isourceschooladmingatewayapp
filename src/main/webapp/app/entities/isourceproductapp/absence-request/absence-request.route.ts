import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAbsenceRequest, AbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';
import { AbsenceRequestService } from './absence-request.service';
import { AbsenceRequestComponent } from './absence-request.component';
import { AbsenceRequestDetailComponent } from './absence-request-detail.component';
import { AbsenceRequestUpdateComponent } from './absence-request-update.component';

@Injectable({ providedIn: 'root' })
export class AbsenceRequestResolve implements Resolve<IAbsenceRequest> {
  constructor(private service: AbsenceRequestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAbsenceRequest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((absenceRequest: HttpResponse<AbsenceRequest>) => {
          if (absenceRequest.body) {
            return of(absenceRequest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AbsenceRequest());
  }
}

export const absenceRequestRoute: Routes = [
  {
    path: '',
    component: AbsenceRequestComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappAbsenceRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AbsenceRequestDetailComponent,
    resolve: {
      absenceRequest: AbsenceRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappAbsenceRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AbsenceRequestUpdateComponent,
    resolve: {
      absenceRequest: AbsenceRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappAbsenceRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AbsenceRequestUpdateComponent,
    resolve: {
      absenceRequest: AbsenceRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappAbsenceRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
