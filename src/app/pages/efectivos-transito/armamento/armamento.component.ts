import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Armamento } from 'app/pages/models/armamento';
import { Efectivos } from 'app/pages/models/efectivos';
import { ArmamentoService } from 'app/services/armamento.service';
import { EfectivosService } from 'app/services/efectivo.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { __values } from 'tslib';

@Component({
  selector: 'armamento',
  templateUrl: './armamento.component.html',
  styleUrls: ['./armamento.component.scss']
})
export class ArmamentoComponent implements OnInit {

  @ViewChild('ng2TbArma') ng2TbArma: Ng2SmartTableComponent;
  @ViewChild('dialogArma') dialogArma: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;
  source: LocalDataSource = new LocalDataSource();
  
  constructor(
              private formBuilder: FormBuilder,
              private dialogService: NbDialogService,
              private armamentoService: ArmamentoService,
              private efectivoService: EfectivosService,
              private toastrService: NbToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
   // this.getListarmamento();
    this.setConfigTbArma();
    this.getListefectivo();
  }

  tbArmaData: Armamento[];
  tbArmaConfig: Object;
  tbarmConfig: Object;
  efectivocList: Object;
  ArmaSelected: Armamento;


  formArma = this.formBuilder.group({

   // idarma: [null],
   // numero: [null],
   // marca: [null],
   // modelo:  [null],
   // calibre:  [null],
    n_carregador:[null, Validators.required], 
    n_municoes:[null, Validators.required],
    data_inspeArma:[null, Validators.required],
    estado_arma:[null],
   // estado:[null],
    id_agente:[null],
   // nome_agente:[null],
   // nome_apelido:[null],
    obs:[null],
  });

  public findOperation(): string {
    return this.isAdd() ? 'Cadastro de Nova' : 'Editar dado da';
  }

  private isAdd(): boolean {
    return !this.formArma.get('idagente').value;
  }
  
   public btnSave() {
  
    if (this.isAdd()) this.onSaveCarta();
    else this.editDoc();
  }

  private findFormAdd() {

    //this.formArma.get('agente').setValue("1");
    const editarArma = <Efectivos> {
    
      idagente: this.formArma.value.id_agente,
      n_carregador: this.formArma.value.n_carregador,
      n_municoes: this.formArma.value.n_municoes, 
      estado_arma: this.formArma.value.estado_arma, 
      data_inspeArma: this.formArma.value.data_inspeArma, 
      obs: this.formArma.value.obs,
   
    }

    return editarArma;
  }

  onSaveCarta(){

    this.efectivoService.create(this.findFormAdd()).subscribe((data) => {
    
      this.toastrService.success('Inspeção criada com sucesso.', 'Sucesso');
      this.dialogRef.close();
      //this.refresh();
      this.getListefectivo();
   
    });
  }

  getListefectivo(){
    this.efectivoService.getListEfectivos().subscribe(
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
    this.armamentoService.delete(this.ArmaSelected.idarma).subscribe((res) => {
      //console.log(this.docSelected.iddoc);
     // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('Efectivo excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.ng2TbCarta.source.refresh();
      this.getListefectivo();
    });
  }

  public editDoc(){
    this.efectivoService.inspeArma(this.findFormAdd()).subscribe((res) => {
     /* this.tbDocData = this.tbDocData.map((documents: Documents) => {
        if (documents.iddoc === this.formCarta.value.iddoc) 
        //return new Documents(res.body);
        return documents;
      });*/
      this.toastrService.success('Dados editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.refresh();
      this.getListefectivo();
    });
  }

  public openModalExclusion(event: Row) {

    this.ArmaSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.ArmaSelected.nome_efectivo + this.ArmaSelected.apelido_efectivo });

}

  public openModalDoc(event: Row) {
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
    this.efectivoService.getListEfectivos().subscribe((res) => {
     /* this.userSelected = res.body;
      this.formCarta.reset();
      this.formCarta.get('tipodoc').patchValue(StatusEnum.CARTA);
*/
      if (event) {
       const efectivos: Efectivos = event.getData();
       console.log(efectivos.idagente);
       this.efectivoService.findById(efectivos.idagente).subscribe((res) => {
          //this.formCarta.patchValue(res.body);
         this.formArma.get('id_agente').setValue(efectivos.idagente);
         // this.formArma.get('numero').setValue(efectivos.n_arma);
         // this.formArma.get('marca').setValue(efectivos.marca);
         // this.formArma.get('modelo').setValue(efectivos.modelo);
         // this.formArma.get('calibre').setValue(efectivos.calibre);
          this.formArma.get('n_carregador').setValue(efectivos.n_carregador);
          this.formArma.get('n_municoes').setValue(efectivos.n_municoes);
          this.formArma.get('n_municoes').setValue(efectivos.n_municoes);
         // this.formArma.get('id_agente').setValue(efectivos.idagente);
          this.formArma.get('data_inspeArma').setValue(efectivos.data_inspeArma);
          this.formArma.get('obs').setValue(efectivos.obs);
          
        });
      }

      this.dialogRef = this.dialogService.open(this.dialogArma);
    });
  }
   private setConfigTbArma() {
    this.tbArmaConfig = {
      mode: 'external',
      actions: { columnTitle: 'Registar Inspeção', add: false, delete: false, position: 'right',  width:"19"},
      edit: {
        editButtonContent: '<img src="assets/images/arrow-circle-right.svg" width="45" height="30">',
      },
      
      noDataMessage: 'Nenhum Arma cadastrado.',

      columns: {
        n_arma: {
          title: 'Nº de Arma',
          type: "string",
          width: "12%",
        },
        marca: {
          title: 'Marca',
          type: "string",
          width: "13%",
        },
      
        calibre: {
          title: 'Calibre',
          type: "string",
          width: "11%",
        },
      
        nome: {
          title: 'Nome dos efectivos',
          type: "string",
          width: "29%",
          valuePrepareFunction: (cell, row) => { return row.nome + " " + row.apelido }
        },

        data_inspeArma: {
          title: 'Data de Inspeção',
          type: "string",
          width: "13%",
        },

        estado_arma: {
          title: 'Estado',
          type: "string",
          width: "11%",

        },
      
      },
    };
  }
  


}