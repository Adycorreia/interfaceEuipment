import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbAccordionModule, NbCardModule, NbCheckboxModule, NbStepperModule, NbToggleModule } from "@nebular/theme";
import { ThemeModule } from "app/@theme/theme.module";
import { EfectivosService } from "app/services/efectivo.service";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ArmamentoComponent } from "./armamento.component";



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
    ArmamentoComponent,
  ],
  providers: [EfectivosService],

})
export class armamentoModule { }
