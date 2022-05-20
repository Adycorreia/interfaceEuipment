import { NgModule } from '@angular/core';
import { NbCardModule, NbCheckboxModule, NbToggleModule } from '@nebular/theme';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';



import { ThemeModule } from 'app/@theme/theme.module';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DocService } from 'app/services/doc.service';
import { EfectivosComponent } from './efectivos.component';


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
  ],
  declarations: [
    EfectivosComponent,
  ],
  providers: [DocService],

})
export class efectivosModule { }
