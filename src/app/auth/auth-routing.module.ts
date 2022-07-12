import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbLoginComponent, NbRegisterComponent, NbLogoutComponent, NbRequestPasswordComponent, NbResetPasswordComponent, NbAuthComponent } from '@nebular/auth';
import { NgxLoginComponent } from './login/login.component';

export const routes: Routes = [
   
        {
          path: 'login',
          component: NgxLoginComponent,
        },
        {
          path: 'request-password',
          component: NbRequestPasswordComponent,
        },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}