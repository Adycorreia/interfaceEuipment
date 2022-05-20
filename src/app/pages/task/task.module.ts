import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    TaskComponent,
  ],
  providers: [],

})
export class TaskModule { }
