import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ModeLivraison } from 'src/app/model/modelCommerce/modeLivraison';
import { ModeLivraisonService } from 'src/app/services/serviceBD_Commerce/modeLivraison.service';

@Component({
  selector: 'app-details-mode-livraison',
  templateUrl: './details-mode-livraison.component.html',
  styleUrls: ['./details-mode-livraison.component.scss']
})
export class DetailsModeLivraisonComponent implements OnInit {

  id="";
  objectKeys = Object.keys;

  request = new ModeLivraison()

  modeLivraison  = new ModeLivraison()

  constructor(
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private modeLivSer: ModeLivraisonService,) {

  }

  
  isLoading = false

  getModeLivraison(id) {
    this.isLoading = true
    this.modeLivSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        console.log(res)
        if (response.status) {
          this.request = response.resultat
          for (let key in this.modeLivraison) {
            this.modeLivraison[key] = this.request[key]
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
      this.getModeLivraison(this.id)
    }
  }

}
