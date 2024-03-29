import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogRef, NbDialogService, NbToastrService } from "@nebular/theme";
import { AllEquipmentDetails } from "app/pages/models/allEquipamentDetails";
import { DetailsDomain } from "app/pages/models/detailDomain";
import { Employee } from "app/pages/models/detailEmployee";
import { LivingRoom } from "app/pages/models/detailLivingRom";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { DomainService } from "app/services/domain.service";
import { EmployeeListService } from "app/services/Employee.service";
import { EquipamentoListaService } from "app/services/EquipamentoLista.service";
import { LivingRoomService } from "app/services/LivingRoom.service";
import { ParamService } from "app/services/parameterization.service";
import { LocalDataSource, Ng2SmartTableComponent } from "ng2-smart-table";
import { Row } from "ng2-smart-table/lib/lib/data-set/row";


@Component({
  selector: 'employee',
  styleUrls: ['employee.component.scss'],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  @ViewChild('ng2TbSmart') ng2TbSmart: Ng2SmartTableComponent;
  @ViewChild('dialogForm') dialogForm: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  public findOperation(): string {
    return this.isAdd() ? 'Cadastro de Novo' : 'Edição do';
  }

  source: LocalDataSource = new LocalDataSource();
  loadingList: boolean = false;
  dialogRef: NbDialogRef<any>;


  tbDocData: EquipamentoLista[];
  tbEmployeConfig: Object;
  tbdocConfig: Object;
  userSelected: EquipamentoLista[];
  opcao1: boolean = false;
  docSelected: EquipamentoLista;
  ResponseAp: any;
  requesEquip: AllEquipmentDetails[];
  selfId: string = "0";
  requesListbrand: DetailsDomain[];
  requesLivings: LivingRoom[];

  danger: boolean = false;
  /*
  selecttipodoc =[
    { value: StatusEnum.CARTA, tipodoc: "Carta de Condução"},
    { value: StatusEnum.CAP, tipodoc: "Carta de Condução e CAP"},
    { value: StatusEnum.LIVRETE, tipodoc: "Carteira de Aptidão Profissional [CAP]"}
  ]
 */
  formSave = this.formBuilder.group({

    id: [null],
    patent: [null, Validators.required],
    name: [null, [Validators.required]],
    function: [null, [Validators.required]],
    dmTypeUser: [null, [Validators.required]],
    idLivingRoom: [null, [Validators.required]],
  });



  constructor(private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private employeeListService: EmployeeListService,
    private livingRoomService: LivingRoomService,
    private toastrService: NbToastrService,
    private paramService: ParamService,
    private domainService: DomainService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getListByList(),
      this.setConfigTbEmploye()
  }
  /*
   private setRouteReuse(): void {
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
 */

  getListByList() {

    this.employeeListService.getListEmployee().subscribe(
      (data: any) => {
        this.source.load(data.details[0]);
        console.log(data);
      },
      (err) => {console.log(err);
          this.loadingList = true;
          this.paramService.ManageDataResponse(
            "Contacte o fornecedor do seu serviço ",
            "ERRO DE CONEXÃO",
            4000
          );
          this.loadingList = false; }
    );

    this.livingRoomService.getList().subscribe(
      (data: any) => {
        this.requesLivings = data.details[0];
          console.log(this.requesLivings);
      },
      (err) => {
        console.log(err);
        this.loadingList = true;
        this.paramService.ManageDataResponse(
          "Contacte o fornecedor do seu serviço ",
          "ERRO DE CONEXÃO",
          4000
        );
        this.loadingList = false;  
      }
    );

    this.domainService.getListBySelfidAndDomain(this.selfId, "DM_TIPO_USER").subscribe(
      (data: any) => {
        this.requesListbrand = data.details;
        console.log(this.requesListbrand);
      },
      (err) => {console.log(err);
        this.loadingList = true;
        this.paramService.ManageDataResponse(
          "Contacte o fornecedor do seu serviço ",
          "ERRO DE CONEXÃO",
          4000
        );
        this.loadingList = false;   }
    );
  }

  private isAdd(): boolean {
    return !this.formSave.get('id').value;
  }

  public btnSave() {
    if (this.formSave.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.onSave();
    else this.editDoc();
  }


  /*
    public btnSave() {
      if (this.formCarta.invalid) { 
        return this.setFormInvalid();  
  
      } else{ 
  
        this.onSaveCarta(); }
    }
  
  */

  onSave() {

    this.employeeListService.create(this.findFormAdd()).subscribe(
      (data: any) => {
        this.toastrService.success('Tarefa criada com sucesso.', 'Sucesso');
        this.dialogRef.close();
        // this.ng2TbCarta.source.refresh();
        this.getListByList();;
      },
      (err) => {
        console.log(err);
        this.loadingList = true;
        this.paramService.ManageDataResponse(
          "Contacte o fornecedor do seu serviço ",
          "ERRO DE CONEXÃO",
          4000
        );
        this.loadingList = false;  
      }
    );

    }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formSave.get('patent').markAsTouched();
    this.formSave.get('name').markAsTouched();
    this.formSave.get('function').markAsTouched();
    this.formSave.get('dmTypeUser').markAsTouched();
    this.formSave.get('idLivingRoom').markAsTouched();

    //this.formCarta.get('tipodoc').setValue("CARTA");

  }


  private findFormAdd() {

    this.formSave.get('id').setValue("0");
    const doc = this.formSave.value;
    return doc;
  }

  public openModalFrom(event: Row) {
    this.formSave.reset();
    /*
      if (event) {
        const user: User = event.getData();
        this.userService.findById(user._id).subscribe((res) => {
          this.formCarta.patchValue(res.body);
        });
      }*/

    this.dialogRef = this.dialogService.open(this.dialogForm);
  }

  public openModalExclusion(event: Row) {

    this.docSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.docSelected.name });

  }

  public btnDelete() {
    this.employeeListService.delete(this.docSelected.id).subscribe((res) => {
      //console.log(this.docSelected.iddoc);
      // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('Carta de Condução excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
      // this.ng2TbCarta.source.refresh();
      this.getListByList();
    });
  }


  public openModalEdit(event: Row) {
    this.employeeListService.getListEmployee().subscribe((res) => {
      /* this.userSelected = res.body;
       this.formCarta.reset();
       this.formCarta.get('tipodoc').patchValue(StatusEnum.CARTA);
 */  
      if (event) {
        const employee: Employee = event.getData();
        console.log(employee);
  
        this.employeeListService.findById(employee.id).subscribe((res) => {
          //this.formSave.patchValue(res.body);
          this.formSave.get('id').setValue(employee.id);
          this.formSave.get('dmTypeUser').setValue(employee.dmTypeUser);
          this.formSave.get('name').setValue(employee.name);
          this.formSave.get('patent').setValue(employee.patent);
          this.formSave.get('function').setValue(employee.function);
          this.formSave.get('idLivingRoom').setValue(employee.idLivingRoom);
         
        });
      }

      this.dialogRef = this.dialogService.open(this.dialogForm);
    });
  }

  private editDoc() {
    this.employeeListService.edit(this.formSave.value).subscribe((res) => {
      /* this.tbDocData = this.tbDocData.map((documents: Documents) => {
         if (documents.iddoc === this.formCarta.value.iddoc) 
         //return new Documents(res.body);
         return documents;
       });*/
      this.toastrService.success('Dados editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.getListByList();
    });
  }



  public onEpuipIdSelect($event) {
    console.log($event);
    console.log($event.data.id);
    if ($event.data.id) {
      let idEmploye = $event.data.id;

      this.employeeListService.findById(idEmploye).subscribe(
        (data: any) => {
          console.log(data.details[0]);
          this.danger = true;
          this.requesEquip = data.details[0];
          console.log(this.requesEquip);
        }
      );
    }
  }

 
 


  private setConfigTbEmploye() {
    this.tbEmployeConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, delete: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
     
      noDataMessage: 'Nenhum Funcionario cadastrado.',
      columns: {
        name: {
          title: 'Nome Completo',
          type: "string",
        },
        patent: {
          title: 'Posto',
          type: "string",
     
        },

        function: {
          title: 'Função',
          type: "string",
        
        },
        dmTypeUser: {
          title: 'Tipo',
          type: "string",
       
        },


      },
    };
  }


  /*
  private listadocuments(){
  
    this.tbUserData=[
      {
      id: 1,
      matricula: "ST-06-NG",
      condutor: "Adilson Correia",
      propriedade: "Sandra Helena",
      motivo: "Falta de Seguros Automovel",
      n_oficio: "Nº-1234",
      tipoestado: "CARTA",
      tipo: StatusEnum.CARTA,
       },
      {
        id: 2,
        matricula: "ST-06-NG",
        condutor: "Adilson Correia",
        propriedade: "Sandra Helena",
        motivo: "Falta de Seguros Automovel",
        n_oficio: "Nº-1234",
        tipo: StatusEnum.LIVRETE,
        tipoestado: "LIVRETE"
  
      
  
      },
      {
        id: 3,
        matricula: "ST-06-NG",
        condutor: "Adilson Correia",
        propriedade: "Sandra Helena",
        motivo: "Falta de Seguros Automovel",
        n_oficio: "Nº-1234",
        tipo: StatusEnum.CARTA,
        tipoestado: "CARTA"
     
  
      },
      {
        id: 4,
        matricula: "ST-06-NG",
        condutor: "Adilson Correia",
        propriedade: "Sandra Helena",
        motivo: "Falta de Seguros Automovel",
        n_oficio: "Nº-1234",
        tipo: StatusEnum.LIVRETE,
        tipoestado: "LIVRETE"
        
  
      },
      {
        id: 4,
        matricula: "ST-06-NG",
        condutor: "Adilson Correia",
        propriedade: "Sandra Helena",
        motivo: "Falta de Seguros Automovel",
        n_oficio: "Nº-1234",
        tipo: StatusEnum.CARTA,
        tipoestado: "CARTA"
  
      }
    
    
    ]
  
  console.log(this.tbUserData);
  
  
  }*/
}