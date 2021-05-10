import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SessionService } from 'src/app/common/services/session.service';
import { NgModalComponent } from 'src/app/components/ng-modal/ng-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  user:any = {}

  loggedIn:boolean = false;

  constructor(private router: Router,
    private auth: AuthenticationService,
    private activatedRoute:ActivatedRoute,
    private sessionService: SessionService,
    private _NgbModal: NgbModal
    ) {
      this.auth.loginStatus.subscribe(flag=>{
        this.loggedIn=flag;
        if(!this.loggedIn){
          this.router.navigate(['/login']);
        }
      })
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params.email)
      this.sessionService.getClient(params.email).then(response=>{
        console.log("Respuesta de la API: ", response);
        this.user = response;
      }).catch(err=>{
        console.log("Error de API:",err);
      });
    })
  }
  openModal() {
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
    modalRef.componentInstance.user = this.user
    modalRef.result.then((result) => {
      if (result) {
      console.log(result);
      this.sessionService.updateClient(result.email, result).then(response=>{
        console.log("Respuesta de la API: ", response);
        this.user = response;
      }).catch(err=>{
        console.log("Error de API:",err);
      });
      }
      });

  }

}
