import { NgModule } from '@angular/core';
import { NbAccordionModule, NbCardModule, NbCheckboxModule, NbStepperModule, NbToggleModule } from '@nebular/theme';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';



import { ThemeModule } from 'app/@theme/theme.module';

import { NbEvaIconsModule } from '@nebular/eva-icons';


import { EfectivosComponent } from './efectivos.component';
import { EfectivosService } from 'app/services/efectivo.service';
import { FeriasService } from 'app/services/ferias.service';


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
    EfectivosComponent,
  ],
  providers: [EfectivosService, FeriasService],

})
export class efectivosModule { }
