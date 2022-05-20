import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';


import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';



import { ThemeModule } from 'app/@theme/theme.module';
import { ApretlivreteComponent } from './apre-tlivrete.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DocService } from 'app/services/doc.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,

  ],
  declarations: [
    ApretlivreteComponent,
  ],
  providers: [DocService],

})
export class TlivreteModule { }
