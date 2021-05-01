import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

interface Credentials{
  username:string ;
  password:string ;

}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit{


  credentials:Credentials = {
    username: "test",
    password: "12345"
  };

  loggedIn:boolean = false;

  constructor (private socialAuthService:SocialAuthService){}
  
  ngOnInit():void{
    this.socialAuthService.authState.subscribe(user=>{

      if(user){
        console.log('Se inicio sesion:', user);
      }else{
        console.log('No hay sesion');
      }
      
    })
  }

  hacerLogin(){
    console.log('Ya hice click en el boton', this.credentials);
  }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
