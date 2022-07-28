import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-details-bon-retour-fournisseur',
  templateUrl: './details-bon-retour-fournisseur.component.html',
  styleUrls: ['./details-bon-retour-fournisseur.component.scss']
})
export class DetailsBonRetourFournisseurComponent implements OnInit {
  lienGetById = "/bonRetourFournisseurs/getById/"

  apiParametres = "/bonRetourFournisseurs/getAllParametres"

  titreDocument = this.fonctionPartagesService.titreDocuments.bonRetourFournisseur
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonRetourFournisseur

  modeTiere = this.fonctionPartagesService.modeTiere.fournisseur

  titreCrud = this.fonctionPartagesService.titreCrud.modifier
  
  pageList="/bonRetourFournisseur/list"

  objectKeys = Object.keys;

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    public fonctionPartagesService: FonctionPartagesService) {
    
  }

  
  isLoading = false


  ngOnInit(): void {
    
  }
}


