import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DefaultdModule } from './default/default.module';


import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DefaultdModule,
    //TaskModule,
  //  CartaModule,
   // TlivreteModule,
    NbIconModule,
    NbEvaIconsModule,
    ReactiveFormsModule,
    FormsModule,

    
    

  ],
  declarations: [
    PagesComponent,
   
  ],
})
export class PagesModule {
}
