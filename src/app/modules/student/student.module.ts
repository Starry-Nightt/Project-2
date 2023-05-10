import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { SharedModule } from '@shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, StudentRoutingModule],
  declarations: [StudentListComponent],
})
export class StudentModule {}
