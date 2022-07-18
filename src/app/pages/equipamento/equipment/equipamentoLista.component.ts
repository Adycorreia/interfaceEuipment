import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogRef, NbDialogService, NbToastrService } from "@nebular/theme";
import { AllEquipmentDetails } from "app/pages/models/allEquipamentDetails";
import { Department } from "app/pages/models/detailDepartament";
import { DetailsDomain } from "app/pages/models/detailDomain";
import { Employee } from "app/pages/models/detailEmployee";
import { EquipmentType } from "app/pages/models/detailEquipmentType";
import { LivingRoom } from "app/pages/models/detailRoom";
import { DetailsEquipment } from "app/pages/models/detailsEquipament";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { DepartmentService } from "app/services/department";
import { DomainService } from "app/services/domain.service";
import { EmployeeListService } from "app/services/Employee.service";
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
  requesLivings: LivingRoom[];
  requesListEq: DetailsEquipment[];
  requestype: EquipmentType[];
  requesDepar: Department[];
  dangerSmartTable: boolean = false;
  selfId: string = "0";
  requesListbrand: DetailsDomain[];
  requesListEmploye: Employee[];

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
    model: [null],
    name: [null],
    brand: [null],
    serialNumber:  [null],
    processor: [null],
    rom:  [null],
    ram:  [null],
    generation:	 [null],
    velocity:  [null],
    systemType:	 [null],
    dmStateEquip:  [null],
    screen: [null],
    idEquipmentType: [null],
    idLivingRoom: [null],
    idEmployee: [null],
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
    private employeeListService: EmployeeListService,
    private domainService: DomainService,
    private equipamentoTypeService: EquipamentoTypeService,
  
 
  ) { }

  ngOnInit(): void {
   // this.getListByEquipamento(),
     // this.setConfigTbEquip()
    this.getListSave();

  }
 
  public onEpuipIdSelect($event) {
    console.log($event);
   // console.log($event.data.id);
    if ($event.data.id) {
      let idEquip = $event.data.id;

      this.equipService.findById(idEquip).subscribe(
        (data: any) => {
         // console.log(data.details[0]);
          this.danger = true;
          this.requesEquip = data.details[0];
         // console.log(this.requesEquip);
        }
      );
    }
  }
  addNewRecolha(){
   // this.getListDetalis();
    this.dialogRef = this.dialogService.open(this.dialogEquip);
 
  }

  getListSave() {

    this.livingRoomService.getList().subscribe(
      (data: any) => {
        this.requesLivings = data.details[0];
          console.log(this.requesLivings);
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

    this.domainService.getListBySelfidAndDomain(this.selfId, "DM_BRAND").subscribe(
      (data: any) => {
        this.requesListbrand = data.details;
        console.log(this.requesListbrand);
      },
      (err) => { }
    );

    this.employeeListService.getListEmployee().subscribe(
      (data: any) => {
        this.requesListEmploye = data.details[0];
        console.log(data);
      },
      (err) => { }
    );
    
  }
 
  private findFormAdd() {

    //this.formArma.get('agente').setValue("1");
    const createEquipment = <EquipamentoLista> {
    
      id: this.formEquip.value.id,
      name: this.formEquip.value.name,
      brand: this.formEquip.value.brand,
      model: this.formEquip.value.model,
      serialNumber: this.formEquip.value.serialNumber,
      processor: this.formEquip.value.processor,
      rom: this.formEquip.value.rom,
      ram: this.formEquip.value.ram,
      generation: this.formEquip.value.generation,
      velocity: this.formEquip.value.velocity,
      systemType: this.formEquip.value.systemType,
      dmStateEquip: this.formEquip.value.dmStateEquip,
      screen: this.formEquip.value.screen,
      idEquipmentType: this.formEquip.value.idEquipmentType,
      idLivingRoom: this.formEquip.value.idLivingRoom,
      idEmployee: this.formEquip.value.idEmployee,
      obs: this.formEquip.value.obs,
  
    }

    return createEquipment;
  }

  onSaveCarta() {

    this.equipService.create(this.findFormAdd()).subscribe(
      (data: any) => {
        this.toastrService.success('Equipamento criada com sucesso.', 'Sucesso');
        this.dialogRef.close();
        this.requesLivings = data.details[0];
          console.log(this.requesLivings);
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