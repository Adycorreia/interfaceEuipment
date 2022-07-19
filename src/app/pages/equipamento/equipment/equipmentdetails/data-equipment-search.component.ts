import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TreHelper } from "app/helpers/tre-helper";
import { AllEquipmentDetails } from "app/pages/models/allEquipamentDetails";
import { Department } from "app/pages/models/detailDepartament";
import { DetailsDomain } from "app/pages/models/detailDomain";
import { EquipmentType } from "app/pages/models/detailEquipmentType";
import { LivingRoom } from "app/pages/models/detailLivingRom";
import { DetailsEquipment } from "app/pages/models/detailsEquipament";


import { Equipmentsearch } from "app/pages/models/equipmentsearch";
import { DepartmentService } from "app/services/department";
import { DomainService } from "app/services/domain.service";
import { EquipamentoListaService } from "app/services/EquipamentoLista.service";
import { EquipamentoTypeService } from "app/services/EquipamentoType.service";
import { EquipmentdetailsService } from "app/services/equipmentdetails.service";
import { LivingRoomService } from "app/services/LivingRoom.service";
import { UserService } from "app/services/user.service";
import { Domain } from "domain";
import { LocalDataSource } from "ng2-smart-table";


@Component({
  selector: "data-equipment-search",
  templateUrl: "./data-equipment-search.component.html",
  styleUrls: ["./data-equipment-search.component.scss"],
})
export class DataEquipmentSearchComponent implements OnInit {

  showSmarttableList: boolean = false;
  showFromgnList: boolean = true;
  searchForm: FormGroup;
  organicaPedido: any;
  origens: any;
  rolePreAnalysis: boolean;
  roleCollect: boolean;
  codeOrganica: string;
  requesLiving: LivingRoom[];
  requesListEq: DetailsEquipment[];
  requestype: EquipmentType[];
  requesDepar: Department[];
  dangerSmartTable: boolean = false;
  selfId: string = "0";
  requesEquip: AllEquipmentDetails[];
  requesListbrand: DetailsDomain[];

  danger: boolean = false;

  @Output() DataEquipmentSearchFormEvent: EventEmitter<any> = new EventEmitter();
  @Output() loadingSearchEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private equipmentdetailsService: EquipmentdetailsService,
    private domainService: DomainService,
    private livingRoomService: LivingRoomService,
    private equipService: EquipamentoListaService,
    private equipamentoTypeService: EquipamentoTypeService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.loadSearchForm();
    this.getListDetalis();
   
  }

  close() {
    this.danger = false;
    this.dangerSmartTable = false;
    this.showFromgnList = true;
  }

  source: LocalDataSource = new LocalDataSource();
  loadingList: boolean = false;

  loadSearchForm() {
    this.searchForm = this.formBuilder.group({
      search: this.formBuilder.group({
        nameEquipment: [""],
        equipmentType: [""],
        nameEmployee: [""],
        room: [""],
        department: [""],
        brand: [""],
    
      }),
    });
  }

  clearSearch() {
    this.searchForm.reset();
  }

  onSearchFormSubmit() {
    this.loadingSearchEvent.emit(true);
    this.searchForm.markAsDirty();
    this.convertFormToModel();
  }
  public get searchGroup(): FormGroup {
    return this.searchForm.get("search") as FormGroup;
  }

  convertFormToModel() {
    var viewModelObject = <Equipmentsearch>{
      nameEquipment: this.searchGroup.get("nameEquipment").value,
      equipmentType: this.searchGroup.get("equipmentType").value,
      nameEmployee: this.searchGroup.get("nameEmployee").value,
      room: this.searchGroup.get("room").value,
      department: this.searchGroup.get("department").value,
      brand: this.searchGroup.get("brand").value,
  
    };
   
    
    TreHelper.removeProperty(viewModelObject);

    console.log(viewModelObject);

    this.searchPostFilter(viewModelObject);
  }

  searchPostFilter(viewModelObject: Equipmentsearch) {
    this.equipmentdetailsService
      .searchEquipment(viewModelObject)
      .subscribe((data: any) => {
        this.treatResultOfDataList(data);
        this.source.load(data.details[0]);
        this.showSmarttableList = true;
       
      });
  }

  private treatResultOfDataList(data: any) {
    if (data.status) {
      this.DataEquipmentSearchFormEvent.emit(data.details);
      this.loadingSearchEvent.emit(false);
     
    }
  }

  


  getListDetalis() {

    this.livingRoomService.getList().subscribe(
      (data: any) => {
        this.requesLiving = data.details[0];
         // console.log(this.requesLiving);
      },
      (err) => { }
    );

    this.equipamentoTypeService.findById("0").subscribe(
      (data: any) => {
          this.requestype = data.details;
         // console.log(this.requestype);
      },
      (err) => { }
    );

    this.departmentService.getListBySelfid(this.selfId).subscribe(
      (data: any) => {
        this.requesListEq = data.details;
       // console.log(data);
      },
      (err) => { }
    );

    this.domainService.getListBySelfidAndDomain(this.selfId, "DM_BRAND").subscribe(
      (data: any) => {
        this.requesListbrand = data.details;
       // console.log(data);
      },
      (err) => { }
    );

    
  }
 
  public onEpuipIdSelect($event) {
    console.log($event);
    console.log($event.data.id);
    if ($event.data.id) {
      let idEquip = $event.data.id;

      this.equipService.findById(idEquip).subscribe(
        (data: any) => {
         // console.log(data.details[0]);
          this.danger = true;
          this.showFromgnList= false
          this.requesEquip = data.details[0];
         // console.log(this.requesEquip);
        }
      );
    }
  }

    tbEpuiConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, edit: false, delete: false, position: 'right' },

      noDataMessage: 'Nenhum Carta de Condução cadastrado.',
      columns: {
        nameEquipment: {
          title: 'Nome',
          type: "string",
        
        },
        equipmentType: {
          title: 'Tipo',
          type: "string",
       
          sort: true,
        },

        brand: {
          title: 'Marca',
          type: "string",
          width: "12%",
        
        },
        department: {
          title: 'Direção/Departamento',
          type: "string",
          width: "25%",
         
        },

        room: {
          title: 'Sala',
          type: "string",
        
        },

        nameEmployee: {
          title: 'Funcionario',
          type: "string",
        
        },


      },
    };
  



}
