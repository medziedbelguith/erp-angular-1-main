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
  selector: 'app-ajout-bon-achat',
  templateUrl: './ajout-bon-achat.component.html',
  styleUrls: ['./ajout-bon-achat.component.scss']
})
export class AjoutBonAchatComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  lienAjoute = "/bonAchats/newBonAchat"

  apiList = "/bonAchats/listBonAchats"

  apiParametres = "/bonAchats/getAllParametres"

  lienModifie = "/bonAchats/modifierBonAchat/"

  lienGetById = "/bonAchats/getById/"
 
  titreDocument = this.fonctionPartagesService.titreDocuments.bonAchat

  modeTiere = this.fonctionPartagesService.modeTiere.fournisseur
  
  titreCrud = this.fonctionPartagesService.titreCrud.ajouter
 
  pageList="/bonAchat/list"

  constructor(
    private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService, 
    public fonctionPartagesService:FonctionPartagesService,
    private route: ActivatedRoute, 
    private router: Router ) 
  {
         
  }
  
  ngOnInit(): void {
  }

}
 
 