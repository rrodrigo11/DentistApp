import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SessionService } from 'src/app/common/services/session.service';

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

  // loggedIn:boolean = false;

  form:FormGroup;
  inputType:string = 'password';
  loginError:boolean;

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
          this.sessionService.saveToken(response.token);
          // this.authService.save(response, true);
          // this.loginError = false;
          // this.router.navigate(['/recientes']);
        }).catch(err=>{
          console.log('Encontre error:', err);
        });
      }
    });

  }

  hacerLogin(){
    console.log('Ya hice click en el boton');
  }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
