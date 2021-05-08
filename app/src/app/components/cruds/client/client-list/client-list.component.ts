import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/common/services/session.service';
import { NgModalComponent } from 'src/app/components/ng-modal/ng-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




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

  constructor(private activatedRoute:ActivatedRoute, private sessionService: SessionService,  private _NgbModal: NgbModal ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.sessionService.getClients(params.email).then(response=>{
        console.log("Respuesta de la API: ", response);
        this.users = response;
      }).catch(err=>{
        console.log("Error de API:",err);
      });
    })
  }

  myFunction()
  {}

  deleteClient(idpaciente:string, paciente:string){
    if(confirm("Are you sure to delete "+ paciente)) {
      this.activatedRoute.params.subscribe(params=>{
        this.sessionService.deleteClient(params.email, idpaciente).then(response=>{
          console.log("Respuesta de la API: ", response);
          this.users = response;
        }).catch(err=>{
          console.log("Error de API:",err);
        });
      })
    } 
    return false
  }
  openModal() {
    this._NgbModal.open(NgModalComponent, {
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
  }

}
