import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    SigninPageComponent,
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule.forRoot(),
  ]
})
export class AuthModule { }
