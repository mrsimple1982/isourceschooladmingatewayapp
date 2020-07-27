import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IsourceschooladmingatewayappSharedModule } from 'app/shared/shared.module';

import { ConfigurationComponent } from './configuration.component';

import { configurationRoute } from './configuration.route';

@NgModule({
  imports: [IsourceschooladmingatewayappSharedModule, RouterModule.forChild([configurationRoute])],
  declarations: [ConfigurationComponent],
})
export class ConfigurationModule {}
