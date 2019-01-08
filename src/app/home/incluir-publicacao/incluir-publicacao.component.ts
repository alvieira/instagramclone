import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as firebase from 'firebase';
import { BdService } from 'src/app/bd.service';
import { ProgressoService } from 'src/app/progresso.service';
import { interval, Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;
  private imagem: any;
  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter();

  public formulario: FormGroup;

  constructor(
    private bd: BdService,
    private progresso: ProgressoService
  ) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      'titulo': new FormControl(null)
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let acompanhamentoUpload = interval(1500)

    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload
    .pipe(takeUntil(continua))
    .subscribe(() => {      
      this.progressoPublicacao = 'andamento'

      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

      if (this.progresso.status === 'concluido') {
        this.progressoPublicacao = 'concluido'
        //emitir um evento do componente parent
        this.atualizarTimeLine.emit();
        continua.next(false)
      }
    })

  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
