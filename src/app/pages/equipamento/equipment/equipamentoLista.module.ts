import { NgModule } from '@angular/core';
import { NbAccordionModule, NbCardModule, NbCheckboxModule, NbStepperModule,  NbToggleModule } from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from 'app/@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EquipamentoListaComponent } from './equipamentoLista.component';
import { ParamService } from 'app/services/parameterization.service';
import { EquipamentoListaService } from 'app/services/EquipamentoLista.service';
import { DataEquipmentSearchComponent } from './equipmentdetails/data-equipment-search.component';
import { LivingRoomService } from 'app/services/LivingRoom.service';
import { DepartmentService } from 'app/services/department';



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
    EquipamentoListaComponent,
    DataEquipmentSearchComponent,
  ],
  providers: [EquipamentoListaService, ParamService, LivingRoomService, DepartmentService],

})
export class EquipamentoListaModule { }


