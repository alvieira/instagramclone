import { Component, OnInit } from '@angular/core';
import { BdService } from 'src/app/bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string;

  constructor(private bd: BdService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      this.atualizarTimeLine()
    })

    
  }

  public atualizarTimeLine() : void {
    this.bd.consultaPublicacoes(this.email);
  }

}
