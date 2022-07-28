import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { SousFamille } from 'src/app/model/modelCommerce/sousFamille';
import { SousFamilleService } from 'src/app/services/serviceBD_Commerce/sousFamille.service';

@Component({
  selector: 'app-details-sous-familles',
  templateUrl: './details-sous-familles.component.html',
  styleUrls: ['./details-sous-familles.component.scss']
})
export class DetailsSousFamillesComponent implements OnInit {
  lienGetById = "/sousFamilles/getById/"

  id="";
  objectKeys = Object.keys;

  request = {
    libelle: "",
    ordre: "",
    sousFamilles: "",
  }

  sousFamille = new SousFamille()

  constructor(
    private sousFamilleSer: SousFamilleService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false

  getSousFamille(id) {
    this.isLoading = true
    this.sousFamilleSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.sousFamille) {
            this.sousFamille[key] = this.request[key]
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getSousFamille(this.id)
    }
  }

}
