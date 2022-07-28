import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { ProjetInterne } from 'src/app/model/modelCommerce/projetInterne';
import { ProjetInterneService } from 'src/app/services/serviceBD_Commerce/projetInterne.service';


@Component({
  selector: 'app-details-projet-interne',
  templateUrl: './details-projet-interne.component.html',
  styleUrls: ['./details-projet-interne.component.scss']
})
export class DetailsProjetInterneComponent implements OnInit {
  lienGetById = "/projetInternes/getById/"

  id="";
  objectKeys = Object.keys;

  request = new ProjetInterne()

  projetInterne = new ProjetInterne()

  constructor(
    public informationGenerale: InformationsService,
    private projetInterSer: ProjetInterneService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false

  getProjetInterne(id) {
    this.isLoading = true
    this.projetInterSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.projetInterne) {
            this.projetInterne[key] = this.request[key]
          }
          this.projetInterne.dateDebut = formatDate(new Date(this.projetInterne.dateDebut), 'yyyy-MM-dd', 'en');
          this.projetInterne.dateFin = formatDate(new Date(this.projetInterne.dateFin), 'yyyy-MM-dd', 'en');         
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if(this.id.length > 1){
      this.getProjetInterne(this.id)
    }
  }
}
