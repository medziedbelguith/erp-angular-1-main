import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-details-bon-commande',
  templateUrl: './details-bon-commande.component.html',
  styleUrls: ['./details-bon-commande.component.scss']
})
export class DetailsBonCommandeComponent implements OnInit {
  lienGetById = "/bonCommandes/getById/"

  
  apiParametres = "/bonCommandes/getAllParametres"

  titreDocument = this.fonctionPartagesService.titreDocuments.bonCommande
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonCommande

  modeTiere = this.fonctionPartagesService.modeTiere.fournisseur

  titreCrud = this.fonctionPartagesService.titreCrud.modifier
  
  pageList="/bonCommande/list"

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


