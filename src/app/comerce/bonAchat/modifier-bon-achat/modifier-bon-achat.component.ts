import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-modifier-bon-achat',
  templateUrl: './modifier-bon-achat.component.html',
  styleUrls: ['./modifier-bon-achat.component.scss']
})
export class ModifierBonAchatComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  lienAjoute = "/bonAchats/newBonAchat"

  apiList = "/bonAchats/listBonAchats"

  apiParametres = "/bonAchats/getAllParametres"

  lienModifie = "/bonAchats/modifierBonAchat/"

  lienGetById = "/bonAchats/getById/"

  pageList="/bonAchat/list"

  apiAjouteReception = "/bonAchats/addReception/"

  titreDocument = this.fonctionPartagesService.titreDocuments.bonAchat

  modeTiere = this.fonctionPartagesService.modeTiere.fournisseur
  
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
 
 