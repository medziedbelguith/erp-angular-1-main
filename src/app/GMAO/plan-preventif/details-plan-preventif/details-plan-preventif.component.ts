import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { PlanPreventif } from 'src/app/model/modelGMAO/planPreventif.model';
import { PlanPreventifService } from 'src/app/services/serviceBD_GMAO/plan-preventif.service';

@Component({
  selector: 'app-details-plan-preventif',
  templateUrl: './details-plan-preventif.component.html',
  styleUrls: ['./details-plan-preventif.component.scss']
})
export class DetailsPlanPreventifComponent implements OnInit {
  id="";
  objectKeys = Object.keys;

  request = {
    libelle: "",
    operationPreventif: "",
    machine: "",
    dernierDate: "",
    prochaineDate: "",
    periodicite: "",
    alerteAvant: "",
    interne: "",
    dureeExecution: "",
    montant: "",
    notes: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
   }

   planPreventif: PlanPreventif = {
    libelle: "",
    operationPreventif: "",
    machine: "",
    dernierDate: "",
    prochaineDate: "",
    periodicite: 0,
    alerteAvant: 0,
    interne: "true",
    dureeExecution: 0,
    montant: 0,
    notes: "",
  }

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private planPreventifSe: PlanPreventifService,) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false
  getPlanPreventif(id) {
    this.isLoading = true
    this.planPreventifSe.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.planPreventif) {
              this.planPreventif[key] = this.request[key]
            }
            this.planPreventif.dernierDate = formatDate(new Date(this.planPreventif.dernierDate), 'yyyy-MM-dd', 'en');
            this.planPreventif.prochaineDate = formatDate(new Date(this.planPreventif.prochaineDate), 'yyyy-MM-dd', 'en');  
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
      this.getPlanPreventif(this.id)
    }
  }
}
