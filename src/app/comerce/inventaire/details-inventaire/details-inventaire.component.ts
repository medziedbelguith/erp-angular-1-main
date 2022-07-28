import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { Inventaire } from 'src/app/model/modelCommerce/inventaire';
import { InventaireService } from 'src/app/services/serviceBD_Commerce/inventaire.service';

@Component({
  selector: 'app-details-inventaire',
  templateUrl: './details-inventaire.component.html',
  styleUrls: ['./details-inventaire.component.scss']
})
export class DetailsInventaireComponent implements OnInit {
  id="";
  objectKeys = Object.keys;

  request = new Inventaire()

  inventaire = new Inventaire()

  shemaArticle = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    lot: "Lot/Numero serie",
    qteTheorique: "Qte Théorique",
    qteEnStock: "Qte En stock",
    qteInv1: "Quantite INV1",
    qteInv2: "Quantite INV2",
    qteInv3: "Quantite INV3",
    qteInvValide: "QteINV valide",
    notes: "Notes",
  }
  tabQuantite = ['qteEnStock', 'qteTheorique', 'qteInv1', 'qteInv2', 'qteInv3', 'qteInvValide']

  constructor(
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    public fonctionPartages:FonctionPartagesService,
    private inventaireServ : InventaireService,
    private router: Router, ) {
  }

  goToList()
  {
    this.router.navigate(["/inventaire/list"]);
  }
  getDate(date){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  getStyle(item){
    if(item.numero != 0){
      return "background-color:white;"
    }else{
      return "background-color: rgba(64, 26, 231, 0.20);"
    }
  }

  isLoading = false
  getInventaire(id) {
    this.isLoading = true
    this.inventaireServ.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          console.log(this.inventaire)
          this.request = response.resultat
          for (let key in this.inventaire) {
            this.inventaire[key] = this.request[key]
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
      this.getInventaire(this.id)
    }
  }
}
