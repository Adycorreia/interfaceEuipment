import {
  Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbStepperComponent, NbToastrService } from '@nebular/theme';
import { SexoEnum } from 'app/helpers/commons';
import { Efectivos } from 'app/pages/models/efectivos';
import { EfectivosService } from 'app/services/efectivo.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { emitWarning } from 'process';



@Component({
  selector: 'efectivos',
  styleUrls: ['efectivos.component.scss'],
  templateUrl: './efectivos.component.html',
})
export class EfectivosComponent implements OnInit {
    @ViewChild('ng2TbEfectivos') ng2TbEfectivos: Ng2SmartTableComponent;
    @ViewChild('dialogEfectivo') dialogEfectivo: TemplateRef<any>;
    @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

   firstForm: FormGroup;
   secondForm: FormGroup;
   thirdForm: FormGroup;
   firstFormCont: FormGroup;

   aria: boolean = true
   danger: boolean = false;

   close(){
    this.danger = false;
  }

  selectSexo =[
    { value: SexoEnum.M, sexo: "MASCULINO"},
    { value: SexoEnum.F, sexo: "FEMININO"},
    { value: SexoEnum.X, sexo: "INDETERMINADO"}
  ]

  tbEfectData: Efectivos[];
  tbEfectConfig: Object;
  tbdocConfig: Object;
  efectSelected: Efectivos;
  
  source: LocalDataSource = new LocalDataSource();

  dialogRef: NbDialogRef<any>;


  public get efectivoficoGroup(): FormGroup {
    return this.firstForm.get("nome") as FormGroup;
  }


  formEfectivo = this.formBuilder.group({
    nome: [null],
    apelido: [null],
    filiacao: [null],
    morada:  [null],
    data_nasc: [null],
    cni:[null],


  });


  constructor(private formBuilder: FormBuilder,  
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private efectivosService: EfectivosService,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
  ) {  }



  ngOnInit(): void { 
    this.getListefectivos();
   this.setConfigTbUser();
   this.formulario();
  }



  formulario(){
    this.firstForm = this.formBuilder.group({
      nome: [ "",
      [
        Validators.minLength(1),
        Validators.required,
        Validators.pattern("^[^0-9]+$"),
      ], 
    ],
      apelido: ["", [Validators.pattern("^[^0-9]+$"),  Validators.required,]],
      data_nasc: [ "",
      [
        Validators.required,
        Validators.pattern(
          "^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$"
        ),
      ],],
      filiacao: [null],
     
     
    });

    this.firstFormCont = this.formBuilder.group({
      nif: ['', Validators.required],
      morada: ['', Validators.required],
      sexo: ["", [Validators.pattern("^[^0-9]+$")]],
      cni: ['', Validators.required],
     
    });

    
  
    this.secondForm = this.formBuilder.group({
      id_pn: ['', Validators.required],
      posto: ["", [Validators.pattern("^[^0-9]+$")]],
      funcao:["", [Validators.pattern("^[^0-9]+$")]],
    });
  
    this.thirdForm = this.formBuilder.group({
      contacto: ['', Validators.required],
      email: [null],
      obs: [null],
    });
 }
  public openModalDoc(event: Row) {
   // this.formEfectivo.reset();
   /*
     if (event) {
       const user: User = event.getData();
       this.userService.findById(user._id).subscribe((res) => {
         this.formCarta.patchValue(res.body);
       });
     }*/
     
   this.dialogRef = this.dialogService.open(this.dialogEfectivo);
   }

   linearMode = true;

   toggleLinearMode() {
     this.linearMode = !this.linearMode;
   }
 
   onSaveCarta(){

    this.efectivosService.create(this.findFormAdd()).subscribe((data) => {
    
      this.toastrService.success('Tarefa criada com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.ng2TbCarta.source.refresh();
     this.getListefectivos();
    });
  }

  findFormAdd(){
  
   // this.validarEvent.emit(this.firstForm.value);
    //this.validarEvent.emit(this.secondForm.value);
    //this.validarEvent.emit(this.thirdForm.value);
    const resusaModel = <Efectivos> {
      nome: this.firstForm.value.nome, 
      apelido: this.firstForm.value.apelido, 
      data_nasc: this.firstForm.value.data_nasc, 
      filiacao: this.firstForm.value.filiacao, 
      nif: this.firstFormCont.value.nif, 
      morada: this.firstFormCont.value.morada,
      sexo: this.firstFormCont.value.sexo, 
      cni: this.firstFormCont.value.cni, 

      id_pn: this.secondForm.value.id_pn, 
      posto: this.secondForm.value.posto, 
      funcao: this.secondForm.value.funcao, 

      contacto: this.thirdForm.value.contacto,
      email: this.thirdForm.value.email, 
      obs: this.thirdForm.value.obs,  
    } 
    console.log(resusaModel);
    return resusaModel;
  }

  onFirstSubmit() {
   // this.firstForm.markAsDirty();
   this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
   this.firstForm.get('nome').markAsTouched();
   this.firstForm.get('apelido').markAsTouched();
   this.firstForm.get('data_nasc').markAsTouched();


  }

  onFirstContSubmit() {
    this.firstForm.markAsDirty();
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    //this.firstForm.get('nif').markAsTouched();
    //this.firstForm.get('morada').markAsTouched();
    //.firstForm.get('cni').markAsTouched();
  }

  onSecondSubmit() {
   this.secondForm.markAsDirty();
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
   // this.firstForm.get('id_pn').markAsTouched();
    //this.firstForm.get('posto').markAsTouched();
    //this.firstForm.get('funcao').markAsTouched();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    //this.firstForm.get('contacto').markAsTouched();
  
  }


  getListefectivos(){
    this.efectivosService.getListEfectivos().subscribe(
      (data: any) => {
        //this.organicList = data.details;
        this.source.load(data.details);
        console.log(data);
      },
      (err) => {}
    );
  }

  public openModalExclusion(event: Row) {

    this.efectSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.efectSelected.nome + this.efectSelected.apelido });

}


  public btnDelete() {
    this.efectivosService.delete(this.efectSelected.idagente).subscribe((res) => {
      //console.log(this.docSelected.iddoc);
     // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('Efectivo excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.ng2TbCarta.source.refresh();
      this.getListefectivos();
    });
  }


  idefecttest:String;

  public onEfectSelect($event){
    console.log($event);
    console.log($event.data.idagente);
    if ($event.data.idagente) {
      let idagente = $event.data.idagente;
    
      this.efectivosService.findById(idagente).subscribe(
        (data: any) => {
          console.log(data.details[0]);
          this.danger = true;
          this.idefecttest= data.details[0];
          console.log(this.idefecttest);
        }
      );
    }
  }


  private setConfigTbUser() {
    this.tbEfectConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum efectivo cadastrado.',
          columns: {

        id_pn: {
          title: 'Nº ID',
          type: "string",
          width: "15%",
        },
        nome: {
          title: 'Nome Completo dos efectivos',
          type: "string",
          width: "29%",
          valuePrepareFunction: (cell, row) => { return row.nome + " " + row.apelido }
        },
        posto: {
          title: 'Postos',
          type: "string",
          width: "11%",
          sort: true,
        },
      
        funcao: {
          title: 'Funções',
          type: "string",
          width: "18%",
        },
        contacto: {
          title: 'Contactos',
          type: "string",
          width: "11%",
        },
        
        morada: {
          title: 'Moradas',
          type: "string",
          width: "21%",
        },
     
      
      },
    };
  }

}
