import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DefaultdModule } from './default/default.module';
import { TaskModule } from './task/task.module';
import { CartaModule } from './apre-carta/apre-carta.module';
import { TlivreteModule } from './apre-tlivrete/apre-tlivrete.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { efectivosModule } from './efectivos/efectivos.module';




@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DefaultdModule,
    TaskModule,
    CartaModule,
    TlivreteModule,
    efectivosModule,
    NbIconModule,
    NbEvaIconsModule,
    

  

  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
