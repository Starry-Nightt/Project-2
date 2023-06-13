import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpClientService } from '@services/app-http-client.service';
import { INTERCEPTORS } from '@interceptors';
import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { StudentTeacherLayoutComponent } from '@layouts/student-teacher-layout/student-teacher-layout.component';
import { AdminHeaderComponent } from '@layouts/admin-header/admin-header.component';
import { StudentTeacherHeaderComponent } from '@layouts/student-teacher-header/student-teacher-header.component';
import { MatTableDataSource } from '@angular/material/table';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    StudentTeacherLayoutComponent,
    AdminHeaderComponent,
    StudentTeacherHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    GraphQLModule,
  ],
  providers: [AppHttpClientService, MatTableDataSource, ...INTERCEPTORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
