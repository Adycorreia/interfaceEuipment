import {
  ChangeDetectionStrategy,
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



@Component({
  selector: 'efectivos',
  styleUrls: ['efectivos.component.scss'],
  templateUrl: './efectivos.component.html',
})
export class EfectivosComponent implements OnInit {
    @ViewChild('ng2TbEfectivos') ng2TbEfectivos: Ng2SmartTableComponent;
    @ViewChild('dialogEfectivo') dialogEfectivo: TemplateRef<any>;
    @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;




  danger: boolean = false;
    close(){
      this.danger = false;
    }

   firstForm: FormGroup;
   secondForm: FormGroup;
   thirdForm: FormGroup;

   aria: boolean = true

  tbEfectData: Efectivos[];
  tbEfectConfig: Object;
  tbdocConfig: Object;
  efectSelected: Efectivos;


  selectEXo =[
    { value: SexoEnum.F, tipsexo: "MASCULINO"},
    { value: SexoEnum.M, tipsexo: "FEMININO"},
    { value: SexoEnum.X, tipsexo: "INDETERMINADO"}
  ]
 

  
  source: LocalDataSource = new LocalDataSource();

  dialogRef: NbDialogRef<any>;


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
      nome: ['', Validators.required],
      apelido: ['', Validators.required],
      data_nasc: ['', Validators.required],
      filiacao: [null],
      nif: ['', Validators.required],
      morada: ['', Validators.required],
      sexo: ['', Validators.required],
      cni: ['', Validators.required],
      fotografia: [null],
      
     
    });
  
    this.secondForm = this.formBuilder.group({
      id_pn: ['', Validators.required],
      posto: ['', Validators.required],
      funcao: ['', Validators.required],
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
      nif: this.firstForm.value.nif, 
      morada: this.firstForm.value.morada,
      sexo: this.firstForm.value.sexo, 
      cni: this.firstForm.value.cni, 
      fotografia: this.firstForm.value.fotografia, 

      id_pn: this.secondForm.value.id_pn, 
      posto: this.secondForm.value.posto, 
      funcao: this.secondForm.value.funcao, 

      contacto: this.thirdForm.value.contacto,
      email: this.thirdForm.value.email, 
      obs: this.thirdForm.value.obs,  
    } 
    //console.log(resusaModel);
    return resusaModel;
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
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
      this.toastrService.success('Carta de Condução excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.ng2TbCarta.source.refresh();
      this.getListefectivos();
    });
  }


  idefecttest:String;

  public onUserSelect($event){
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
          title: 'Nome Completo',
          type: "string",
          width: "29%",
          valuePrepareFunction: (cell, row) => { return row.nome + " " + row.apelido }
        },
        posto: {
          title: 'Posto',
          type: "string",
          width: "11%",
          sort: true,
        },
      
        funcao: {
          title: 'Função',
          type: "string",
          width: "18%",
        },
        contacto: {
          title: 'Contacto',
          type: "string",
          width: "11%",
        },
        
        morada: {
          title: 'Morada',
          type: "string",
          width: "21%",
        },
     
      
      },
    };
  }

}
