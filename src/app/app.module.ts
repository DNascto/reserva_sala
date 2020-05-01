import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginHttpInterceptor } from './pages/auth/interceptor/login-http-interceptor';
import { LoaderInterceptor } from './pages/auth/interceptor/loader.interceptor';

export let options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export function getToken(): string {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      }
    })

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoginHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    // { provide: ReservationService, useClass: ReservationService,  deps: [HttpClientModule]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
