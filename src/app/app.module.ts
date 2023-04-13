import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DreamerComponent } from './components/dreamer/dreamer.component';
import { MaterialModule } from './material.module';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/profile/profile.component';
import { PlanetComponent } from './components/planet/planet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DreamerComponent,
    ProfileComponent,
    PlanetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthenticationGuard, AuthenticationService, UserService,
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
