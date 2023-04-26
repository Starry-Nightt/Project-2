import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpClientService } from '@services/app-http-client.service';
import { INTERCEPTORS } from '@interceptors';
import { AuthInterceptor } from '@interceptors/auth-interceptor';
import { LoaderInterceptor } from '@interceptors/loader-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [AppHttpClientService, ...INTERCEPTORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
