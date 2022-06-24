/*
import { RootObject } from "../models/estrangeiro/rootObject";
import { Biografico } from "../models/estrangeiro/biografico";
import { Biometrico } from "../models/estrangeiro/biometrico";
import { Contact } from "../models/estrangeiro/contact";
import { Documentos } from "../models/pedidos/documentos";
import { FaseChange } from "../models/pedidos/faseChange";
import { Erro } from "../models/pedidos/erro";
import { CodigosMrz } from "../models/pedidos/mrz";
import { Recusa } from "../models/pedidos/erroPedidos";
import { Pagamento } from "../models/pedidos/pagamento";
import { Passport } from "../models/estrangeiro/passport";
*/
/*
export module TreHelper {
  //receive base64 and return bytes to be rendered
  export function base64ToArrayBuffer(base64: any) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  //receive base64 and return blobs to be rendered
  export function base64ToBlob(base64: any) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return new Blob([bytes], { type: "application/pdf" });
  }

  export function ValidateStringInput(param: string): boolean {
    console.log(param.trim());
    if (param) return true;
    return false;
  }

  export function validateRegexString(param: string): boolean {
    let str = new RegExp("^(?! )[a-zA-Z-_ ]*$");
    console.log(str.test(param));
    if (str.test(param)) return true;
    return false;
  }

  export function showpdf(docId: any) {
    const pdfbase64 = docId;
    var pdfByte = TreHelper.base64ToBlob(pdfbase64);
    var fileURL = URL.createObjectURL(pdfByte);
    console.log(fileURL);
    window.open(
      fileURL,
      "_blank",
      "toolbar=yes,top=500,left=500,width=800,height=800"
    );
  }

  /*export function constructJsonToSend(
    pan: string,
    idEstrangeiro: string,
    tipoPedido: string,
    tipoDocumento: string,
    nomeCategoriaTipoTre: string,
    unEntrega: string,
    unPedido: string,
    versaoDocumento: string,
    codigoCancelamento: string,
    igrpUtilizador: string,
    processoIncm: string,
    nomeTipoTre: string,
    nomeUnidaderecolha: string,
    nomeUnidadeEntrega: string,
    igrpDataPedido: string,
    biografico: Biografico,
    biometrico: Biometrico,
    contact: Contact,
    documentos: Documentos,
    pagamento: Pagamento,
    fase?: FaseChange,
    recusa?: Recusa,
    erro?: Erro
  ): RootObject {
    const pedido: Pedido = new Pedido();
    const pedidoTre: Pedidotre = new Pedidotre();
    const rootObject: RootObject = new RootObject();

    pedido.pan = pan;
    pedido.idEstrangeiros = idEstrangeiro;
    (pedido.tipoPedido = tipoPedido),
      (pedido.tipoDocumento = tipoDocumento),
      (pedido.nomeCategoriaTipoTre = nomeCategoriaTipoTre),
      (pedido.unidadeOrganicaEntrega = unEntrega),
      (pedido.unidadeOrganicaPedido = unPedido),
      (pedido.versaoDocumento = versaoDocumento),
      (pedido.codigoCancelamento = codigoCancelamento),
      (pedido.igrpUtilizador = igrpUtilizador),
      (pedido.processoINCM = processoIncm),
      (pedido.nomeTipotre = nomeTipoTre),
      (pedido.nomeUnidadeOrganicaEntrega = nomeUnidadeEntrega),
      (pedido.nomeUnidadeOrganicaPedido = nomeUnidaderecolha),
      (pedido.iGRP_Data_Pedido = igrpDataPedido),
      (pedido.identificacao = biografico);
    pedido.dadosBiometricos = biometrico;
    pedido.morada = contact;
    pedido.documentos = documentos;
    pedido.pagamento = pagamento;

    if (fase) pedido.fase = fase;
    if (recusa) pedido.recusa = recusa;

    pedidoTre.Pedido = pedido;
    rootObject.Pedidotre = pedidoTre;

    removeProperty(rootObject);

    return rootObject;
  }*/
