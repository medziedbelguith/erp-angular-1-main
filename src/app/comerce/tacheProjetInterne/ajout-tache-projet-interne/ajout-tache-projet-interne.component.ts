import { TacheProjetInterneService } from './../../../services/serviceBD_Commerce/tacheProjetInterne.service';
import { TacheProjetInterne } from './../../../model/modelCommerce/tacheProjetInterne';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Router } from '@angular/router';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-tache-projet-interne',
  templateUrl: './ajout-tache-projet-interne.component.html',
  styleUrls: ['./ajout-tache-projet-interne.component.scss']
})
export class AjoutTacheProjetInterneComponent implements OnInit {

  tacheProjetInterneFormGroup: FormGroup;

  projetInternes = []
  allProjetInternes = []


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
    description: "",
  }

  constructor(
    private projetTacheInterSer: TacheProjetInterneService,
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private fnctModel: FnctModelService,) {
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  isLoading = false
  ajoutTacheProjetInterne() {
    if (!this.fnctModel.controleInputs(this.erreurTacheProjetInterne, this.tacheProjetInterne, this.tabReference, 'reference')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.tacheProjetInterne) {
      this.request[key] = this.tacheProjetInterne[key]
    }

    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.exercice = this.informationGenerale.exerciceCurrent + ""
    this.request.projetInternes = this.allProjetInternes
    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.projetTacheInterSer.create(this.tacheProjetInterne, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.router.navigate(['/tacheProjetInterne/list']);
            this.notificationToast.showSuccess("Votre TacheProjetInterne est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
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

  reseteFormulaire() {
    for (let key in this.erreurTacheProjetInterne) {
      this.tacheProjetInterne[key] = ""
    }
  }

  //autocomplete ProjetInterne
  keySelectedProjetInterne = "reference"
  objetProjetInterne = {
    reference: "active",
    libelle: "active",
    description: "active",
    budget: "active",
    dateDebut: "active",
    dateFin: "active",
  }
  setProjetInterneID(id) {
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
