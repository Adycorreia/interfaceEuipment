import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    Desenvolvido pelo<b><a href="https://devinvestidor.com.br/portfolio/curso-full-stack-completo/" target="_blank">NASA da PN -2022</a></b>
    </span>
  `,
})
export class FooterComponent {
}
