import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, TeacherRoutingModule, SharedModule],
  declarations: [TeacherListComponent],
})
export class TeacherModule {}
