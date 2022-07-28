import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { Technicien } from 'src/app/model/modelGMAO/technicien.model';
import { TechnicienService } from 'src/app/services/serviceBD_GMAO/technicien.service';

@Component({
  selector: 'app-details-technicien',
  templateUrl: './details-technicien.component.html',
  styleUrls: ['./details-technicien.component.scss']
})
export class DetailsTechnicienComponent implements OnInit {
  id="";
  objectKeys = Object.keys;

  request = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  technicien: Technicien  = {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: "",
    adresse: "",
  }

  constructor(
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private technicienSe: TechnicienService,
    ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  isLoading = false
  getTechnicien(id) {
    this.isLoading = true
    this.technicienSe.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.technicien) {
              this.technicien[key] = this.request[key]
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
      this.getTechnicien(this.id)
    }
  }
}
