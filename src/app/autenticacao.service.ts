import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  public cadastrarUsuario(usuario: Usuario): void {
    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
    .then((resposta: any) => {
      
      // remover a senha do atributo senha do objeto usuario
      delete usuario.senha;

      // registrando dados complementares do usuario no path email na base64
      // btoa => javascript para encriptar senha
      firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
      .set(usuario)
    })
    .catch((erro: Error) => {
      console.log(erro)
    });
  }
}
