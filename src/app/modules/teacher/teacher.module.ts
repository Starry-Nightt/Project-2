import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';

@NgModule({
  imports: [CommonModule, TeacherRoutingModule],
  declarations: [TeacherListComponent],
})
export class TeacherModule {}
