import { NgModule } from '@angular/core';
import { NbAccordionModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbInputModule, NbStepperModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';



import { ThemeModule } from 'app/@theme/theme.module';

import { NbEvaIconsModule } from '@nebular/eva-icons';


import { EfectivosComponent } from './efectivos.component';
import { EfectivosService } from 'app/services/efectivo.service';


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
    NbTabsetModule,
    NbInputModule,
 
   
  ],
  declarations: [
    EfectivosComponent,
  ],
  providers: [EfectivosService],

})
export class efectivosModule { }
