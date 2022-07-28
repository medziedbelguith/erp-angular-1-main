import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commande-convertion',
  templateUrl: './commande-convertion.component.html',
  styleUrls: ['./commande-convertion.component.scss']
})
export class CommandeConvertionComponent implements OnInit {

 
  lienAjoute = "/commandes/newCommande"
  
  lienGetById = "/devis/getById/"

  apiList = "/bonLivraisons/listBonLivraisons"
 
  
  titreDocument = this.fonctionPartagesService.titreDocuments.commande
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.devis

  modeTiere = this.fonctionPartagesService.modeTiere.client
  
  titreCrud = this.fonctionPartagesService.titreCrud.transfert
 
  pageList="/commande/list"
  
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

