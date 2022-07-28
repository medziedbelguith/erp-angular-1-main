import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-bon-article-casse',
  templateUrl: './details-bon-article-casse.component.html',
  styleUrls: ['./details-bon-article-casse.component.scss']
})
export class DetailsBonArticleCasseComponent implements OnInit {
  lienGetById = "/bonArticleCasses/getById/"

  id="";
  objectKeys = Object.keys;

  request = {
    numero:0,
    date:"",
    article:"",
    cas:"",
    magasin:"",
    quantite:0,
    prixUnitaire:0,
  }

  bonArticleCasse = { 
    numero:0,
    date:"",
    article:"",
    cas:"",
    magasin:"",
    quantite:0,
    prixUnitaire:0,
  }

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }
 
  isLoading = false

  getBonArticleCasse(id) {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.bonArticleCasse) {
            this.bonArticleCasse[key] = this.request[key]
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
      this.getBonArticleCasse(this.id)
    }
  }
}
