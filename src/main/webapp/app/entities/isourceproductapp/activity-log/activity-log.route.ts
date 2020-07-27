import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IActivityLog, ActivityLog } from 'app/shared/model/isourceproductapp/activity-log.model';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogComponent } from './activity-log.component';
import { ActivityLogDetailComponent } from './activity-log-detail.component';
import { ActivityLogUpdateComponent } from './activity-log-update.component';

@Injectable({ providedIn: 'root' })
export class ActivityLogResolve implements Resolve<IActivityLog> {
  constructor(private service: ActivityLogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActivityLog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((activityLog: HttpResponse<ActivityLog>) => {
          if (activityLog.body) {
            return of(activityLog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ActivityLog());
  }
}

export const activityLogRoute: Routes = [
  {
    path: '',
    component: ActivityLogComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappActivityLog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ActivityLogDetailComponent,
    resolve: {
      activityLog: ActivityLogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappActivityLog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ActivityLogUpdateComponent,
    resolve: {
      activityLog: ActivityLogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappActivityLog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ActivityLogUpdateComponent,
    resolve: {
      activityLog: ActivityLogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappActivityLog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