/*
  export function partialJsonObjectToSend(
    numSitre: string,
    idEstrangeiro: string,
    tipoPedido: string,
    tipoDocumento: string,
    categoriaTipoTre: string,
    nomeCategoriaTipoTre: string,
    unEntrega: string,
    unPedido: string,
    tipoTre: string,
    nomeTipoTre: string,
    nomeUnidaderecolha: string,
    nomeUnidadeEntrega: string,
    igrpDataPedido: string,
    numeroRequisicao?: string,
    numeroRequisicaoOrigem?: String,
    numeroPedido?: string,
    origemPedido?: string,
    dataEntradaPais?: string,
    biografico?: Biografico,
    biometrico?: Biometrico,
    contact?: Contact,
    documentos?: Documentos,
    pagamento?: Pagamento,
    fase?: FaseChange,
    recusa?: Recusa,
    pan?: string,
    versaoDocumento?: string,
    codigoCancelamento?: string,
    processoIncm?: string,
    igrpUtilizador?: string,
    observacoesPedido?: string,

  ): RootObject {
    const pedido: Pedido = new Pedido();
    const pedidoTre: Pedidotre = new Pedidotre();
    const rootObject: RootObject = new RootObject();

    pedido.numeroSITRE = numSitre;
    pedido.idEstrangeiros = idEstrangeiro;
    pedido.tipoPedido = tipoPedido;
    pedido.tipoDocumento = tipoDocumento;
    pedido.categoriaTipoTre = categoriaTipoTre;
    pedido.nomeCategoriaTipoTre = nomeCategoriaTipoTre;
    pedido.unidadeOrganicaEntrega = unEntrega;
    pedido.unidadeOrganicaPedido = unPedido;
    (pedido.tipotre = tipoTre), (pedido.nomeTipotre = nomeTipoTre);
    pedido.nomeUnidadeOrganicaEntrega = nomeUnidadeEntrega;
    pedido.nomeUnidadeOrganicaPedido = nomeUnidaderecolha;
    pedido.iGRP_Data_Pedido = igrpDataPedido;

    if (numeroRequisicao) 
      pedido.numeroRequisicao = numeroRequisicao;

    if(numeroRequisicaoOrigem)
      pedido.numeroRequisicaoOrigem = numeroRequisicaoOrigem;

    if (numeroPedido) pedido.numeroPedido = numeroPedido;
    if (origemPedido) pedido.origemPedido = origemPedido;
    if (dataEntradaPais) pedido.dataEntradaPais = dataEntradaPais;
    if (biografico) pedido.identificacao = biografico;
    if (biometrico) pedido.dadosBiometricos = biometrico;
    if (contact) pedido.morada = contact;
    if (documentos) pedido.documentos = documentos;
    if (pagamento) pedido.pagamento = pagamento;

    if (igrpUtilizador) pedido.igrpUtilizador = igrpUtilizador;
    if (processoIncm) pedido.processoINCM = processoIncm;
    if (codigoCancelamento) pedido.codigoCancelamento = codigoCancelamento;
    if (versaoDocumento) pedido.versaoDocumento = versaoDocumento;
    if (pan) pedido.pan = pan;
    if (fase) pedido.fase = fase;
    if (observacoesPedido) pedido.observacoesPedido = observacoesPedido;
    if (recusa) pedido.recusa = recusa;
    

    pedidoTre.Pedido = pedido;
    rootObject.Pedidotre = pedidoTre;

    removeProperty(rootObject);

    return rootObject;
  }

  export function removeProperty(object: Object) {
    for (var m in object) {
      if (
        object[m] == undefined ||
        object[m] == null ||
        object[m] == "" ||
        Object.keys(m).length == 0
      ) {
        delete object[m];
      }
    }
    return object;
  }

  export function jsonPropertyToString(value: any) {
    const withStrings = JSON.parse(value, (key, val) =>
      typeof val !== "object" && val !== null ? String(val) : val
    );
    return withStrings;
  }

  export function transformJsonToObject(dadosJson: any) {
    var data: Pedido;
    console.log(dadosJson);
    data = new Pedido().fromJSON(dadosJson.Pedidotre.Pedido);
    console.log(data);

    data.dadosBiometricos = new Biometrico().fromJSON(
      dadosJson.Pedidotre.Pedido.DadosBiometricos
    );
    console.log(data.dadosBiometricos);

    data.documentos = new Documentos().fromJSON(
      dadosJson.Pedidotre.Pedido.Documentos
    );

    console.log(data.documentos);

    data.identificacao = new Biografico().fromJSON(
      dadosJson.Pedidotre.Pedido.Identificacao
    );
    console.log(data.identificacao);

    data.identificacao.passport = new Passport().fromJSON(
      dadosJson.Pedidotre.Pedido.Identificacao.Passaporte
    );

    data.fase = new FaseChange().fromJSON(dadosJson.Pedidotre.Pedido.Fase);
    console.log(data.identificacao.passport);
    data.morada = new Contact().fromJSON(dadosJson.Pedidotre.Pedido.Morada);

    console.log(data.morada);

    data.mrz = new CodigosMrz().fromJSON(dadosJson.Pedidotre.Pedido.CodigosMrz);
    console.log(data.mrz);
    data.pagamento = new Pagamento().fromJSON(
      dadosJson.Pedidotre.Pedido.Pagamento
    );
    console.log(data.pagamento);

    data.numeroSITRE = dadosJson.Pedidotre.Pedido.numSITRE;
    data.idEstrangeiros = dadosJson.Pedidotre.Pedido.IdEstrangeiros;
    console.log(data);
    return data;
  }

  export function dataConvert(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }

  export function convertFormToPassport(formData: any): Passport {
    console.log(formData);
    var documentData1 = new Passport();
    documentData1.documenCode = formData.documentCode;
    documentData1.numPass = formData.documentNumber;
    documentData1.dataEmissaoPass = formData.issuingDate;
    documentData1.dataValidadePass = formData.expirationDate;
    documentData1.emitidoPor = formData.issuedBy;
    return documentData1;
  }

  export function transformBiographicToObject(
    data: any,
    documentIdentification: Passport
  ) {
    var biografico = new Biografico();
    biografico.nome = data.nome;
    biografico.apelido = data.apelido;
    biografico.nomeMae = data.nomeMae;
    biografico.apelidoMae = data.apelidoMae;
    biografico.nomePai = data.nomePai;
    biografico.apelidoPai = data.apelidoPai;
    biografico.profissao = data.profissao;
    biografico.naturalidade = data.naturalidade;
    biografico.nomeNaturalidade = data.nomeNaturalidade;
    biografico.nacionalidade = data.nacionalidade;
    biografico.nomeNacionalidade = data.nomeNacionalidade;
    biografico.sexo = data.sexo;
    biografico.estadoCivil = data.estadoCivil;
    biografico.dataNascimento = data.dataNascimento;
    biografico.passport = documentIdentification;

    console.log(biografico);

    return biografico;
  }

  export function transformBiometricToObject(data: any) {
    var biometrico = new Biometrico();
    biometrico.altura = data.altura;
    biometrico.assinatura = data.assinatura;
    biometrico.digitalDrt = data.digitalDireito;
    biometrico.digitalEsq = data.digitalEsquerdo;
    biometrico.foto = data.foto;
    biometrico.fotoGs = data.foto_GS;
    biometrico.impressaoDigitalDDedo = data.dedoDigitalDireito;
    biometrico.impressaoDigitalEDedo = data.dedoDigitalEsquerdo;
    biometrico.motivoAusenciaAssinatura = data.motivoAussenciaAssinatura;
    biometrico.motivoAusenciaImpressaoDgtlD =
      data.motivoAussenciaDigitalDireito;
    biometrico.motivoAusenciaImpressaoDgtlE =
      data.motivoAussenciaDigitalEsquerdo;
    return biometrico;
  }

  export function transformAddressToObject(formData: any) {
    var contact = new Contact();
    contact.ilha = formData.ilha;
    contact.nomeIlha = formData.NomeIlha;

    contact.concelho = formData.concelho;
    contact.nomeConcelho = formData.NomeConcelho;

    contact.freguesia = formData.freguesia;
    contact.nomeFreguesia = formData.NomeFreguesia;

    contact.zona = formData.zona;
    contact.nomeZona = formData.NomeZona;

    contact.local = formData.local;
    contact.nomeLocal = formData.NomeLocal;

    contact.email = formData.email;
    contact.telefone = formData.telefone;
    contact.telemovel = formData.telemovel;

    return contact;
  }
}
*/