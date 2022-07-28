import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-ajout-bon-livraison',
  templateUrl: './ajout-bon-livraison.component.html',
  styleUrls: ['./ajout-bon-livraison.component.scss']
})
export class AjoutBonLivraisonComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  lienAjoute = "/bonLivraisons/newBonLivraison"

  apiList = "/bonLivraisons/listBonLivraisons"

  apiParametres = "/bonlivraisons/getAllParametres"

  lienModifie = "/bonLivraisons/modifierBonLivraison/"

  lienGetById = "/bonLivraisons/getById/"

  pageList="/bonLivraison/list"

  titreDocument = this.fonctionPartagesService.titreDocuments.bonLivraison
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonLivraison

  modeTiere = this.fonctionPartagesService.modeTiere.client

  titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  constructor(public informationGenerale:InformationsService, public fonctionPartagesService:FonctionPartagesService){
  }
  
  ngOnInit(): void {
  }

}

