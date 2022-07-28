import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-modifier-bon-livraison',
  templateUrl: './modifier-bon-livraison.component.html',
  styleUrls: ['./modifier-bon-livraison.component.scss']
})
export class ModifierBonLivraisonComponent implements OnInit {
  bonLivraisonFormGroup: FormGroup;

  lienModifie = "/bonLivraisons/modifierBonLivraison/"
  lienGetById = "/bonLivraisons/getById/"

 

  constructor(
    private http: HttpClient,
    public informationGenerale:InformationsService, public fonctionPartagesService:FonctionPartagesService
    ) {

   
  }


  ngOnInit(): void {
    
  }

}
