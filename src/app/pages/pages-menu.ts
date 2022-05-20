import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/default',
    home: true,
  },
 
  {
    title: 'TAREFAS',
    group: true,
  },
/*Gestão de Esquadra Trânsito*/
  {
    title: "Gestão Esquadra Trânsito",
    icon: "list-outline",
    children: [

  /*Gestão de Efectivos */
  {
    title: 'Efectivos',
    icon: 'people-outline',
    children: [
      {
        title: 'Lista de efectivos',
        link: '/pages/apre-documents',
        icon: 'archive-outline',
      },
      {
        title: 'Ferias',
        link: '/pages/apre-documents',
        icon: 'book-open-outline',
      },
      {
        title: 'Remunerados',
        link: '/pages/apre-documents',
        icon: 'checkmark-circle-2-outline',
      },
    ],
  },  
   /*Gestão de Apreensões */
  {
    title: "Apreensões",
    icon: "unlock-outline",
    children: [
      {
        title: "Documentos ",
        icon: 'archive-outline',
        children: [
          {
            title: 'Carta de Condução',
            link: '/pages/apre-carta',
          },
          {
            title: 'Titulo e Livrete',
            link: '/pages/apre-tlivrete',
          },
        ],
      },
      {
        title: "Veiculos",
        icon: 'car-outline',
        children: [
          {
            title: 'Automoveis',
            link: '/pages/apre-documents',
          },
          {
            title: 'Velocipede',
            link: '/pages/apre-documents',
          },
        ],
      },
    ],
  },
  /*Gestão de Acidentes*/
  {
    title: "Acidentes Rodoviário",
    icon: "car-outline",
    children: [
      {
        title: "Lançamentos ",
        icon: 'archive-outline',
      },
      {
        title: "Pesquisas",
        icon: 'search-outline',
      },
      {
        title: "Vítimas ",
        icon: 'people-outline',
      },
      {
        title: "Reconstituição ",
        icon: 'backspace-outline',
      },
    ],
  },
   /*Gestão de Detenções*/
  {
    title: "Detenções",
    icon: "shuffle-2-outline",
    children: [
      {
        title: "Registos ",
        icon: 'edit-2-outline',
      
      },
      {
        title: "Medidas Cautelares",
        icon: 'lock-outline',
  
      },
    ],
  },
     /*Gestão de Reclamações*/
  {
    title: "Reclamações",
    icon: "file-text-outline",
    children: [
      {
        title: "Registos ",
        icon: 'edit-2-outline',
      
      },
      {
        title: "Despachos",
        icon: 'lock-outline',
  
      },
    ],
  },
    /*Gestão de Autuações*/
  {
    title: "Gestão de Autuações",
    icon: "book-open-outline",
    children: [
      {
        title: "Registos ",
        icon: 'edit-2-outline',
      
      },
      {
        title: "Despachos",
        icon: 'lock-outline',
  
      },
    ],
  },
              ],
  },

  {
    title: '',
    group: true,
  },

/*Pagina Atendimento*/
{
  title: "Atendimento",
  icon: "keypad-outline",
  children: [


/*Gestão de Efectivos */
{
  title: 'Efectivos',
  icon: 'people-outline',
  children: [
    {
      title: 'Lista de efectivos',
      link: '/pages/apre-documents',
      icon: 'archive-outline',
    },
    {
      title: 'Ferias',
      link: '/pages/apre-documents',
      icon: 'book-open-outline',
    },
    {
      title: 'Serviços remunerados',
      link: '/pages/apre-documents',
      icon: 'list-outline',
    },
  ],
},

{
  title: '',
  group: true,
},

 /*Gestão de Apreensões */
{
  title: "Apreensões",
  icon: "unlock-outline",
  children: [
    {
      title: "Documentos ",
      icon: 'archive-outline',
      children: [
        {
          title: 'Carta de Condução',
          link: '/pages/apre-carta',
        },
        {
          title: 'Titulo e Livrete',
          link: '/pages/apre-tlivrete',
        },
      ],
    },
    {
      title: "Veiculos",
      icon: 'car-outline',
      children: [
        {
          title: 'Automoveis',
          link: '/pages/apre-documents',
        },
        {
          title: 'Velocipede',
          link: '/pages/apre-documents',
        },
      ],
    },
  ],
},

{
  title: '',
  group: true,
},

/*Gestão de Acidentes*/
{
  title: "Acidentes Rodoviário",
  icon: "settings-outline",
  children: [
    {
      title: "Lançamentos ",
      icon: 'archive-outline',
    },
    {
      title: "Pesquisas",
      icon: 'search-outline',
    },
    {
      title: "Vítimas ",
      icon: 'people-outline',
    },
    {
      title: "Reconstituição ",
      icon: 'backspace-outline',
    },
  ],
},



],
},

{
  title: '',
  group: true,
},
/*Gestão de Parque Auto*/
{
  title: "Gestão de Parque Auto",
  icon: "options-2-outline",
  children: [


/*Gestão de Efectivos */
{
  title: 'Efectivos',
  icon: 'people-outline',
  children: [
    {
      title: 'Lista de efectivos',
      link: '/pages/apre-documents',
      icon: 'archive-outline',
    },
    {
      title: 'Ferias',
      link: '/pages/apre-documents',
      icon: 'book-open-outline',
    },
    {
      title: 'Serviços remunerados',
      link: '/pages/apre-documents',
      icon: 'list-outline',
    },
  ],
},

{
  title: '',
  group: true,
},

 /*Gestão de Apreensões */
{
  title: "Apreensões",
  icon: "unlock-outline",
  children: [
    {
      title: "Documentos ",
      icon: 'archive-outline',
      children: [
        {
          title: 'Carta de Condução',
          link: '/pages/apre-carta',
        },
        {
          title: 'Titulo e Livrete',
          link: '/pages/apre-tlivrete',
        },
      ],
    },
    {
      title: "Veiculos",
      icon: 'car-outline',
      children: [
        {
          title: 'Automoveis',
          link: '/pages/apre-documents',
        },
        {
          title: 'Velocipede',
          link: '/pages/apre-documents',
        },
      ],
    },
  ],
},

{
  title: '',
  group: true,
},

/*Gestão de Acidentes*/
{
  title: "Acidentes Rodoviário",
  icon: "settings-outline",
  children: [
    {
      title: "Lançamentos ",
      icon: 'archive-outline',
    },
    {
      title: "Pesquisas",
      icon: 'search-outline',
    },
    {
      title: "Vítimas ",
      icon: 'people-outline',
    },
    {
      title: "Reconstituição ",
      icon: 'backspace-outline',
    },
  ],
},

],
},



];
