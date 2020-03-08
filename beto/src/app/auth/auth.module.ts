import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material.module';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule {
  // para exportar serviços deste módulo - uso de métodos
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: AuthModule,
      providers: [
        AuthInterceptor
      ]
    }
  }
}
