import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStudentEvents, StudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';
import { StudentEventsService } from './student-events.service';
import { StudentEventsComponent } from './student-events.component';
import { StudentEventsDetailComponent } from './student-events-detail.component';
import { StudentEventsUpdateComponent } from './student-events-update.component';

@Injectable({ providedIn: 'root' })
export class StudentEventsResolve implements Resolve<IStudentEvents> {
  constructor(private service: StudentEventsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStudentEvents> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((studentEvents: HttpResponse<StudentEvents>) => {
          if (studentEvents.body) {
            return of(studentEvents.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StudentEvents());
  }
}

export const studentEventsRoute: Routes = [
  {
    path: '',
    component: StudentEventsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappStudentEvents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StudentEventsDetailComponent,
    resolve: {
      studentEvents: StudentEventsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappStudentEvents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StudentEventsUpdateComponent,
    resolve: {
      studentEvents: StudentEventsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappStudentEvents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StudentEventsUpdateComponent,
    resolve: {
      studentEvents: StudentEventsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'isourceschooladmingatewayappApp.isourceproductappStudentEvents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
