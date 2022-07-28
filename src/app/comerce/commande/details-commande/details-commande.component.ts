import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.component.html',
  styleUrls: ['./details-commande.component.scss']
})
export class DetailsCommandeComponent implements OnInit {
  lienGetById = "/commandes/getById/"

  apiParametres = "/commandes/getAllParametres"

  titreDocument = this.fonctionPartagesService.titreDocuments.commande
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.commande

  modeTiere = this.fonctionPartagesService.modeTiere.client

  titreCrud = this.fonctionPartagesService.titreCrud.modifier
  
  pageList="/commande/list"

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


