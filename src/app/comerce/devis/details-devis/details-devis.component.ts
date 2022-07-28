import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-details-devis',
  templateUrl: './details-devis.component.html',
  styleUrls: ['./details-devis.component.scss']
})
export class DetailsDevisComponent implements OnInit {
  lienGetById = "/devis/getById/"

  apiParametres = "/devis/getAllParametres"

  titreDocument = this.fonctionPartagesService.titreDocuments.bonAchat
  
  titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonAchat

  modeTiere = this.fonctionPartagesService.modeTiere.fournisseur

  titreCrud = this.fonctionPartagesService.titreCrud.modifier
  
  pageList="/devis/list"

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
