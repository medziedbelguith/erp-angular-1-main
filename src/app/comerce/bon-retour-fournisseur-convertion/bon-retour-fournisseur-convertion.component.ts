import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bon-retour-fournisseur-convertion',
  templateUrl: './bon-retour-fournisseur-convertion.component.html',
  styleUrls: ['./bon-retour-fournisseur-convertion.component.scss']
})
export class BonRetourFournisseurConvertionComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  lienAjoute = "/bonRetourFournisseurs/newBonRetourFournisseur"

  apiList = "/bonRetourFournisseurs/listBonRetourFournisseurs"

  lienGetById = "/bonAchats/getById/"

  apiParametres = "/bonRetourFournisseurs/getAllParametres"
 
  titreDocument = this.fonctionPartagesService.titreDocuments.bonRetourFournisseur
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonAchat

  modeTiere = this.fonctionPartagesService.modeTiere.fournisseur
  
  titreCrud = this.fonctionPartagesService.titreCrud.transfert
 
  pageList="/bonRetourFournisseur/list"
  
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