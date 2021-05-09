import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/common/services/session.service';
import { NgModalComponent } from 'src/app/components/ng-modal/ng-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/common/services/authentication.service';




interface User{
  id:number,
  name: string,
  email:string,
  phone:string
}

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  users:any[] =[]
  loggedIn:boolean = false;

  constructor(private activatedRoute:ActivatedRoute,
     private sessionService: SessionService,
      private _NgbModal: NgbModal,
      private auth: AuthenticationService,
      private router: Router ) {
        this.auth.loginStatus.subscribe(flag=>{
          this.loggedIn=flag;
          if(this.loggedIn){
           // this.router.navigate(['/client/list']);
          }else{
            this.router.navigate(['/login']);
          }
        })
      }

  ngOnInit(): void {
      this.sessionService.getClients(localStorage.getItem("email")).then(response=>{
        console.log("Respuesta de la API: ", response);
        this.users = response;
      }).catch(err=>{
        console.log("Error de API:",err);
      });
  }

  myFunction()
  {}

  deleteClient(email:string, paciente:string){
    if(confirm("Are you sure to delete "+ paciente)) {

        this.sessionService.deleteClient(email).then(response=>{
          console.log("Respuesta de la API: ", response);
          this.users = response;
        }).catch(err=>{
          console.log("Error de API:",err);
        });
    } 
    return false
  }
  openModal(index:number) {
    const modalRef = this._NgbModal.open(NgModalComponent, {
      windowClass: 'modal-job-scrollable'
    });

    // upwrap the "app-ng-modal" data to enable the "modal-dialog-scrollable"
    // and make the modal scrollable
    (() => {
      const node: HTMLElement | null = document.querySelector('app-ng-modal');
      if (node) {
        while (node.firstChild) {
          (node.parentNode as HTMLElement).insertBefore(node.firstChild, node);
        }
      }
      // make the modal scrollable by adding the class .modal-dialog-scrollable
      // here wait for one second so that we can find the .modal-dialog
      setTimeout(() => {
        const modalDialog = document.querySelector('.modal-job-scrollable .modal-dialog');
        if (modalDialog) {
          modalDialog.classList.add('modal-dialog-scrollable');
        }
      }, 1000)
    })();
    modalRef.componentInstance.user = this.users[index]
    modalRef.result.then((result) => {
      if (result) {
      console.log(result);
      this.sessionService.updateClient(result.email, result).then(response=>{
        console.log("Respuesta de la API: ", response);
        this.users = response;
      }).catch(err=>{
        console.log("Error de API:",err);
      });
      }
      });

  }
  
  addPacient(){
    this.router.navigate(['/client/register']);
  }

}
