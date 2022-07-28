import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { Famille } from 'src/app/model/modelCommerce/famille';
import { FamilleService } from 'src/app/services/serviceBD_Commerce/famille.service';

@Component({
  selector: 'app-details-familles',
  templateUrl: './details-familles.component.html',
  styleUrls: ['./details-familles.component.scss']
})
export class DetailsFamillesComponent implements OnInit {
  lienGetById = "/familles/getById/"

  id="";
  objectKeys = Object.keys;

  request = new Famille()

  famille  = new Famille()

  constructor(
    private familleSer: FamilleService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false

  getFamille(id) {
    this.isLoading = true
    this.familleSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.famille) {
            this.famille[key] = this.request[key]
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
      this.getFamille(this.id)
    }
  }

}
