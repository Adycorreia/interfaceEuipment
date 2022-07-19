import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { DefaultComponent } from './default/default.component';
import { TaskComponent } from './task/task.component';

import { EquipamentoListaComponent } from './equipamento/equipment/equipamentoLista.component';
import { EmployeeComponent } from './equipamento/employee/employee.component';
import { LivingRoomComponent } from './equipamento/livingRoom/livingRoom.component';



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
      path: 'equipamento',
      component: EquipamentoListaComponent,
    },

    {
      path: 'employee',
      component: EmployeeComponent,
    },

    {
      path: 'livingRoom',
      component: LivingRoomComponent,
    },
  
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
