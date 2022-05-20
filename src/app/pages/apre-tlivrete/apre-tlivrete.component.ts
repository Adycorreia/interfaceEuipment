import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { DocService } from 'app/services/doc.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

import { Documents } from '../models/documents ';

import { Tipodocs } from '../models/tipodoc';

@Component({
  selector: 'apre-tlivrete',
  styleUrls: ['apre-tlivrete.component.scss'],
  templateUrl: './apre-tlivrete.component.html',
})
export class ApretlivreteComponent implements OnInit {
@ViewChild('ng2TbUser') ng2TbUser: Ng2SmartTableComponent;
@ViewChild('dialogUser') dialogUser: TemplateRef<any>;

source: LocalDataSource = new LocalDataSource();


dialogRef: NbDialogRef<any>;

tbDocData: Documents[]
tbUserConfig: Object;
tbdocConfig: Object;
userSelected: Documents[];
selecttipodoc: Tipodocs[];
ResponseAp: any


formUser = this.formBuilder.group({
  _id: [null],
  matricula: [null, Validators.required],
  condutor: [null, [Validators.required]],
  propriedade: [null, Validators.required],
  motivo:  [null, Validators.required],
  status:  [null, Validators.required],
});


constructor(private formBuilder: FormBuilder,  
            private dialogService: NbDialogService,
            private docService: DocService,
            private activatedRoute: ActivatedRoute,
            private router: Router, 
          ) {  }


ngOnInit(): void { 
  this.getListByTipoDoc()
  this.setConfigTbUser()
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


public openModalExclusion(event: Row) {

}

public openModalDoc(event: Row) {
  this.formUser.reset();
/*
  if (event) {
    const user: User = event.getData();
    this.userService.findById(user._id).subscribe((res) => {
      this.formUser.patchValue(res.body);
    });
  }*/

  this.dialogRef = this.dialogService.open(this.dialogUser);
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
    noDataMessage: 'Nenhum usuário cadastrado.',
    columns: {
      matricula: {
        title: 'Matricula',
        type: "string",
      },
     
      proprietario: {
        title: 'Propreitario',
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
