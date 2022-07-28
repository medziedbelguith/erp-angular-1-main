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
  selector: 'app-ajout-bon-commande',
  templateUrl: './ajout-bon-commande.component.html',
  styleUrls: ['./ajout-bon-commande.component.scss']
})
export class AjoutBonCommandeComponent implements OnInit {
  lienAjoute = "/bonCommandes/newBonCommande"

  apiList = "/bonCommandes/listBonCommandes"

  apiParametres = "/bonCommandes/getAllParametres"

  lienModifie = "/bonCommandes/modifierBonCommande/"

  lienGetById = "/bonCommandes/getById/"
  
  pageList = "/bonCommande/list"
 
  titreDocument = this.fonctionPartagesService.titreDocuments.bonCommande

  modeTiere = this.fonctionPartagesService.modeTiere.fournisseur
  
  titreCrud = this.fonctionPartagesService.titreCrud.ajouter
 
  
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
 
 