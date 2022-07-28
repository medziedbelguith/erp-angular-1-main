import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-modifier-commande',
  templateUrl: './modifier-commande.component.html',
  styleUrls: ['./modifier-commande.component.scss']
})
export class ModifierCommandeComponent implements OnInit {

  lienAjoute = "/commandes/newCommande"

  apiList = "/commandes/listCommandes"

  apiParametres = "/commandes/getAllParametres"

  lienModifie = "/commandes/modifierCommande/"

  lienGetById = "/commandes/getById/"

  pageList = "/commande/list"
 
  titreDocument = this.fonctionPartagesService.titreDocuments.commande

  modeTiere = this.fonctionPartagesService.modeTiere.client
  
  titreCrud = this.fonctionPartagesService.titreCrud.modifier
 
  
  constructor(
    private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService, 
    public fonctionPartagesService:FonctionPartagesService,
    private route: ActivatedRoute, 
    private router: Router, ) 
  {
         
  }
  
  ngOnInit(): void {
  }

}
 
 