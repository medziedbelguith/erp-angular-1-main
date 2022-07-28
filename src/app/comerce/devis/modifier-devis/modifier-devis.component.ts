import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-modifier-devis',
  templateUrl: './modifier-devis.component.html',
  styleUrls: ['./modifier-devis.component.scss']
})
export class ModifierDevisComponent implements OnInit {

  
  lienAjoute = "/devis/newDevis"

  apiList = "/devis/listDevis"
 
  apiParametres = "/devis/getAllParametres"

  lienModifie = "/devis/modifierDevis/"

  lienGetById = "/devis/getById/"

  pageList = "/devis/list"
 
  titreDocument = this.fonctionPartagesService.titreDocuments.devis

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
 
 