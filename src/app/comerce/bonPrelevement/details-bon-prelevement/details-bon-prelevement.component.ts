import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-bon-prelevement',
  templateUrl: './details-bon-prelevement.component.html',
  styleUrls: ['./details-bon-prelevement.component.scss']
})
export class DetailsBonPrelevementComponent implements OnInit {
  lienGetById = "/bonPrelevements/getById/"

  ligneBLs = []

  id="";
  objectKeys = Object.keys;

  request = {
    numero:"",
    date:"",
    personnel:"",
    articleAchats:[],
  }

  bonPrelevement = { 
    numero:"",
    date:"",
    personnel:"",
    articleAchats:[],
  }

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  
  isLoading = false

  getBonPrelevement(id) {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.bonPrelevement) {
            this.bonPrelevement[key] = this.request[key]
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
      this.getBonPrelevement(this.id)
    }
  }

}
