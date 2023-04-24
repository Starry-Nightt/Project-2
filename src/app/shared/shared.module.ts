import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import COMPONENTS from '@components';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  exports: [MaterialModule, ...COMPONENTS, CommonModule, ReactiveFormsModule],
})
export class SharedModule {}
