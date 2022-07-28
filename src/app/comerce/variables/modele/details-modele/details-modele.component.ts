import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-modele',
  templateUrl: './details-modele.component.html',
  styleUrls: ['./details-modele.component.scss']
})
export class DetailsModeleComponent implements OnInit {
  lienGetById = "/modeles/getById/"

  id="";
  objectKeys = Object.keys;

  request = {
    libelle: "",
    marques: "",
  }

  modele = {
    libelle: "",
    marque: "",
  }

  erreurModele = {
    libelle: "",
    marque: "",
  }
  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false

  getModele(id) {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        console.log(res)
        if (response.status) {
          this.request = response.resultat
          for (let key in this.modele) {
            this.modele[key] = this.request[key]
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
    if(this.id.length > 1){
      this.getModele(this.id)
    }
  }

}
