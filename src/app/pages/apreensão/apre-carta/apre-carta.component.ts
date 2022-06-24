import {
  ChangeDetectionStrategy,
  Component, EventEmitter, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Documents, StatusEnum } from 'app/pages/models/documents';

import { DocService } from 'app/services/doc.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'apre-carta',
  styleUrls: ['apre-carta.component.scss'],
  templateUrl: './apre-carta.component.html',
  
})
export class AprecartaComponent implements OnInit {
  @ViewChild('ng2TbCarta') ng2TbCarta: Ng2SmartTableComponent;
  @ViewChild('dialogCarta') dialogCarta: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  
  close(){
    this.danger = false;
  }


  source: LocalDataSource = new LocalDataSource();
  
  dialogRef: NbDialogRef<any>;
  
 
  opcarta= StatusEnum.CARTA;
  opcap= StatusEnum.LIVRETE;
  tbDocData: Documents[];
  tbUserConfig: Object;
  tbdocConfig: Object;
  userSelected: Documents[];
  opcao1: boolean = false;
  docSelected: Documents;
  ResponseAp: any;

  danger: boolean = false;
  /*
  selecttipodoc =[
    { value: StatusEnum.CARTA, tipodoc: "Carta de Condução"},
    { value: StatusEnum.CAP, tipodoc: "Carta de Condução e CAP"},
    { value: StatusEnum.LIVRETE, tipodoc: "Carteira de Aptidão Profissional [CAP]"}
  ]
 */
  formCarta = this.formBuilder.group({

    iddoc: [null],
    n_carta: [null, Validators.required],
    condutor: [null, [Validators.required]],
    motivo:  [null, Validators.required],
    tipodoc: [null],
    data_apreensao:[null, Validators.required], 
    obs:[null] 
  });



  opCap = [
    { selecionado: true, label: 'Click para escrever Observações' },
  ];
  ResponseAptest: void;
  
  constructor(private formBuilder: FormBuilder,  
              private dialogService: NbDialogService,
              private docService: DocService,
              private toastrService: NbToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router, 
            ) {  }
  
          
  ngOnInit(): void { 
    this.getListByTipoDoc(),
    this.setConfigTbUser()
   
  }
 /*
  private setRouteReuse(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
*/

  getListByTipoDoc(){

    this.docService.getListByTipoDoc("CARTA").subscribe(
      (data: any) => {
        this.source.load(data.details);
        /*console.log(data);*/
      },
      (err) => {}
    );

  }

  private isAdd(): boolean {
    return !this.formCarta.get('iddoc').value;
  }

  public btnSave() {
    if (this.formCarta.invalid) return this.setFormInvalid();

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



  onSaveCarta(){

    this.docService.create(this.findFormAdd()).subscribe((data) => {
    
      this.toastrService.success('Tarefa criada com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.ng2TbCarta.source.refresh();
      this.getListByTipoDoc();
    });

  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formCarta.get('n_carta').markAsTouched();
    this.formCarta.get('condutor').markAsTouched();
    this.formCarta.get('motivo').markAsTouched();
    this.formCarta.get('data_apreensao').markAsTouched();
    //this.formCarta.get('tipodoc').setValue("CARTA");
   
  }
 

  private findFormAdd() {

    this.formCarta.get('tipodoc').setValue("CARTA");
    const doc = this.formCarta.value;
    return doc;
  }
  
  public openModalDoc(event: Row) {
   this.formCarta.reset();
  /*
    if (event) {
      const user: User = event.getData();
      this.userService.findById(user._id).subscribe((res) => {
        this.formCarta.patchValue(res.body);
      });
    }*/
    
  this.dialogRef = this.dialogService.open(this.dialogCarta);
  }

  public openModalExclusion(event: Row) {

    this.docSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.docSelected.n_carta });

}

  public btnDelete() {
    this.docService.delete(this.docSelected.iddoc).subscribe((res) => {
      //console.log(this.docSelected.iddoc);
     // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('Carta de Condução excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.ng2TbCarta.source.refresh();
      this.getListByTipoDoc();
    });
  }


  public openModalEdiDoc(event: Row) {
    this.docService.getListDocuments().subscribe((res) => {
     /* this.userSelected = res.body;
      this.formCarta.reset();
      this.formCarta.get('tipodoc').patchValue(StatusEnum.CARTA);
*/
      if (event) {
        const documents: Documents = event.getData();
       // console.log(documents);
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

      this.dialogRef = this.dialogService.open(this.dialogCarta);
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

  private editDoc(){
    this.docService.edit(this.formCarta.value).subscribe((res) => {
     /* this.tbDocData = this.tbDocData.map((documents: Documents) => {
        if (documents.iddoc === this.formCarta.value.iddoc) 
        //return new Documents(res.body);
        return documents;
      });*/
      this.toastrService.success('Dados editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.getListByTipoDoc();
    });
  }

  iddoctest:String;

  public onUserSelect($event){
    console.log($event);
    console.log($event.data.iddoc);
    if ($event.data.iddoc) {
      let iddoc = $event.data.iddoc;
     

      this.docService.findById(iddoc).subscribe(
        (data: any) => {
          console.log(data.details[0]);
          this.danger = true;
          this.iddoctest= data.details[0];
          console.log(this.iddoctest);

        }
       
      );
    }

  }



  private setConfigTbUser() {
    this.tbUserConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum Carta de Condução cadastrado.',

      
      columns: {
        n_carta: {
          title: 'Nº de Carta',
          type: "string",
          width: "13%",
        },
        condutor: {
          title: 'Nome Completo do Condutor',
          type: "string",
          width: "25%",
          sort: true,
        },
      
        motivo: {
          title: 'Motivo de Apreensão',
          type: "string",
          width: "25%",
        },
        data_apreensao: {
          title: 'Data de Apreensão',
          type: "string",
          width: "15%",
        },
        
        n_oficio: {
          title: 'Nº de Oficio',
          type: "string",
          width: "11%",
        },
        destino: {
          title: 'Destino',
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
