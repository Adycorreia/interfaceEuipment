import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DefaultdModule } from './default/default.module';
import { TaskModule } from './task/task.module';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import { CartaModule } from './apreensão/apre-carta/apre-carta.module';
import { TlivreteModule } from './apreensão/apre-tlivrete/apre-tlivrete.module';
import { CapModule } from './apreensão/apre-cap/apre-cap.module';







@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DefaultdModule,
    TaskModule,
    CartaModule,
    TlivreteModule,
    NbIconModule,
    NbEvaIconsModule,
    CapModule,
    

  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
