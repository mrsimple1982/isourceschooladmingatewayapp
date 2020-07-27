import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBusEvents, BusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';
import { BusEventsService } from './bus-events.service';
import { BusEventsComponent } from './bus-events.component';
import { BusEventsDetailComponent } from './bus-events-detail.component';
import { BusEventsUpdateComponent } from './bus-events-update.component';

@Injectable({ providedIn: 'root' })
export class BusEventsResolve implements Resolve<IBusEvents> {
  constructor(private service: BusEventsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBusEvents> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((busEvents: HttpResponse<BusEvents>) => {
          if (busEvents.body) {
            return of(busEvents.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BusEvents());
  }
}

export const busEventsRoute: Routes = [
  {
    path: '',
    component: BusEventsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappBusEvents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BusEventsDetailComponent,
    resolve: {
      busEvents: BusEventsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappBusEvents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BusEventsUpdateComponent,
    resolve: {
      busEvents: BusEventsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappBusEvents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BusEventsUpdateComponent,
    resolve: {
      busEvents: BusEventsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappBusEvents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
