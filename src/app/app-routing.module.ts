import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './guards/auth/login/login.guard';
import { LogoutGuard } from './guards/auth/logout/logout.guard';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { NofoundComponent } from './views/nofound/nofound.component';
import { ProductsComponent } from './views/products/products.component';
import { CreatenewuserComponent } from './views/sections/sidebar/options/security/createnewuser/createnewuser.component';
import { EdituserComponent } from './views/sections/sidebar/options/security/edituser/edituser.component';
import { SelectuserComponent } from './views/sections/sidebar/options/security/selectuser/selectuser.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: '', component: HomeComponent, canActivate: [LogoutGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [LogoutGuard] },
  { path: 'create-new-user', component: CreatenewuserComponent, canActivate: [LogoutGuard] },
  { path: 'edit-user', component: SelectuserComponent, canActivate: [LogoutGuard] },
  { path: 'edit-user/:id', component: EdituserComponent, canActivate: [LogoutGuard] },
  { path: 'no-found', component: NofoundComponent, canActivate: [LogoutGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent]
