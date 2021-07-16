import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { ForbiddenInterceptor } from './interceptors/forbidden.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/auth/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './views/sections/header/header.component';
import { FooterComponent } from './views/sections/footer/footer.component';
import { SidebarComponent } from './views/sections/sidebar/sidebar/sidebar.component';
import { SecurityComponent } from './views/sections/sidebar/modules/security/security.component';
import { CreatenewuserComponent } from './views/sections/sidebar/options/security/createnewuser/createnewuser.component';
import { EdituserComponent } from './views/sections/sidebar/options/security/edituser/edituser.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { NofoundComponent } from './views/nofound/nofound.component';
import { LogoutComponent } from './views/auth/logout/logout.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { SelectuserComponent } from './views/sections/sidebar/options/security/selectuser/selectuser.component';
import { ProductsComponent } from './views/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SecurityComponent,
    CreatenewuserComponent,
    EdituserComponent,
    NofoundComponent,
    LogoutComponent,
    RegisterComponent,
    SelectuserComponent,
    ProductsComponent,
  ],
  imports: [
    routing,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido',
          pattern: 'Caracteres no permitidos',
          email: 'Este campo debe ser un email'
        }
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ForbiddenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
