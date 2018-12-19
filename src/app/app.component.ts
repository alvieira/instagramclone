import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  

  ngOnInit() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBOE6OGy1-d8I_3Bx7pCcBVD7NGQe-Abkg",
      authDomain: "jta-instagram-clone-661ea.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-661ea.firebaseio.com",
      projectId: "jta-instagram-clone-661ea",
      storageBucket: "jta-instagram-clone-661ea.appspot.com",
      messagingSenderId: "843025038178"
    };
    firebase.initializeApp(config);
  }
}
