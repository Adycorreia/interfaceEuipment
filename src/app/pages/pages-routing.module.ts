import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { DefaultComponent } from './default/default.component';
import { TaskComponent } from './task/task.component';

import { AprecartaComponent } from './apre-carta/apre-carta.component';
import { ApretlivreteComponent } from './apre-tlivrete/apre-tlivrete.component';

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
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
