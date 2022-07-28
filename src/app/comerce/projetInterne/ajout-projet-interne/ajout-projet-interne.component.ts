import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Router } from '@angular/router';
import { ProjetInterne } from 'src/app/model/modelCommerce/projetInterne';
import { ProjetInterneService } from 'src/app/services/serviceBD_Commerce/projetInterne.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-projet-interne',
  templateUrl: './ajout-projet-interne.component.html',
  styleUrls: ['./ajout-projet-interne.component.scss']
})
export class AjoutProjetInterneComponent implements OnInit {

  projetInterneFormGroup: FormGroup;

  statutOpportunites = []
  allStatutOpportunites = []

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
    private fnctModel: FnctModelService,
    private projetInterSer: ProjetInterneService,
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService) {
    this.getAllParametres()
  }

  tabReference = []
  allProjetInternes = []
  getAllParametres() {
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
            this.projetInterne.reference = resultat.numeroAutomatique
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


  ngOnInit(): void {
  }

  isLoading = false
  ajoutProjetInterne() {
    if (!this.fnctModel.controleInputs(this.erreurProjetInterne, this.projetInterne, this.tabReference, 'reference')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.projetInterne) {
      this.request[key] = this.projetInterne[key]
    }
    if (this.isLoading) {
      return
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.exercice = this.informationGenerale.exerciceCurrent + ""
    this.isLoading = true
    this.projetInterSer.create(this.projetInterne, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log(resultat)
            this.router.navigate(['/projetInterne/list']);
            this.notificationToast.showSuccess("Votre Projet Interne est bien enregistrée !")
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
    libelle: "active",
  }

  setStatutOpportuniteID(id) {
    this.projetInterne.statutOpportunite = id
  }

  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }

  openModalAjoutStatutOpportunite() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
    this.isOpenModalAjoutElement = true
  }
}
