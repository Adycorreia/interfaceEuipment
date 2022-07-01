import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Armamento } from 'app/pages/models/armamento';
import { ArmamentoService } from 'app/services/armamento.service';
import { EfectivosService } from 'app/services/efectivo.service';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

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
    this.getListarmamento();
    this.setConfigTbArma();
    this.getListefectivo();
  }

  tbArmaData: Armamento[];
  tbArmaConfig: Object;
  tbarmConfig: Object;
  efectivocList: Object;
  ArmaSelected: Armamento;


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
    return this.isAdd() ? 'Cadastro de nova' : 'Editar dado da';
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

    this.armamentoService.create(this.findFormAdd()).subscribe((data) => {
    
      this.toastrService.success('Tarefa criada com sucesso.', 'Sucesso');
      this.dialogRef.close();
      //this.refresh();
      this.getListarmamento();
   
    });
  }

  getListefectivo(){
    this.efectivoService.getListEfectivos().subscribe(
      (data: any) => {
        this.efectivocList = data.details;
       // this.source.load(data.details);
        console.log(data);
      },
      (err) => {}
    );
  }


  getListarmamento(){
    this.armamentoService.getListArmamentos().subscribe(
      (data: any) => {
        //this.organicList = data.details;
        this.source.load(data.details);
        console.log(data);
      },
      (err) => {}
    );
  }

  public btnDelete() {
    this.armamentoService.delete(this.ArmaSelected.idarma).subscribe((res) => {
      //console.log(this.docSelected.iddoc);
     // this.tbDocData = this.tbDocData.filter(((documents) => documents.iddoc !== this.docSelected.iddoc));
      this.toastrService.success('Efectivo excluída com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.ng2TbCarta.source.refresh();
      this.getListarmamento();
    });
  }

  private editDoc(){
    this.armamentoService.edit(this.findFormAdd()).subscribe((res) => {
     /* this.tbDocData = this.tbDocData.map((documents: Documents) => {
        if (documents.iddoc === this.formCarta.value.iddoc) 
        //return new Documents(res.body);
        return documents;
      });*/
      this.toastrService.success('Dados editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
     // this.refresh();
      this.getListarmamento();
    });
  }

  public openModalExclusion(event: Row) {

    this.ArmaSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete);

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
    this.armamentoService.getListArmamentos().subscribe((res) => {
     /* this.userSelected = res.body;
      this.formCarta.reset();
      this.formCarta.get('tipodoc').patchValue(StatusEnum.CARTA);
*/
      if (event) {
        const armamento: Armamento = event.getData();
       // console.log(documents);
        this.armamentoService.findById(armamento.idarma).subscribe((res) => {
          //this.formCarta.patchValue(res.body);
          this.formArma.get('numero').setValue(armamento.numero);
          this.formArma.get('marca').setValue(armamento.marca);
          this.formArma.get('modelo').setValue(armamento.modelo);
          this.formArma.get('calibre').setValue(armamento.calibre);
          this.formArma.get('n_carregador').setValue(armamento.n_carregador);
          this.formArma.get('n_municoes').setValue(armamento.n_municoes);
          this.formArma.get('id_agente').setValue(armamento.id_agente);
          this.formArma.get('estado').setValue(armamento.estado);
          this.formArma.get('obs').setValue(armamento.obs);
          
         
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
        numero: {
          title: 'Nº de Arma',
          type: "string",
          width: "13%",
        },
        marca: {
          title: 'Marca',
          type: "string",
          sort: true,
        },
      
        modelo: {
          title: 'Modelo',
          type: "string",
        },
        calibre: {
          title: 'Calibre',
          type: "string",
        },
        
        n_carregador: {
          title: 'Nº de Carregador',
          type: "string",
  
        },
        n_municoes: {
          title: 'Nº de Muniçoes',
          type: "string",
          width: "15%",
        },

        id_agente: {
          title: 'Agente Nome',
          type: "string",
        },

        estado: {
          title: 'Estado',
          type: "string",

        },
      
      },
    };
  }
  


}
