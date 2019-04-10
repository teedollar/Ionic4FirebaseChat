import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  signup() {
  	this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
  		.then(
  			data => {
  				this.router.navigateByUrl('/login');
  				console.log("Registered successfully ", data);
  			}
  		).catch(
  			error => {
  				console.log("Got an error: ", error);
  			}
  		)
  }

  ngOnInit() {
  }

}
