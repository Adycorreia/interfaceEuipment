import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogRef, NbDialogService, NbToastrService } from "@nebular/theme";
import { AllEquipmentDetails } from "app/pages/models/allEquipamentDetails";
import { EquipamentoLista } from "app/pages/models/Equipamento";
import { EquipamentoListaService } from "app/services/EquipamentoLista.service";
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
    return this.isAdd() ? 'Novo cadastro' : 'Edição';
  }

  source: LocalDataSource = new LocalDataSource();
  loadingList: boolean = false;
  dialogRef: NbDialogRef<any>;


  tbDocData: EquipamentoLista[];
  tbEpuiConfig: Object;
  tbdocConfig: Object;
  userSelected: EquipamentoLista[];
  opcao1: boolean = false;
  docSelected: EquipamentoLista;
  ResponseAp: any;
  requesEquip: AllEquipmentDetails[];

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
    model: [null, Validators.required],
    name: [null, [Validators.required]],
    obs: [null]
  });



  opCap = [
    { selecionado: true, label: 'Click para escrever Observações' },
  ];
  ResponseAptest: void;

  constructor(private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private equipService: EquipamentoListaService,
    private toastrService: NbToastrService,
    private paramService: ParamService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getListByList(),
      this.setConfigTbEquip()

  }
  /*
   private setRouteReuse(): void {
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
 */

  getListByList() {

    this.equipService.getListEquipamento().subscribe(
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
  }

  private isAdd(): boolean {
    return !this.formSave.get('id').value;
  }

  public btnSave() {
    if (this.formSave.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.onSaveCarta();
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

  onSaveCarta() {

    this.equipService.create(this.findFormAdd()).subscribe((data) => {

      this.toastrService.success('Tarefa criada com sucesso.', 'Sucesso');
      this.dialogRef.close();
      // this.ng2TbCarta.source.refresh();
      this.getListByList();
    });

  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formSave.get('model').markAsTouched();
    this.formSave.get('name').markAsTouched();
    this.formSave.get('obs').markAsTouched();
    //this.formCarta.get('tipodoc').setValue("CARTA");

  }


  private findFormAdd() {

    const doc = this.formSave.value;
    return doc;
  }

  public openModalDoc(event: Row) {
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
    this.equipService.delete(this.docSelected.id).subscribe((res) => {
      //console.log(this.docSelected.iddoc);
      // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('Carta de Condução excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
      // this.ng2TbCarta.source.refresh();
      this.getListByList();
    });
  }


  public openModalEdiDoc(event: Row) {
    this.equipService.getListEquipamento().subscribe((res) => {
      /* this.userSelected = res.body;
       this.formCarta.reset();
       this.formCarta.get('tipodoc').patchValue(StatusEnum.CARTA);
 */
      if (event) {
        const equipamento: EquipamentoLista = event.getData();
        // console.log(documents);
        this.equipService.findById(equipamento.id).subscribe((res) => {
          //this.formCarta.patchValue(res.body);
          this.formSave.get('id').setValue(equipamento.id);
          this.formSave.get('name').setValue(equipamento.name);
          this.formSave.get('model').setValue(equipamento.model);

          this.formSave.get('obs').setValue(equipamento.obs);


        });
      }

      this.dialogRef = this.dialogService.open(this.dialogForm);
    });
  }

  /*
    public openModalEdit(event: Row) {
      this.docService.getListDocuments().subscribe((res) => {
        
        if (event) {
          this.findById(event);
        }
  
        this.dialogRef = this.dialogService.open(this.dialogCarta);
      });
    }
    
      public findById(event:Row){
  
        const documents: Documents = event.getData();
        console.log(documents);
        this.docService.findById(documents.iddoc).subscribe((res) => {
          //this.formCarta.patchValue(res.body);
          this.formCarta.get('iddoc').setValue(documents.iddoc);
          this.formCarta.get('n_carta').setValue(documents.n_carta);
          this.formCarta.get('condutor').setValue(documents.condutor);
          this.formCarta.get('motivo').setValue(documents.motivo);
          this.formCarta.get('data_apreensao').setValue(documents.data_apreensao);
          this.formCarta.get('tipodoc').setValue(documents.tipodoc);
          this.formCarta.get('obs').setValue(documents.obs);          
         
        });
  
      }
  */

  private editDoc() {
    this.equipService.edit(this.formSave.value).subscribe((res) => {
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


  private setConfigTbEquip() {
    this.tbEpuiConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, edit: false, delete: false, position: 'right' },

      noDataMessage: 'Nenhum Carta de Condução cadastrado.',
      columns: {
        name: {
          title: 'Nome Equipamento',
          type: "string",
          width: "13%",
        },
        model: {
          title: 'Modelo',
          type: "string",
          width: "25%",
          sort: true,
        },

        serialNumber: {
          title: 'Funcionario',
          type: "string",
          width: "25%",
        },
        processor: {
          title: 'Tipo',
          type: "string",
          width: "15%",
        },

        generation: {
          title: 'Sala',
          type: "string",
          width: "15%",
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