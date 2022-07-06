import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbAccordionModule, NbCardModule, NbCheckboxModule, NbStepperModule, NbToggleModule } from "@nebular/theme";
import { ThemeModule } from "app/@theme/theme.module";
import { ArmamentoService } from "app/services/armamento.service";
import { EfectivosService } from "app/services/efectivo.service";
import { FeriasService } from "app/services/ferias.service";
import {Ng2SmartTableModule } from "ng2-smart-table";
import { FeriasComponent } from "./ferias.component";



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
    FeriasComponent,
  ],
  providers: [FeriasService, EfectivosService],

})
export class feriasModule { }
