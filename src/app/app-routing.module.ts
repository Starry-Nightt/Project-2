import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@guards/admin-guard';
import { AuthGuard } from '@guards/auth-guard';
import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { StudentTeacherLayoutComponent } from '@layouts/student-teacher-layout/student-teacher-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'use',
    canActivate: [AuthGuard],
    component: StudentTeacherLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/demo/demo.module').then((m) => m.DemoModule),
      },
      {
        path: 'info',
        loadChildren: () =>
          import('./modules/info/info.module').then((m) => m.InfoModule),
      },
    ],
  },
  {
    path: 'manage',
    canActivate: [AdminGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'teacher',
        loadChildren: () =>
          import('./modules/teacher/teacher.module').then(
            (m) => m.TeacherModule
          ),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./modules/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
      {
        path: 'info',
        loadChildren: () =>
          import('./modules/info/info.module').then((m) => m.InfoModule),
      },
      {
        path: '',
        redirectTo: 'teacher',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
