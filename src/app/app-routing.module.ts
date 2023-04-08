import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DreamerComponent } from './components/dreamer/dreamer.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'dreamer', component:DreamerComponent, canActivate:[AuthenticationGuard]},
  {path: 'profile', component:ProfileComponent, canActivate:[AuthenticationGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
