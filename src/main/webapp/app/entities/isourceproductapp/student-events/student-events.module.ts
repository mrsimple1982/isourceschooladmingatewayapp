import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IsourceschooladmingatewayappSharedModule } from 'app/shared/shared.module';
import { StudentEventsComponent } from './student-events.component';
import { StudentEventsDetailComponent } from './student-events-detail.component';
import { StudentEventsUpdateComponent } from './student-events-update.component';
import { StudentEventsDeleteDialogComponent } from './student-events-delete-dialog.component';
import { studentEventsRoute } from './student-events.route';

@NgModule({
  imports: [IsourceschooladmingatewayappSharedModule, RouterModule.forChild(studentEventsRoute)],
  declarations: [StudentEventsComponent, StudentEventsDetailComponent, StudentEventsUpdateComponent, StudentEventsDeleteDialogComponent],
  entryComponents: [StudentEventsDeleteDialogComponent],
})
export class IsourceproductappStudentEventsModule {}
