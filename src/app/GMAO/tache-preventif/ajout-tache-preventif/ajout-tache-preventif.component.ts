import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { TachePreventifService } from 'src/app/services/serviceBD_GMAO/tache-preventif.service';
import { TachePreventif } from 'src/app/model/modelGMAO/tachePreventif.model';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-tache-preventif',
  templateUrl: './ajout-tache-preventif.component.html',
  styleUrls: ['./ajout-tache-preventif.component.scss']
})
export class AjoutTachePreventifComponent implements OnInit {
  tachePreventifFormGroup: FormGroup;
  objectKeys = Object.keys;

  request = {
    planPreventif: "",
    dateExecution: "",
    personnel: "",
    machine: "",
    etatTache: "",
    montant: "",
    notes: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  tachePreventif: TachePreventif = {
    planPreventif: "",
    dateExecution: "",
    personnel: [],
    machine: "",
    etatTache: "",
    montant: 0,
    notes: "",
  }

  erreurTachePreventif: TachePreventif = {
    planPreventif: "",
    dateExecution: "",
    machine: "",
    etatTache: "",
    montant: 0,
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private tachePreventifSe: TachePreventifService,
    private fnctModel:FnctModelService)
    {
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  //to Save TachePreventif
  isLoading = false
  ajoutTachePreventif() {
    if (!this.fnctModel.controleInput(this.erreurTachePreventif, this.tachePreventif)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.tachePreventif) {
      this.request[key] = this.tachePreventif[key]
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.tachePreventifSe.create(this.tachePreventif, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.router.navigate(['gmao/tachePreventif/list']);
            this.notificationToast.showSuccess("Votre type tier est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  reseteFormulaire() {
    for (let key in this.erreurTachePreventif) {
      this.tachePreventif[key] = ""
    }
  }

  //Get parametre of tachePreventif
  allPlanPreventifs = []
  allMachines = []
  allPersonnels = []
  allEtatTaches = []
  getAllParametres() {
    this.tachePreventifSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allPlanPreventifs = resultat.planPreventifs
            this.allMachines = resultat.machines
            this.allPersonnels = resultat.personnels
            this.allEtatTaches = resultat.etatTaches
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //autocomplete PlanPreventif
  keySelectedPlanPreventif = "libelle"
  objetPlanPreventif = { libelle: "active" }
  setPlanPreventifID(id) {
    this.tachePreventif.planPreventif = id
  }

  //autocomplete Machine
  keySelectedMachine = "libelle"
  objetMachine = { libelle: "active" }
  setMachineID(id) {
    this.tachePreventif.machine = id
  }
  //autocomplete EtatTache
  keySelectedEtatTache = "libelle"
  objetEtatTache = { libelle: "active" }
  setEtatTacheID(id) {
    this.tachePreventif.etatTache = id
  }
  //autocomplete Personnel
  keySelectedPersonnel = "nom"
  objetPersonnel = {
    nom: "nom",
    prenom: "prenom",
    adresse: "adresse",
    email: "email",
    role: "role",
    telephone: "telephone",
  }
  setPersonnelID(id) {
    this.tachePreventif.personnel = id
  }

  tabNumbers = ["montant"]
  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 10)
  }

  fixedVerguleNumbers() {
    for (let i = 0; i < this.tabNumbers.length; i++) {
      this.tachePreventif[this.tabNumbers[i]] = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.tachePreventif[this.tabNumbers[i]]))
    }
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutPlanPreventif() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPlanPreventif
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutPersonnel() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutMachine() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterMachine
    this.isOpenModalAjoutElement = true
  }

  openModalAjoutEtatTache() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterEtatTache
    this.isOpenModalAjoutElement = true
  }
  
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }

  }
