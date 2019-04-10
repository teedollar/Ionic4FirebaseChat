import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  login() {
		this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
       .then(
          data => {
            this.errorMessage = '';
            this.router.navigateByUrl('/chat');
            console.log("Login successfully ", data);
          }
        ).catch(
          error => {
            this.errorMessage = error.message;
            //console.log("Got an error: ", error);
          }
        )
  }

  ngOnInit() {
  }

}
