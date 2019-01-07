import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

import { ProgressoService } from './progresso.service';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private progresso: ProgressoService) { }

  public publicar(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {
        let nomeImagem = resposta.key;

        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            //acompanhamento do progresso do upload
            (snapshot: any) => {
              this.progresso.status = 'andamento';
              this.progresso.estado = snapshot;
              // console.log('Snapshot capturado no on(): ', snapshot);
            },
            (error) => {
              this.progresso.status = 'erro';
              // console.log(error)
            },
            () => {
              //finalização do processo
              this.progresso.status = 'concluido';
              // console.log('upload completo')
            }
          )
      })
  }

  public consultaPublicacoes(emailUsuario: string): any {

    //consultar as publicações (database)
    firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
      .once('value')
      .then((snapshot: any) => {
        // console.log(snapshot.val());

        let publicacoes: Array<any> = [];

        snapshot.forEach((childSnapshot: any) => {

          let publicacao = childSnapshot.val();

          //consultar a url da imagem (storage)
          firebase.storage().ref()
            .child(`imagens/${childSnapshot.key}`)
            .getDownloadURL()
            .then((url: string) => {

              publicacao.url_imagem = url;

              publicacoes.push(publicacao);
            })
        })
        console.log(publicacoes);
      })
  }
}
