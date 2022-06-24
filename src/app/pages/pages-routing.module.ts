import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { DefaultComponent } from './default/default.component';
import { TaskComponent } from './task/task.component';

import { AprecartaComponent } from './apreensão/apre-carta/apre-carta.component';
import { ApretlivreteComponent } from './apreensão/apre-tlivrete/apre-tlivrete.component';
import { AprecapComponent } from './apreensão/apre-cap/apre-cap.component';
import { EfectivosComponent } from './efectivos-transito/efectivos/efectivos.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      component: DefaultComponent,
    },
    {
      path: 'default',
      component: DefaultComponent,
    },
     {
      path: 'task',
      component: TaskComponent,
    },
    {
      path: 'apre-carta',
      component: AprecartaComponent,
    },

    {
      path: 'apre-tlivrete',
      component: ApretlivreteComponent,
    },
    {
      path: 'apre-cap',
      component: AprecapComponent,
    },

    {
      path: 'efectivos',
      component: EfectivosComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
