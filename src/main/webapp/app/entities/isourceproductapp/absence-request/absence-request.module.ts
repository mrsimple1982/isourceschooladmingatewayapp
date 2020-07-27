import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IsourceschooladmingatewayappSharedModule } from 'app/shared/shared.module';
import { AbsenceRequestComponent } from './absence-request.component';
import { AbsenceRequestDetailComponent } from './absence-request-detail.component';
import { AbsenceRequestUpdateComponent } from './absence-request-update.component';
import { AbsenceRequestDeleteDialogComponent } from './absence-request-delete-dialog.component';
import { absenceRequestRoute } from './absence-request.route';

@NgModule({
  imports: [IsourceschooladmingatewayappSharedModule, RouterModule.forChild(absenceRequestRoute)],
  declarations: [
    AbsenceRequestComponent,
    AbsenceRequestDetailComponent,
    AbsenceRequestUpdateComponent,
    AbsenceRequestDeleteDialogComponent,
  ],
  entryComponents: [AbsenceRequestDeleteDialogComponent],
})
export class IsourceproductappAbsenceRequestModule {}
