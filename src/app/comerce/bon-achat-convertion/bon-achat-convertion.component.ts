import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bon-achat-convertion',
  templateUrl: './bon-achat-convertion.component.html',
  styleUrls: ['./bon-achat-convertion.component.scss']
})
export class BonAchatConvertionComponent implements OnInit {

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  lienAjoute = "/bonAchats/newBonAchat"

  lienGetById = "/bonCommandes/getById/"
  
  apiList = "/devis/listDevis"

  apiParametres = "/bonAchats/getAllParametres"

  titreDocument = this.fonctionPartagesService.titreDocuments.bonAchat
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonCommande

  modeTiere = this.fonctionPartagesService.modeTiere.fournisseur
  
  titreCrud = this.fonctionPartagesService.titreCrud.transfert
 
  pageList="/bonAchat/list"
  
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