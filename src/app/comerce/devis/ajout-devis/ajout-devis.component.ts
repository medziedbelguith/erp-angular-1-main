import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajout-devis',
  templateUrl: './ajout-devis.component.html',
  styleUrls: ['./ajout-devis.component.scss']
})
export class AjoutDevisComponent implements OnInit {
  
  lienAjoute = "/devis/newDevis"

  apiList = "/devis/listDevis"
 
  apiParametres = "/devis/getAllParametres"

  lienModifie = "/devis/modifierDevis/"

  lienGetById = "/devis/getById/"

  pageList = "/devis/list"
 
  titreDocument = this.fonctionPartagesService.titreDocuments.devis

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
 
 