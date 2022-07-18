import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogRef, NbDialogService, NbToastrService } from "@nebular/theme";
import { AllEquipmentDetails } from "app/pages/models/allEquipamentDetails";
import { Department } from "app/pages/models/detailDepartament";
import { DetailsDomain } from "app/pages/models/detailDomain";
import { EquipmentType } from "app/pages/models/detailEquipmentType";
import { LivingRoom } from "app/pages/models/detailRoom";
import { DetailsEquipment } from "app/pages/models/detailsEquipament";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { DepartmentService } from "app/services/department";
import { DomainService } from "app/services/domain.service";
import { EquipamentoListaService } from "app/services/EquipamentoLista.service";
import { EquipamentoTypeService } from "app/services/EquipamentoType.service";
import { EquipmentdetailsService } from "app/services/equipmentdetails.service";
import { LivingRoomService } from "app/services/LivingRoom.service";
import { ParamService } from "app/services/parameterization.service";
import { LocalDataSource, Ng2SmartTableComponent } from "ng2-smart-table";


@Component({
  selector: 'equipamento',
  styleUrls: ['equipamentoLista.component.scss'],
  templateUrl: './equipamentoLista.component.html',
})
export class EquipamentoListaComponent implements OnInit {
  @ViewChild('ng2TbEquip') ng2TbEquip: Ng2SmartTableComponent;
  @ViewChild('dialogEquip') dialogEquip: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  
  dialogRef: NbDialogRef<any>;


  tbDocData: EquipamentoLista[];
  tbEpuiConfig: Object;
  tbdocConfig: Object;
  userSelected: EquipamentoLista[];
  opcao1: boolean = false;
  docSelected: EquipamentoLista;
  ResponseAp: any;
  requesEquip: AllEquipmentDetails[];
  requesLiving: LivingRoom[];
  requesListEq: DetailsEquipment[];
  requestype: EquipmentType[];
  requesDepar: Department[];
  dangerSmartTable: boolean = false;
  selfId: string = "0";
  requesListbrand: DetailsDomain[];

  danger: boolean = false;

  /*
  selecttipodoc =[
    { value: StatusEnum.CARTA, tipodoc: "Carta de Condução"},
    { value: StatusEnum.CAP, tipodoc: "Carta de Condução e CAP"},
    { value: StatusEnum.LIVRETE, tipodoc: "Carteira de Aptidão Profissional [CAP]"}
  ]
 */
  formEquip = this.formBuilder.group({

    id: [null],
    model: [null, Validators.required],
    name: [null, [Validators.required]],
    obs: [null]
  });



  opCap = [
    { selecionado: true, label: 'Click para escrever Observações' },
  ];
 
  constructor(
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private equipService: EquipamentoListaService,
    private toastrService: NbToastrService,
    private paramService: ParamService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private livingRoomService: LivingRoomService,
    private departmentService: DepartmentService,
    private equipmentdetailsService: EquipmentdetailsService,
    private domainService: DomainService,
    private equipamentoTypeService: EquipamentoTypeService,
  
 
  ) { }

  ngOnInit(): void {
   // this.getListByEquipamento(),
     // this.setConfigTbEquip()
     this.getListDetalis()

  }
 


  
  public onEpuipIdSelect($event) {
    console.log($event);
    console.log($event.data.id);
    if ($event.data.id) {
      let idEquip = $event.data.id;

      this.equipService.findById(idEquip).subscribe(
        (data: any) => {
          console.log(data.details[0]);
          this.danger = true;
          this.requesEquip = data.details[0];
          console.log(this.requesEquip);
        }
      );
    }
  }
  addNewRecolha(){

    this.dialogRef = this.dialogService.open(this.dialogEquip);
  }

  getListDetalis() {

    this.livingRoomService.getList().subscribe(
      (data: any) => {
        this.requesLiving = data.details[0];
          console.log(this.requesLiving);
      },
      (err) => { }
    );

    this.equipamentoTypeService.findById("0").subscribe(
      (data: any) => {
        this.requestype = data.details;
          console.log(this.requestype);
      },
      (err) => { }
    );

    this.departmentService.getListBySelfid(this.selfId).subscribe(
      (data: any) => {
        this.requesListEq = data.details;
        console.log(data);
      },
      (err) => { }
    );

    this.domainService.getListBySelfidAndDomain(this.selfId, "DM_BRAND").subscribe(
      (data: any) => {
        this.requesListbrand = data.details;
        console.log(data);
      },
      (err) => { }
    );

    
  }
 


 /*
  public onEpuipIdSelect($event) {
    console.log($event);
    console.log($event.data.id);
    if ($event.data.id) {
      let idEquip = $event.data.id;

      this.equipService.findById(idEquip).subscribe(
        (data: any) => {
          console.log(data.details[0]);
          this.danger = true;
          this.requesEquip = data.details[0];
          console.log(this.requesEquip);
        }
      );
    }
  }
**/
 
}