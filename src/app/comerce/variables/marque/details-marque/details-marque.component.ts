import { Marque } from 'src/app/model/modelCommerce/marque';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { MarqueService } from 'src/app/services/serviceBD_Commerce/marque.service';

@Component({
  selector: 'app-details-marque',
  templateUrl: './details-marque.component.html',
  styleUrls: ['./details-marque.component.scss']
})
export class DetailsMarqueComponent implements OnInit {

  id="";
  objectKeys = Object.keys;

  request = new Marque()

  marque  = new Marque()

  constructor(
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private marqueSer: MarqueService,) {
  }

  
  isLoading = false

  getMarque(id) {
    this.isLoading = true

    this.marqueSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.marque) {
            this.marque[key] = this.request[key]
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
      this.getMarque(this.id)
    }
  }
}
