import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DreamerComponent } from './components/dreamer/dreamer.component';
import { LoginComponent } from './components/login/login.component';
import { PlanetComponent } from './components/planet/planet.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { PlanetProfileComponent } from './components/planet-profile/planet-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'dreamer', component:DreamerComponent, canActivate:[AuthenticationGuard]},
  {path: 'planets', component:PlanetComponent, canActivate:[AuthenticationGuard]},
  {path: 'planets/:planet', component:PlanetProfileComponent, canActivate:[AuthenticationGuard], runGuardsAndResolvers: 'always'},
  {path: 'profile', component:ProfileComponent, canActivate:[AuthenticationGuard]},
  {path: 'cart', component:CartComponent, canActivate:[AuthenticationGuard]},
  {path: 'admin', component:AdminComponent, canActivate:[AuthenticationGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
