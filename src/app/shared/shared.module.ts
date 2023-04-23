import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import COMPONENTS from '@components';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [MaterialModule, CommonModule],
  exports: [MaterialModule, ...COMPONENTS, CommonModule],
})
export class SharedModule {}
