import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ProjetInterne } from 'src/app/model/modelCommerce/projetInterne';
import { ProjetInterneService } from 'src/app/services/serviceBD_Commerce/projetInterne.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-modifier-projet-interne',
  templateUrl: './modifier-projet-interne.component.html',
  styleUrls: ['./modifier-projet-interne.component.scss']
})
export class ModifierProjetInterneComponent implements OnInit {
  projetInterneFormGroup: FormGroup;

  lienModifie = "/projetInternes/modifierProjetInterne/"
  lienGetById = "/projetInternes/getById/"

  statutOpportunites = []
  allStatutOpportunites = []

  id="";
  objectKeys = Object.keys;

  request = new ProjetInterne()

  projetInterne = new ProjetInterne()

  erreurProjetInterne = {
    reference: "",
    libelle: "",
    dateDebut: "",
    dateFin: "",
    statutOpportunite: "",
    probabiliteOpportunite: "",
    mantantOpportunite: "",
    budget: "",
    tauxAvancement: "",
  }

  constructor(
    private fnctModel:FnctModelService,
    public informationGenerale: InformationsService,
    private projetInterSer: ProjetInterneService,
    private route: ActivatedRoute, 
    private router: Router, 
    private notificationToast:ToastNotificationService,
    public fonctionPartagesService:FonctionPartagesService) {

    this.getAllParametres()
  

  }
  allProjetInternes=[]
  tabReference=[]
  getAllParametres(){ 
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
      exercice: this.informationGenerale.exerciceCurrent
    }
    this.projetInterSer.parametre(request)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allProjetInternes = resultat.projetInternes 
            this.allStatutOpportunites = resultat.statutOpportunites 
          }
  
          for (let item of this.allProjetInternes) {
            this.tabReference.push(item.reference)
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  getProjetInterne(id) {
    this.isLoading = true
    this.projetInterSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.projetInterne) {
            this.projetInterne[key] = this.request[key]
          }
          this.projetInterne.dateDebut = formatDate(new Date(this.projetInterne.dateDebut), 'yyyy-MM-dd', 'en');
          this.projetInterne.dateFin = formatDate(new Date(this.projetInterne.dateFin), 'yyyy-MM-dd', 'en');
          
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
      this.getProjetInterne(this.id)
    }
  }

  isLoading = false
  modifierProjetInterne() {
    if (!this.fnctModel.controleInput(this.erreurProjetInterne, this.projetInterne)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for(let key in this.projetInterne){
      this.request[key] = this.projetInterne[key]
    } 
    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.projetInterSer.update(this.id,this.projetInterne, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.router.navigate(['/projetInterne/list']);
          this.notificationToast.showSuccess("Votre projetInterne est bien modifiée !")
  
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }); 

  }

  reseteFormulaire() {
    for (let key in this.erreurProjetInterne) {
      this.projetInterne[key] = ""
    }
  }

  //autocomplete StatutOpportunite 
  keySelectedStatutOpportunite = "libelle"
  
  objetStatutOpportunite = {
    libelle:"active",
  }

  setStatutOpportuniteID(id){
    this.projetInterne.statutOpportunite = id
  }
}
