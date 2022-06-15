import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Documents, StatusEnum } from 'app/pages/models/documents';

import { DocService } from 'app/services/doc.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';



@Component({
  selector: 'apre-cap',
  styleUrls: ['apre-cap.component.scss'],
  templateUrl: './apre-cap.component.html',
})
export class AprecapComponent implements OnInit {
  @ViewChild('ng2TbCap') ng2TbCap: Ng2SmartTableComponent;
  @ViewChild('dialogCap') dialogCap: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;
  
  source: LocalDataSource = new LocalDataSource();

  dialogRef: NbDialogRef<any>;


  opcarta= StatusEnum.CARTA;
  opcap= StatusEnum.LIVRETE;
  tbDocData: Documents[];
  tbUserConfig: Object;
  tbdocConfig: Object;
  docSelected: Documents;
  userSelected: Documents[];
  //selecttipodoc: Tipodocs[];
  ResponseAp: any;
  
  selecttipodoc =[
    { value: StatusEnum.CARTA, tipodoc: "Carta de Condução"},
    { value: StatusEnum.CAP, tipodoc: "Carta de Condução e CAP"},
    { value: StatusEnum.LIVRETE, tipodoc: "Carteira de Aptidão Profissional [CAP]"}
  ]
 
  formCap = this.formBuilder.group({
    iddoc: [null],
    condutor: [null, [Validators.required]],
    motivo:  [null, Validators.required],
    n_cap: [null, Validators.required],
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

    this.docService.getListByTipoDoc("CAP").subscribe(
      (data: any) => {
        //this.organicList = data.details;
        this.source.load(data.details);
        console.log(data);
      },
      (err) => {}
    );

  }

  private isAdd(): boolean {
    return !this.formCap.get('iddoc').value;
  }

  public btnSave() {
    if (this.formCap.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.onSaveCap();
    else this.editCap();
  }

/*
  public btnSave() {
    if (this.formCap.invalid) { return this.setFormInvalid();  } else{ this.onSaveCarta(); }
  }
*/
  onSaveCap(){
    this.docService.create(this.findFormAdd()).subscribe((data) => {
      if (this.formCap.invalid) return this.setFormInvalid();
      
      this.toastrService.success('Cap cadastrado com sucesso.', 'Sucesso'); 
      this.dialogRef.close();
      this.ng2TbCap.source.refresh();
      this.getListByTipoDoc();
    });

  
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formCap.get('n_cap').markAsTouched();
    this.formCap.get('condutor').markAsTouched();
    this.formCap.get('motivo').markAsTouched();
    this.formCap.get('data_apreensao').markAsTouched();
 
   
  }
 

  private findFormAdd() {
    
    this.formCap.get('tipodoc').setValue("CAP");
    const doc = this.formCap.value;
  
    return doc;
  }

  
  public openModalExclusion(event: Row) {

      this.docSelected = event.getData();
      this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.docSelected.n_cap });
 
  }
  
  public openModalDoc(event: Row) {
    this.formCap.reset();
  /*
    if (event) {
      const user: User = event.getData();
      this.userService.findById(user._id).subscribe((res) => {
        this.formCap.patchValue(res.body);
      });
    }*/
  
    this.dialogRef = this.dialogService.open(this.dialogCap);
  }


  public btnDelete() {
    this.docService.delete(this.docSelected.iddoc).subscribe((res) => {
      console.log(this.docSelected.iddoc);
     // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('CAP excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
      this.ng2TbCap.source.refresh();
      this.getListByTipoDoc();
    });
  }

  
  public openModalEdiDocs(event: Row) {
    this.docService.getListDocuments().subscribe((res) => {
     /* this.userSelected = res.body;
      this.formCarta.reset();
      this.formCarta.get('tipodoc').patchValue(StatusEnum.CARTA);
*/
      if (event) {
        const documents: Documents = event.getData();
        //console.log(documents);
        this.docService.findById(documents.iddoc).subscribe((res) => {
          //this.formCarta.patchValue(res.body);
          this.formCap.get('iddoc').setValue(documents.iddoc);
          this.formCap.get('n_cap').setValue(documents.n_cap);
          this.formCap.get('condutor').setValue(documents.condutor);
          this.formCap.get('motivo').setValue(documents.motivo);
          this.formCap.get('data_apreensao').setValue(documents.data_apreensao);
          this.formCap.get('tipodoc').setValue(documents.tipodoc);
          this.formCap.get('obs').setValue(documents.obs);
          
         
        });
      }

      this.dialogRef = this.dialogService.open(this.dialogCap);
     });
  }

  private editCap(){
    //console.log(this.formCap.value);
    
    this.docService.edit(this.formCap.value).subscribe(() => {
     /*this.tbDocData = this.tbDocData.map((documents: Documents) => {
        if (documents.iddoc === this.formCap.value.iddoc) 
        //return new Documents(res.body);
        return documents;
      });
      */
      this.toastrService.success('Dados editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
     this.getListByTipoDoc();
    });
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
      noDataMessage: 'Nenhum Carteira de Aptidão Profissional [CAP] cadastrado.',
      columns: {
        n_cap: {
          title: 'Nº de Cap',
          type: "string",
          width: "13%",
        },
        condutor: {
          title: 'Condutor',
          type: "string",
          width: "25%",
        },
      
        motivo: {
          title: 'Motivo de Apreensão',
          type: "string",
          width: "25%",
        },

        data_apreensao: {
          title: 'Data de Apreensao',
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





}
