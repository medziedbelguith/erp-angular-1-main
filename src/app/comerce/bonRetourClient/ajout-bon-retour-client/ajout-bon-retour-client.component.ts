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
  selector: 'app-ajout-bon-retour-client',
  templateUrl: './ajout-bon-retour-client.component.html',
  styleUrls: ['./ajout-bon-retour-client.component.scss']
})
export class AjoutBonRetourClientComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  lienAjoute = "/bonRetourClients/newBonRetourClient"

  apiList = "/bonRetourClients/listBonRetourClients"
 
  apiParametres = "/bonRetourClients/getAllParametres"

  lienModifie = "/bonRetourClients/modifierBonRetourClient/"

  lienGetById = "/bonRetourClients/getById/"

  pageList = "/bonRetourClient/list"
 
  titreDocument = this.fonctionPartagesService.titreDocuments.bonRetourClient

  modeTiere = this.fonctionPartagesService.modeTiere.client
  
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
 
 