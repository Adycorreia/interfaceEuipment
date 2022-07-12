import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FeriasGoz } from 'app/helpers/commons';
import { Ferias } from 'app/pages/models/ferias';
import { EfectivosService } from 'app/services/efectivo.service';
import { FeriasService } from 'app/services/ferias.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.scss']
})
export class FeriasComponent implements OnInit {

  @ViewChild('ng2Tbferia') ng2Tbferia: Ng2SmartTableComponent;
  @ViewChild('dialogferia') dialogferia: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;
  source: LocalDataSource = new LocalDataSource();
  
  constructor(
              private formBuilder: FormBuilder,
              private dialogService: NbDialogService,
              private feriasService: FeriasService,
              private efectivoService: EfectivosService,
              private toastrService: NbToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
   // this.getListarmamento();
    this.setConfigTbFeria();
    this.getListeferias();
    
  }

  selectFeriaGz =[
    { value: FeriasGoz.Nacional, x: "Territorio Nacional"},
    { value: FeriasGoz.Estrangeiro, x: "Estrangeiro"}
  ]


  tbArmaData: Ferias[];
  tbFeriasConfig: Object;
  tbarmConfig: Object;
  efectivocList: Object;
  FeriaSelected: Ferias;


  formFerias = this.formBuilder.group({

    idferia: [null],
    data_inicio: [null, Validators.required],
    data_fim: [null, [Validators.required]],
    local_feria:  [null, Validators.required],
    entrega_arma:[null, Validators.required], 
    n_oficio:[null],
    despacho:[null],
    id_agente:[null, Validators.required],
    obs:[null],
  });


  public findOperation(): string {
    return this.isAdd() ? 'Cadastro de Nova' : 'Editar dado da';
  }

  private isAdd(): boolean {
    return !this.formFerias.get('idferia').value;
  }
  
   public btnSave() {
  
    if (this.isAdd()) this.onSaveCarta();
    else this.editDoc();
  }

 // private findFormAdd() {

    //this.formArma.get('agente').setValue("1");
   // const doc = this.formFerias.value;
   // return doc;
  //}

  private findFormAdd() {

    //this.formArma.get('agente').setValue("1");
    const editarFeria = <Ferias> {
    
      idferia: this.formFerias.value.idferia,
      data_inicio: this.formFerias.value.data_inicio,
      data_fim: this.formFerias.value.data_fim,
      local_feria: this.formFerias.value.local_feria,
      entrega_arma: this.formFerias.value.entrega_arma,
      n_oficio: this.formFerias.value.n_oficio,
      despacho: this.formFerias.value.despacho,
      id_agente: this.formFerias.value.id_agente,
      obs: this.formFerias.value.obs,
  
    }

    return editarFeria;
  }

  onSaveCarta(){
   
    this.feriasService.create(this.findFormAdd()).subscribe((data) => {
    
      this.toastrService.success('Tarefa criada com sucesso.', 'Sucesso');
      this.dialogRef.close();
      //this.refresh();
      this.getListeferias();
   
    });
  }

  getListeferias(){
    this.feriasService.getListFerias().subscribe(
      (data: any) => {
        this.efectivocList = data.details;
        this.source.load(data.details);
       console.log(data);
      },
      (err) => {}
    );
  }

  getListefectivo(){
    this.efectivoService.getListEfectivos().subscribe(
      (data: any) => {
        this.efectivocList = data.details;
        //this.source.load(data.details);
       // console.log(data);
      },
      (err) => {}
    );
  }

/*
  getListarmamento(){
    this.armamentoService.getListArmamentos().subscribe(
      (data: any) => {
        //this.organicList = data.details;
        //this.source.load(data.details);
        console.log(data);
      },
      (err) => {}
    );
  }
*/
  public btnDelete() {
    this.feriasService.delete(this.FeriaSelected.idferia).subscribe((res) => {
      //console.log(this.docSelected.iddoc);
     // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('Feria excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.ng2TbCarta.source.refresh();
      this.getListeferias();
    });
  }

  private editDoc(){
    this.feriasService.edit(this.findFormAdd()).subscribe((res) => {
     /* this.tbDocData = this.tbDocData.map((documents: Documents) => {
        if (documents.iddoc === this.formCarta.value.iddoc) 
        //return new Documents(res.body);
        return documents;
      });*/
      this.toastrService.success('Dados editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.refresh();
      this.getListeferias();
    });
  }

  public openModalExclusion(event: Row) {
    this.getListefectivo();
    this.FeriaSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.FeriaSelected.nome_efectivo +  this.FeriaSelected.apelido_efectivo });

}

  public openModalFerias(event: Row) {
    this.formFerias.reset();
    this.getListefectivo();
   /*
     if (event) {
       const user: User = event.getData();
       this.userService.findById(user._id).subscribe((res) => {
         this.formCarta.patchValue(res.body);
       });
     }*/
     
   this.dialogRef = this.dialogService.open(this.dialogferia);
   }

   public openModalEdiDoc(event: Row) {

    this.getListefectivo();
    this.feriasService.getListFerias().subscribe((res) => {
     /* this.userSelected = res.body;
      this.formCarta.reset();
      this.formCarta.get('tipodoc').patchValue(StatusEnum.CARTA);
*/
      if (event) {
        const ferias: Ferias = event.getData();
       //console.log(ferias);
          this.feriasService.findById(ferias.idferia).subscribe((res) => {
          //this.formCarta.patchValue(res.body);
          this.formFerias.get('idferia').setValue(ferias.idferia);
          this.formFerias.get('id_agente').setValue(ferias.id_agente);
          this.formFerias.get('data_inicio').setValue(ferias.data_inicio);
          this.formFerias.get('data_fim').setValue(ferias.data_fim);
          //this.formFerias.get('nome_efectivo').setValue(ferias.nome_efectivo);
         // this.formFerias.get('apelido_efectivo').setValue(ferias.apelido_efectivo);
          this.formFerias.get('local_feria').setValue(ferias.local_feria);
          this.formFerias.get('entrega_arma').setValue(ferias.entrega_arma);
          this.formFerias.get('n_oficio').setValue(ferias.n_oficio);
          this.formFerias.get('despacho').setValue(ferias.despacho);
         // this.formFerias.get('estado').setValue(ferias.estado);
          this.formFerias.get('obs').setValue(ferias.obs);
          
         
        });
      }

      this.dialogRef = this.dialogService.open(this.dialogferia);
    });
  }
   private setConfigTbFeria() {
    this.tbFeriasConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      
      noDataMessage: 'Nenhum Arma cadastrado.',

      columns: {
        id_agente: {
          title: 'Nome Completo dos Efectivos',
          type: "string",
          width: "35%",
          valuePrepareFunction: (cell, row) => { return row.nome_efectivo + " " + row.apelido_efectivo }
        },
        
        data_inicio: {
          title: 'Incio Feria',
          type: "string",
          width: "13%",
        },
        data_fim: {
          title: 'Fim Feria',
          type: "string",
          width: "13%",
        },
      
        local_feria: {
          title: 'Local',
          type: "string",
          width: "16%",
        },
      
        entrega_arma: {
          title: 'Entrega de Arma',
          type: "string",
          width: "15%",
        },

        n_oficio: {
          title: 'Oficio',
          type: "string",
          width: "9%",
        },

        despacho: {
          title: 'Despacho',
          type: "string",
          width: "9%",

        },
      
      },
    };
  }
  


}




