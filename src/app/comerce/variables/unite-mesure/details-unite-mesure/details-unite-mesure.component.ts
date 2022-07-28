import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-unite-mesure',
  templateUrl: './details-unite-mesure.component.html',
  styleUrls: ['./details-unite-mesure.component.scss']
})
export class DetailsUniteMesureComponent implements OnInit {
  lienGetById = "/uniteMesures/getById/"

  id="";
  objectKeys = Object.keys;

  request = {
    libelle: "",
    ordre: "",
    uniteMesures: "",
  }

  uniteMesure = {
    libelle: "",
    ordre: "",
    uniteMesures: "",
  }

  erreurUniteMesure = {
    libelle: "",
    ordre: "",
    uniteMesures: "",
  }
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false

  getUniteMesure(id) {
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
          for (let key in this.uniteMesure) {
            this.uniteMesure[key] = this.request[key]
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
      this.getUniteMesure(this.id)
    }
  }

}
