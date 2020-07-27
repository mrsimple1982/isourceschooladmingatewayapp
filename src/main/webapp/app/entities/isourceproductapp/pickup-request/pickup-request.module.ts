import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IsourceschooladmingatewayappSharedModule } from 'app/shared/shared.module';
import { PickupRequestComponent } from './pickup-request.component';
import { PickupRequestDetailComponent } from './pickup-request-detail.component';
import { PickupRequestUpdateComponent } from './pickup-request-update.component';
import { PickupRequestDeleteDialogComponent } from './pickup-request-delete-dialog.component';
import { pickupRequestRoute } from './pickup-request.route';

@NgModule({
  imports: [IsourceschooladmingatewayappSharedModule, RouterModule.forChild(pickupRequestRoute)],
  declarations: [PickupRequestComponent, PickupRequestDetailComponent, PickupRequestUpdateComponent, PickupRequestDeleteDialogComponent],
  entryComponents: [PickupRequestDeleteDialogComponent],
})
export class IsourceproductappPickupRequestModule {}
