import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoRoutingModule } from './info-routing.module';
import { SharedModule } from '@shared/shared.module';
import { InfoComponent } from './pages/info/info.component';
import { InfoFormComponent } from './components/info-form/info-form.component';

@NgModule({
  imports: [CommonModule, InfoRoutingModule, SharedModule],
  declarations: [InfoComponent, InfoFormComponent],
})
export class InfoModule {}
