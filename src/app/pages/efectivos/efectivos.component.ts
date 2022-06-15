import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { DocService } from 'app/services/doc.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { Documents } from '../models/documents';



import { Tipodocs } from '../models/tipodoc';

@Component({
  selector: 'efectivos',
  styleUrls: ['efectivos.component.scss'],
  templateUrl: './efectivos.component.html',
})
export class EfectivosComponent implements OnInit {
  @ViewChild('ng2TbCarta') ng2TbCarta: Ng2SmartTableComponent;
  @ViewChild('dialogUser') dialogUser: TemplateRef<any>;
  
  source: LocalDataSource = new LocalDataSource();
  
  
  dialogRef: NbDialogRef<any>;
  
  tbDocData: Documents[]
  tbUserConfig: Object;
  tbdocConfig: Object;
  userSelected: Documents[];
  selecttipodoc: Tipodocs[];
  ResponseAp: any;
  
  
  formUser = this.formBuilder.group({
    _id: [null],
    matricula: [null, Validators.required],
    condutor: [null, [Validators.required]],
    propriedade: [null, Validators.required],
    motivo:  [null, Validators.required],
    status:  [null, Validators.required],
    cap:[null, Validators.required],
  });

  opCap = [
    { selecionado: true, label: ' Se tiver CAP apreendido (clica)' },
  ];
  
  constructor(private formBuilder: FormBuilder,  
              private dialogService: NbDialogService,
              private docService: DocService,
              private activatedRoute: ActivatedRoute,
              private router: Router, 
            ) {  }
  
  
  ngOnInit(): void { 
   // this.getDocuments()
    this.setConfigTbUser()
    this.selecttipodoc =[
      { tipodoc: "SIM" },
      { tipodoc: "Não"}
    ]
   
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
  
}
