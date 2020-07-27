import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IsourceschooladmingatewayappSharedModule } from 'app/shared/shared.module';
import { BusEventsComponent } from './bus-events.component';
import { BusEventsDetailComponent } from './bus-events-detail.component';
import { BusEventsUpdateComponent } from './bus-events-update.component';
import { BusEventsDeleteDialogComponent } from './bus-events-delete-dialog.component';
import { busEventsRoute } from './bus-events.route';

@NgModule({
  imports: [IsourceschooladmingatewayappSharedModule, RouterModule.forChild(busEventsRoute)],
  declarations: [BusEventsComponent, BusEventsDetailComponent, BusEventsUpdateComponent, BusEventsDeleteDialogComponent],
  entryComponents: [BusEventsDeleteDialogComponent],
})
export class IsourceproductappBusEventsModule {}
