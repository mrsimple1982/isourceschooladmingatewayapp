import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPickupRequest, PickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';
import { PickupRequestService } from './pickup-request.service';
import { PickupRequestComponent } from './pickup-request.component';
import { PickupRequestDetailComponent } from './pickup-request-detail.component';
import { PickupRequestUpdateComponent } from './pickup-request-update.component';

@Injectable({ providedIn: 'root' })
export class PickupRequestResolve implements Resolve<IPickupRequest> {
  constructor(private service: PickupRequestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPickupRequest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pickupRequest: HttpResponse<PickupRequest>) => {
          if (pickupRequest.body) {
            return of(pickupRequest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PickupRequest());
  }
}

export const pickupRequestRoute: Routes = [
  {
    path: '',
    component: PickupRequestComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappPickupRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PickupRequestDetailComponent,
    resolve: {
      pickupRequest: PickupRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappPickupRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PickupRequestUpdateComponent,
    resolve: {
      pickupRequest: PickupRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappPickupRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PickupRequestUpdateComponent,
    resolve: {
      pickupRequest: PickupRequestResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappPickupRequest.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
