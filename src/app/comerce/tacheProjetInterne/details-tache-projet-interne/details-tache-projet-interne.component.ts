import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import {formatDate} from '@angular/common';
import { TacheProjetInterne } from 'src/app/model/modelCommerce/tacheProjetInterne';
import { TacheProjetInterneService } from 'src/app/services/serviceBD_Commerce/tacheProjetInterne.service';

@Component({
  selector: 'app-details-tache-projet-interne',
  templateUrl: './details-tache-projet-interne.component.html',
  styleUrls: ['./details-tache-projet-interne.component.scss']
})
export class DetailsTacheProjetInterneComponent implements OnInit {

  id="";
  objectKeys = Object.keys;

  request = new TacheProjetInterne()

  tacheProjetInterne = new TacheProjetInterne()

  constructor(
    private projetTacheInterSer: TacheProjetInterneService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false
  getTacheProjetInterne(id) { 
    this.isLoading = true
    this.projetTacheInterSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.tacheProjetInterne) {
            this.tacheProjetInterne[key] = this.request[key]
          }
           this.tacheProjetInterne.dateDebut = formatDate(new Date(this.tacheProjetInterne.dateDebut), 'yyyy-MM-ddThh:mm', 'en');
           this.tacheProjetInterne.dateFin = formatDate(new Date(this.tacheProjetInterne.dateFin), 'yyyy-MM-ddThh:mm', 'en');         
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
      this.getTacheProjetInterne(this.id)
    }
  }
}
