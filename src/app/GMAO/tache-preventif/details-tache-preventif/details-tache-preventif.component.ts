import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { TachePreventif } from 'src/app/model/modelGMAO/tachePreventif.model';
import { TachePreventifService } from 'src/app/services/serviceBD_GMAO/tache-preventif.service';

@Component({
  selector: 'app-details-tache-preventif',
  templateUrl: './details-tache-preventif.component.html',
  styleUrls: ['./details-tache-preventif.component.scss']
})
export class DetailsTachePreventifComponent implements OnInit {
  id="";
  objectKeys = Object.keys;

  request = {
    planPreventif: "",
    dateExecution: "",
    personnel: "",
    machine: "",
    montant: "",
    notes: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

   tachePreventif: TachePreventif = {
    planPreventif: "",
    dateExecution: "",
    personnel: [],
    machine: "",
    montant: 0,
    notes: "",
  }

  constructor(
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private tachePreventifSe: TachePreventifService,) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false
  getTachePreventif(id) {
    this.isLoading = true
    this.tachePreventifSe.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.tachePreventif) {
              this.tachePreventif[key] = this.request[key]
            }
            this.tachePreventif.dateExecution = formatDate(new Date(this.tachePreventif.dateExecution), 'yyyy-MM-dd', 'en');
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
      this.getTachePreventif(this.id)
    }
  }
}
