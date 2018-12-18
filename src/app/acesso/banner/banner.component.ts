import { Component, OnInit } from '@angular/core'
import { trigger, style, state, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('visivel <=> escondido', animate('1s ease-in'))
    ])
  ]
})

export class BannerComponent implements OnInit {

  public estado: string = 'visivel';

  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 3000);
  }

  public logicaRotacao(): void {    

    // auxilia na exibição da imagem
    let idx: number = 0;

    // ocultar imagem
    for (let index = 0; index < this.imagens.length; index++) {
      const imagem = this.imagens[index].estado;

      if (imagem === 'visivel') {
        this.imagens[index].estado = 'escondido';

        idx = index === this.imagens.length -1 ? 0 : index + 1;
        
        break;
      }

    }

    // exibir a próxima imagem
    this.imagens[idx].estado = 'visivel';

    setTimeout(() => this.logicaRotacao(), 3000);

  }

}
