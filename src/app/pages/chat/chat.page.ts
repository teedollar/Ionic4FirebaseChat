import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  email:string = '';
  username: string
  message:string = '';
  allChat: any = [];
  chats: any;

  constructor(private afdb: AngularFireDatabase, private af: AngularFireAuth) {
  	 this.email = this.af.auth.currentUser.email;
  	 this.username = this.email.split("@")[0];

  	 this.getMessage();
  }

  sendMessage() {
  	this.allChat.push({
  		email: this.email,
  		message: this.message
  	})
  	.then( data => {
  		this.message = '';
  		this.getMessage();
  	})
  	.catch(error => console.log(error))
  }

  getMessage() {
  	this.allChat = this.afdb.list('/chats');
  	this.allChat.valueChanges().subscribe( data => {
  		this.chats = data;
  	});
  }

  ngOnInit() {
  	this.allChat.push({
  		specialMessage: true,
  		message: `${this.username} has joined the conversation`
  	});
  	

  }

  ionViewWillLeave() {
  	this.allChat.push({
  		specialMessage: true,
  		message: `${this.username} has left the conversation`
  	});
  }

}
