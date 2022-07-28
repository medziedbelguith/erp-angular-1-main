import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { TacheProjetInterne } from 'src/app/model/modelCommerce/tacheProjetInterne';
import { TacheProjetInterneService } from 'src/app/services/serviceBD_Commerce/tacheProjetInterne.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-modifier-tache-projet-interne',
  templateUrl: './modifier-tache-projet-interne.component.html',
  styleUrls: ['./modifier-tache-projet-interne.component.scss']
})
export class ModifierTacheProjetInterneComponent implements OnInit {
  tacheProjetInterneFormGroup: FormGroup;

  projetInternes = []
  allProjetInternes = []

  id="";
  objectKeys = Object.keys;

  request = new TacheProjetInterne()

  tacheProjetInterne = new TacheProjetInterne()

  erreurTacheProjetInterne = {
    reference: "",
    libelle: "",
    projetInterne: "",
    affecteA: "",
    dateDebut: "",
    dateFin: "",
    chargeTravail: "",
    avancement: "",
  }

  constructor(
    private fnctModel:FnctModelService,
    private projetTacheInterSer: TacheProjetInterneService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private router: Router, 
    private notificationToast:ToastNotificationService,
    public fonctionPartagesService:FonctionPartagesService) {

    this.getAllParametres()
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

  }

  tabReference = []
  allTacheProjetInternes = []
  allPersonnels = []
  getAllParametres() {
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
      exercice: this.informationGenerale.exerciceCurrent
    }
    this.projetTacheInterSer.parametre(request)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allProjetInternes = resultat.projetInternes
            this.allPersonnels = resultat.personnels
            this.allTacheProjetInternes = resultat.tacheprojetInternes
            this.tacheProjetInterne.reference = resultat.numeroAutomatique
          }
          for (let item of this.allTacheProjetInternes) {
            this.tabReference.push(item.reference)
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  getTacheProjetInterne(id) { 
    this.isLoading = true
    this.projetTacheInterSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.tacheProjetInterne) {
            this.tacheProjetInterne[key] = this.request[key]
          }
           this.tacheProjetInterne.dateDebut = formatDate(new Date(this.tacheProjetInterne.dateDebut), 'yyyy-MM-ddThh:mm', 'en');
           this.tacheProjetInterne.dateFin = formatDate(new Date(this.tacheProjetInterne.dateFin), 'yyyy-MM-ddThh:mm', 'en');         
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
      this.getTacheProjetInterne(this.id)
    }
  }

  isLoading = false
  modifierTacheProjetInterne() {
    if (!this.fnctModel.controleInput(this.erreurTacheProjetInterne, this.tacheProjetInterne)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for(let key in this.tacheProjetInterne){
      this.request[key] = this.tacheProjetInterne[key]
    } 

    this.request.projetInternes = this.allProjetInternes
    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.projetTacheInterSer.update(this.id,this.tacheProjetInterne, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.router.navigate(['/tacheProjetInterne/list']);
          this.notificationToast.showSuccess("Votre tacheProjetInterne est bien modifiée !")
  
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }); 

  }

  reseteFormulaire() {
    for (let key in this.erreurTacheProjetInterne) {
      this.tacheProjetInterne[key] = ""
    }
  }

   //autocomplete ProjetInterne
   keySelectedProjetInterne = "reference"
  
   objetProjetInterne = {
     reference:"active",
     libelle:"active",
     description:"active",
     budget:"active",
     dateDebut:"active",
     dateFin:"active",
   }
 
   setProjetInterneID(id){
     this.tacheProjetInterne.projetInterne = id
   }

  //start personnel
  objetPersonnel = {
    nom: "Nom",
    prenom: "Prénom",
    role: "Role",
    email: "Email",
    telephone: "Téléphone",
    adresse: "Adresse",
  }
  keySelectedPersonnel = "nom"
  setPersonnelID(id) {
    this.tacheProjetInterne.affecteA = id
  }
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }

  openModalAjoutPersonnel() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
    this.isOpenModalAjoutElement = true
  }
  //end Personnel
}
