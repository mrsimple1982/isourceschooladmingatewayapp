import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './isourceproductapp/dashboard/dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'student',
        loadChildren: () => import('./isourceproductapp/student/student.module').then(m => m.IsourceproductappStudentModule),
      },
      {
        path: 'student-events',
        loadChildren: () =>
          import('./isourceproductapp/student-events/student-events.module').then(m => m.IsourceproductappStudentEventsModule),
      },
      {
        path: 'parent',
        loadChildren: () => import('./isourceserviceapp/parent/parent.module').then(m => m.IsourceserviceappParentModule),
      },
      {
        path: 'activity-log',
        loadChildren: () => import('./isourceproductapp/activity-log/activity-log.module').then(m => m.IsourceproductappActivityLogModule),
      },
      {
        path: 'absence-request',
        loadChildren: () =>
          import('./isourceproductapp/absence-request/absence-request.module').then(m => m.IsourceproductappAbsenceRequestModule),
      },
      {
        path: 'pickup-request',
        loadChildren: () =>
          import('./isourceproductapp/pickup-request/pickup-request.module').then(m => m.IsourceproductappPickupRequestModule),
      },
      {
        path: 'bus-route',
        loadChildren: () => import('./isourceproductapp/bus-route/bus-route.module').then(m => m.IsourceproductappBusRouteModule),
      },
      {
        path: 'bus-events',
        loadChildren: () => import('./isourceproductapp/bus-events/bus-events.module').then(m => m.IsourceproductappBusEventsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class IsourceschooladmingatewayappEntityModule {}
