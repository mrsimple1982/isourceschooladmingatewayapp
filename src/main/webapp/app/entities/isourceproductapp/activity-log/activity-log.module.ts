import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IsourceschooladmingatewayappSharedModule } from 'app/shared/shared.module';
import { ActivityLogComponent } from './activity-log.component';
import { ActivityLogDetailComponent } from './activity-log-detail.component';
import { ActivityLogUpdateComponent } from './activity-log-update.component';
import { ActivityLogDeleteDialogComponent } from './activity-log-delete-dialog.component';
import { activityLogRoute } from './activity-log.route';

@NgModule({
  imports: [IsourceschooladmingatewayappSharedModule, RouterModule.forChild(activityLogRoute)],
  declarations: [ActivityLogComponent, ActivityLogDetailComponent, ActivityLogUpdateComponent, ActivityLogDeleteDialogComponent],
  entryComponents: [ActivityLogDeleteDialogComponent],
})
export class IsourceproductappActivityLogModule {}
