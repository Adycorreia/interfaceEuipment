import { NgModule } from '@angular/core';
import { NbAccordionModule, NbCardModule, NbCheckboxModule, NbStepperModule, NbToggleModule } from '@nebular/theme';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from 'app/@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EmployeeComponent } from './employee.component';
import { EquipamentoListaService } from 'app/services/EquipamentoLista.service';
import { ParamService } from 'app/services/parameterization.service';



@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbToggleModule,
    NbCheckboxModule,
    FormsModule,
    NbAccordionModule,
    NbStepperModule,
   
  ],
  declarations: [
    EmployeeComponent,
  ],
  providers: [EquipamentoListaService, ParamService],

})
export class equipamentoListaModule { }
