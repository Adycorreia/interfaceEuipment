import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Documents } from 'app/pages/models/documents';

import { Tipodocs } from 'app/pages/models/tipodoc';
import { DocService } from 'app/services/doc.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';



@Component({
  selector: 'apre-tlivrete',
  styleUrls: ['apre-tlivrete.component.scss'],
  templateUrl: './apre-tlivrete.component.html',
})
export class ApretlivreteComponent implements OnInit {
@ViewChild('ng2Tlivrete') ng2Tlivrete: Ng2SmartTableComponent;
@ViewChild('dialogtlivrete') dialogtlivrete: TemplateRef<any>;
@ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

source: LocalDataSource = new LocalDataSource();


dialogRef: NbDialogRef<any>;

tbDocData: Documents[]
tbUserConfig: Object;
tbdocConfig: Object;
userSelected: Documents[];
selecttipodoc: Tipodocs[];
ResponseAp: any;
docSelected: Documents;


formTlivrete = this.formBuilder.group({
  iddoc: [null],
  matricula: [null, Validators.required],
  proprietario: [null, Validators.required],
  motivo:  [null, Validators.required],
  data_apreensao:  [null, Validators.required],
  tipodoc: [null],
  obs: [null],
});


constructor(private formBuilder: FormBuilder,  
            private dialogService: NbDialogService,
            private docService: DocService,
            private activatedRoute: ActivatedRoute,
            private toastrService: NbToastrService,
            private router: Router, 
          ) {  }


ngOnInit(): void { 
  this.getListByTipoDoc(),
  this.setConfigTbUser(),

  this.selecttipodoc =[
    { tipodoc: "Carta" },
    { tipodoc: "Titulo e Propreidade"}
  ]
 
}

getListByTipoDoc(){
  this.docService.getListByTipoDoc("LIVRETE").subscribe(
    (data: any) => {
      //this.organicList = data.details;
      this.source.load(data.details);
      console.log(data);
    },
    (err) => {}
  );
}

private isAdd(): boolean {
  return !this.formTlivrete.get('iddoc').value;
}



public btnSave() {
  if (this.formTlivrete.invalid) { return this.setFormInvalid();  } else{ this.onSavetlivrete(); }
}

onSavetlivrete(){
  this.docService.create(this.findFormAdd()).subscribe((data) => {
   
    this.toastrService.success('Tarefa criada com sucesso.', 'Sucesso');
    this.dialogRef.close();
    //this.ng2Tlivrete.source.refresh();
    this.getListByTipoDoc();
 
  });
}

private setFormInvalid() {
  this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
  this.formTlivrete.get('matricula').markAsTouched();
  this.formTlivrete.get('proprietario').markAsTouched();
  this.formTlivrete.get('motivo').markAsTouched();
  this.formTlivrete.get('data_apreensao').markAsTouched();
 
 
}


private findFormAdd() {
  
  this.formTlivrete.get('tipodoc').setValue("LIVRETE");
  const doc = this.formTlivrete.value;

  return doc;
}

public openModalDoc(event: Row) {
  this.formTlivrete.reset();
/*
  if (event) {
    const user: User = event.getData();
    this.userService.findById(user._id).subscribe((res) => {
      this.formTlivrete.patchValue(res.body);
    });
  }*/

  this.dialogRef = this.dialogService.open(this.dialogtlivrete);
}

public openModalExclusion(event: Row) {

  this.docSelected = event.getData();
  this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.docSelected.matricula });

}

public btnDelete() {
  this.docService.delete(this.docSelected.iddoc).subscribe((res) => {
    console.log(this.docSelected.iddoc);
   // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
    this.toastrService.success('Titulo e Livrte excluída com sucesso.', 'Sucesso');
    this.dialogRef.close();
    this.ng2Tlivrete.source.refresh();
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
    noDataMessage: 'Nenhum Titulo e Livrete cadastrado.',
    columns: {
      matricula: {
        title: 'Matricula',
        type: "string",
        width: "15%",
      },
     
      proprietario: {
        title: 'Propreitario',
        type: "string",
        width: "25%",
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
        title: 'Nº de oficio',
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
