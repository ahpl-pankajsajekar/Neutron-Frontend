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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { SelfEmpanlementComponent } from './dc/self-empanlement/self-empanlement.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ThankYouComponent } from './dc/self-empanlement/thank-you/thank-you.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavbarComponent,
    NavbarComponent,
    FooterComponent,
    SelfEmpanlementComponent,
    ThankYouComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // self empanelment
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    NgMultiSelectDropDownModule,

    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
