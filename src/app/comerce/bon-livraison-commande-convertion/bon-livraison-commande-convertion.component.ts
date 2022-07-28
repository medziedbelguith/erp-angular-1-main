import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bon-livraison-commande-convertion',
  templateUrl: './bon-livraison-commande-convertion.component.html',
  styleUrls: ['./bon-livraison-commande-convertion.component.scss']
})
export class BonLivraisonCommandeConvertionComponent implements OnInit {


  lienAjoute = "/bonLivraisons/newBonLivraison"
  
  lienGetById = "/commandes/getById/"

  apiList = "/bonLivraisons/listBonLivraisons"
 
  
  titreDocument = this.fonctionPartagesService.titreDocuments.bonLivraison
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.commande

  modeTiere = this.fonctionPartagesService.modeTiere.client
  
  titreCrud = this.fonctionPartagesService.titreCrud.transfert
 
  pageList="/bonLivraison/list"
  
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