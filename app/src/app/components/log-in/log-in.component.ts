import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SessionService } from 'src/app/common/services/session.service';

interface Credentials{
  email:string ;
  password:string ;
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit{

  user:any = {};
  token:any;

  credentials:Credentials = {
    email: "test111@test.com",
    password: "123456"
  };

  // loggedIn:boolean = false;

  form:FormGroup;
  inputType:string = 'password';
  loggedIn:boolean;
  idDentista:string = "";
  constructor(
    private formBuilder:FormBuilder,
    private sessionService:SessionService,
    private authService:AuthenticationService,
    private router:Router,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    
    this.socialAuthService.authState.subscribe((user) => {
      if(user) {
         console.log('Google User?', user);
        this.sessionService.googleLogin(user.idToken).then(response => {
          console.log('Respuesta de API: ', response.token);
          this.user =  this.sessionService.getIdDentist(this.credentials.email).then(response=>{
            this.user = response;
            this.authService.saveToken(this.token,this.credentials.email,this.user._id);
            let routerLink = "/client/list/"+this.user._id;
            this.router.navigate([routerLink]);
           });
          //this.authService.saveToken(response.token,user.email);
          // this.authService.save(response, true);
        }).catch(err=>{
          console.log('Encontre error:', err);
        });
      }
    });

    this.authService.loginStatus.subscribe(flag=>{
      this.loggedIn=flag;
      if(this.loggedIn){
        console.log(this.user._id)
        this.router.navigate(['/client/list'+this.user._id]);
      }
    })
  }

   hacerLogin(){
    console.log("Si funciona");
    this.sessionService.login(this.credentials).then(response=>{
      this.token = response.token;
       this.user =  this.sessionService.getIdDentist(this.credentials.email).then(response=>{
        this.user = response;
        this.authService.saveToken(this.token,this.credentials.email,this.user._id);
        let routerLink = "/client/list/"+this.user._id;
        this.router.navigate([routerLink]);
       });
    });
  }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
