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
  /*Gestão de Equipamentos*/
  {
    title: "Gestão de Equipamentos",
    icon: "list-outline",
    link: '/pages/equipamento',

  },

  {
    title: '',
    group: true,
  },

  /*Parametrização*/
  {
    title: "Parametrização",
    icon: "options-2-outline",
    children: [

      {
        title: 'Funcionario',
        icon: 'person-done-outline',
        link: '/pages/employee',
      },

      {
        title: 'Departamento',
        icon: 'layers-outline',
       
      },

      {
        title: "Sala",
        icon: "browser-outline",
        link: '/pages/livingRoom',

      },

    

    ],
  },

];
