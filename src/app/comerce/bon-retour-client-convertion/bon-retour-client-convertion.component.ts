import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-bon-retour-client-convertion',
  templateUrl: './bon-retour-client-convertion.component.html',
  styleUrls: ['./bon-retour-client-convertion.component.scss']
})
export class BonRetourClientConvertionComponent implements OnInit {

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  lienAjoute = "/bonRetourClients/newBonRetourClient"

  lienGetById = "/bonLivraisons/getById/"

  apiList = "/bonRetourClients/listBonRetourClients"
 
  apiParametres = "/bonRetourClients/getAllParametres"
   
  titreDocument = this.fonctionPartagesService.titreDocuments.bonRetourClient
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonLivraison

  modeTiere = this.fonctionPartagesService.modeTiere.client
  
  titreCrud = this.fonctionPartagesService.titreCrud.transfert
 
  pageList="/bonRetourClient/list"
  
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