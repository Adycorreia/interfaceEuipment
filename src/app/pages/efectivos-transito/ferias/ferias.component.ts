import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
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

  @ViewChild('ng2TbArma') ng2TbArma: Ng2SmartTableComponent;
  @ViewChild('dialogArma') dialogArma: TemplateRef<any>;
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
    this.setConfigTbArma();
    this.getListeferias();
  }

  tbArmaData: Ferias[];
  tbArmaConfig: Object;
  tbarmConfig: Object;
  efectivocList: Object;
  ArmaSelected: Ferias;


  formArma = this.formBuilder.group({

    idarma: [null],
    numero: [null, Validators.required],
    marca: [null, [Validators.required]],
    modelo:  [null, Validators.required],
    calibre:  [null, Validators.required],
    n_carregador:[null, Validators.required], 
    n_municoes:[null, Validators.required],
    estado:[null, Validators.required],
    id_agente:[null, Validators.required],
    fotografia:[null, Validators.required],
    obs:[null],
  });


  public findOperation(): string {
    return this.isAdd() ? 'Cadastro de Nova' : 'Editar dado da';
  }

  private isAdd(): boolean {
    return !this.formArma.get('idarma').value;
  }
  
   public btnSave() {
  
    if (this.isAdd()) this.onSaveCarta();
    else this.editDoc();
  }

  private findFormAdd() {

    //this.formArma.get('agente').setValue("1");
    const doc = this.formArma.value;
    return doc;
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
    this.feriasService.delete(this.ArmaSelected.idferia).subscribe((res) => {
      //console.log(this.docSelected.iddoc);
     // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('Efectivo excluída com sucesso.', 'Sucesso');
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

    this.ArmaSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.ArmaSelected.nome_efectivo + this.ArmaSelected.apelido_efectivo });

}

  public openModalFerias(event: Row) {
    this.formArma.reset();
   /*
     if (event) {
       const user: User = event.getData();
       this.userService.findById(user._id).subscribe((res) => {
         this.formCarta.patchValue(res.body);
       });
     }*/
     
   this.dialogRef = this.dialogService.open(this.dialogArma);
   }

   public openModalEdiDoc(event: Row) {
    this.feriasService.getListFerias().subscribe((res) => {
     /* this.userSelected = res.body;
      this.formCarta.reset();
      this.formCarta.get('tipodoc').patchValue(StatusEnum.CARTA);
*/
      if (event) {
        const ferias: Ferias = event.getData();
       console.log(ferias);
        this.feriasService.findById(ferias.id_agente).subscribe((res) => {
          //this.formCarta.patchValue(res.body);
          this.formArma.get('id_agente').setValue(ferias.id_agente);
          this.formArma.get('data_inicio').setValue(ferias.data_inicio);
          this.formArma.get('data_fim').setValue(ferias.data_fim);
          this.formArma.get('nome_efectivo').setValue(ferias.nome_efectivo);
          this.formArma.get('apelido_efectivo').setValue(ferias.apelido_efectivo);
          this.formArma.get('local_feria').setValue(ferias.local_feria);
          this.formArma.get('entrega_arma').setValue(ferias.entrega_arma);
          this.formArma.get('n_oficio').setValue(ferias.n_oficio);
          this.formArma.get('despacho').setValue(ferias.despacho);
          this.formArma.get('estado').setValue(ferias.estado);
          this.formArma.get('obs').setValue(ferias.obs);
          
         
        });
      }

      this.dialogRef = this.dialogService.open(this.dialogArma);
    });
  }
   private setConfigTbArma() {
    this.tbArmaConfig = {
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
          title: 'Efectivos',
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
          title: 'Entregou Arma',
          type: "string",
          width: "32%",
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