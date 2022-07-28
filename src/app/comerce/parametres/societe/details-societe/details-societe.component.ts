import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-societe',
  templateUrl: './details-societe.component.html',
  styleUrls: ['./details-societe.component.scss']
})
export class DetailsSocieteComponent implements OnInit {
  lienGetById = "/modeReglement/getById/"

  id="";
  objectKeys = Object.keys;

  request = {
    libelle: "",
    ordre: "",
    modeReglement: "",
  }

  modeReglement = {
    libelle: "",
    ordre: "",
    modeReglement: "",
  }

  erreurModeReglement = {
    libelle: "",
    ordre: "",
    modeReglement: "",
  }
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false

  getModeReglement(id) {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        console.log(res)
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
            console.log(response.resultat)
          for (let key in this.modeReglement) {
            this.modeReglement[key] = this.request[key]
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if(this.id.length > 1){
      this.getModeReglement(this.id)
    }
  }

}
