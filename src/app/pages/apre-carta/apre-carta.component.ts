import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { DocService } from 'app/services/doc.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { Documents, StatusEnum } from '../models/documents ';



import { Tipodocs } from '../models/tipodoc';

@Component({
  selector: 'apre-carta',
  styleUrls: ['apre-carta.component.scss'],
  templateUrl: './apre-carta.component.html',
})
export class AprecartaComponent implements OnInit {
  @ViewChild('ng2TbCarta') ng2TbCarta: Ng2SmartTableComponent;
  @ViewChild('dialogCarta') dialogCarta: TemplateRef<any>;
  
  source: LocalDataSource = new LocalDataSource();


  dialogRef: NbDialogRef<any>;
  
  test= String;
  opcarta= StatusEnum.CARTA;
  opcap= StatusEnum.LIVRETE;
  tbDocData: Documents[];
  tbUserConfig: Object;
  tbdocConfig: Object;
  userSelected: Documents[];
  //selecttipodoc: Tipodocs[];
  ResponseAp: any;
  
  selecttipodoc =[
    { value: StatusEnum.CARTA, tipodoc: "Carta de Condução"},
    { value: StatusEnum.CAP, tipodoc: "Carta de Condução e CAP"},
    { value: StatusEnum.LIVRETE, tipodoc: "Carteira de Aptidão Profissional [CAP]"}
  ]
 
  formCarta = this.formBuilder.group({

    n_carta: [null, Validators.required],
    condutor: [null, [Validators.required]],
    motivo:  [null, Validators.required],
    cap:[null],
    tipodoc:"[null, Validators.required]",
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
    this.getListByTipoDoc()
    this.setConfigTbUser()

  }
  /*
  getDocuments() {
    this.docService.getListDocuments().subscribe(
      (data: any) => {
        //this.organicList = data.details;
        this.source.load(data.details);
        console.log(data);
      },
      (err) => {}
    );
  }
  */
  getListByTipoDoc(){

    this.docService.getListByTipoDoc("CARTA").subscribe(
      (data: any) => {
        //this.organicList = data.details;
        this.source.load(data.details);
        console.log(data);
      },
      (err) => {}
    );

  }

  onSaveCarta(){
    this.docService.create(this.findFormAdd()).subscribe((data) => {
  
      this.toastrService.success('Tarefa criada com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.ng2TbCarta.source.refresh();
     
    });
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formCarta.get('n_carta').markAsTouched();
    this.formCarta.get('condutor').markAsTouched();
    this.formCarta.get('motivo').markAsTouched();
    this.formCarta.get('tipodoc').markAsTouched();
    this.formCarta.get('data_apreensao').markAsTouched();
    this.formCarta.get('tipodoc').setValue("CARTA");
   
  }
 

  private findFormAdd() {
    
    this.formCarta.get('tipodoc').setValue("CARTA");
    const doc = this.formCarta.value;
  
    return doc;
  }

  
  public openModalExclusion(event: Row) {
  
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
        },
        condutor: {
          title: 'Condutor',
          type: "string",
        },
      
        motivo: {
          title: 'Motivo de Apreensão',
          type: "string",
        },
        data_apreensao: {
          title: 'Data de apreensao',
          type: "string",
        },
        
        n_oficio: {
          title: 'Numero de oficio',
          type: "string",
        },
        destino: {
          title: 'Destino',
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
