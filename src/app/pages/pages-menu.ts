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
    icon: "list-outline",
    children: [

  /*Gestão de Efectivos */
  {
    title: 'Departamento',
    icon: 'outline',

  },  
   /*Gestão de Apreensões */
  {
    title: "Sala",
    icon: "unlock-outline",

  },

              ],
  },

];
