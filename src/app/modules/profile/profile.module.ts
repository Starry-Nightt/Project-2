import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { InfoComponent } from './info/info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
  declarations: [InfoComponent, ChangePasswordComponent],
})
export class ProfileModule {}
