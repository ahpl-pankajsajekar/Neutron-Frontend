import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { SideNavbarComponent } from './_components/side-navbar/side-navbar.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './_components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavbarComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
