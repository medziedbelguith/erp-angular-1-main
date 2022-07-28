import { TachePreventifService } from 'src/app/services/serviceBD_GMAO/tache-preventif.service';
import { TachePreventif } from 'src/app/model/modelGMAO/tachePreventif.model';
import { Component, EventEmitter, OnInit, Output, NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { PlanPreventifService } from 'src/app/services/serviceBD_GMAO/plan-preventif.service';
import { PlanPreventif } from 'src/app/model/modelGMAO/planPreventif.model';
import { formatDate } from '@angular/common';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-plan-preventif',
  templateUrl: './ajout-plan-preventif.component.html',
  styleUrls: ['./ajout-plan-preventif.component.scss']
})
export class AjoutPlanPreventifComponent implements OnInit {
  planPreventifFormGroup: FormGroup;
  objectKeys = Object.keys;
  formC: FormGroup

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      libelle: "",
      operationPreventif: "",
      machine: "",
      dernierDate: "",
      prochaineDate: "",
      periodicite: "",
      alerteAvant: "",
      interne: "",
      dureeExecution: "",
      montant: "",
      notes: "",
      fournisseur: "",
      techniciens: [],
      listTaches: [],
    },
    orderBy: {
      libelle: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }
  oldRequest = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      libelle: "",
      operationPreventif: "",
      machine: "",
      dernierDate: "",
      prochaineDate: "",
      periodicite: "",
      alerteAvant: "",
      interne: "",
      dureeExecution: "",
      montant: "",
      notes: "",
      fournisseur: "",
      techniciens: [],
      listTaches: [],
    },
    orderBy: {
      libelle: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  planPreventif: PlanPreventif = {
    libelle: "",
    operationPreventif: "",
    machine: "",
    dernierDate: "",
    prochaineDate: "",
    periodicite: 0,
    alerteAvant: 0,
    interne: "",
    dureeExecution: 0,
    montant: 0,
    notes: "",
    fournisseur: "",
    techniciens: [],
    listTaches: [],
  }

  erreurPlanPreventif: PlanPreventif = {
    libelle: "",
    operationPreventif: "",
    machine: "",
    periodicite: 0,
    alerteAvant: 0,
    interne: "",
    dureeExecution: 0,
    montant: 0,
    
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private planPreventifSe: PlanPreventifService,
    private tachePreventifSe: TachePreventifService,
    private fnctModel: FnctModelService,) {
    this.getAllParametres()
    this.getAllParametresTache()
  }
  ngOnInit(): void {
  }

  //to Save PlanPreventif
  isLoading = false
  ajoutPlanPreventif() {
    if (!this.fnctModel.controleInputs(this.erreurPlanPreventif, this.planPreventif, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.planPreventifSe.create(this.planPreventif, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log("resultat",resultat)
            this.router.navigate(['gmao/planPreventif/list']);
            this.notificationToast.showSuccess("Votre type tier est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  reseteFormulaire() {
    for (let key in this.erreurPlanPreventif) {
      this.planPreventif[key] = ""
    }
  }

  //Get parametre of PlanPreventif
  tabLibelle = []
  allPlanPreventifs = []
  allOperationPres = []
  allMachines = []
  allPeriodicites = []
  allFournisseurs = []
  allTechniciens = []
  getAllParametres() {
    this.planPreventifSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allPlanPreventifs = resultat.planPreventifs
            this.allOperationPres = resultat.operationPreventifs
            this.allMachines = resultat.machines
            this.allPeriodicites = resultat.periodicites
            this.allTechniciens = resultat.techniciens
            this.allFournisseurs = resultat.fournisseurs

            for (let item of this.allPlanPreventifs) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  //autocomplete OperationPreventif
  keySelectedMachine = "libelle"
  objetMachine = { libelle: "active" }
  setMachineID(id) {
    this.planPreventif.machine = this.allMachines.filter(x => x.id == id)[0].libelle
  }
  //autocomplete Periodicite
  keySelectedPeriodicite = "libelle"
  objetPeriodicite = { libelle: "active" }
  periodiciteLibelle
  setPeriodiciteID(id) {
    this.planPreventif.periodicite = id
    this.periodiciteLibelle = this.allPeriodicites.filter(x => x.id == id)[0].libelle
  }
  //autocomplete OperationPreventif
  keySelectedOperationPreventif = "libelle"
  objetOperationPreventif = { libelle: "active" }
  setOperationPreventifID(id) {
    this.planPreventif.operationPreventif = id
  }
  //autocomplete Fournisseur
  keySelectedFournisseur = "raisonSociale"
  objetFournisseur = {
    raisonSociale: "raisonSociale",
    code: "code",
    email: "email",
    classement: "classement",
    telephone: "telephone"
  }
  setFournisseurID(id) {
    this.planPreventif.fournisseur = id
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutOperationPreventif() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterOperationPreventif
    this.isOpenModalAjoutElement = true
  }
  openModalAjoutMachine() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterMachine
    this.isOpenModalAjoutElement = true
  }
  openModalAjoutPeriodicite() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPeriodicite
    this.isOpenModalAjoutElement = true
  }
  openModalAjoutFournisseur() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterFournisseur
    this.isOpenModalAjoutElement = true
  }
  openModalAjoutTechnicien() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTechnicien
    this.isOpenModalAjoutElement = true
  }
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }

  //for the input number to get the number after comma
  tabNumbers = ["montant"]
  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 10)
  }
  fixedVerguleNumbers() {
    for (let i = 0; i < this.tabNumbers.length; i++) {
      this.planPreventif[this.tabNumbers[i]] = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.planPreventif[this.tabNumbers[i]]))
    }
  }

  allEtatTaches = []
  allPersonnels = []
  varLib
  getAllParametresTache() {
    this.tachePreventifSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            console.log("resultat",resultat)
            this.allEtatTaches = resultat.etatTaches
            this.allPersonnels = resultat.personnels
            this.varLib = this.allEtatTaches.filter(x => x.libelle == "En attente")[0].libelle
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  //autocomplete EtatTache
  keySelectedEtatTache = "libelle"
  objetEtatTache = { libelle: "active" }
  setEtatTacheID(id) {
    this.tache.etatTache = this.allEtatTaches.filter(x => x.id == id)[0].libelle
  }
  //autocomplete Personnel
  keySelectedPersonnel = "nom"
  objetPersonnel = {
    nom: "nom",
    prenom: "prenom",
    adresse: "adresse",
  }
  setPersonnelID(id) {
    this.tache.personnel = this.allPersonnels.filter(x => x.id == id)[0].nom
  }
  //Par Of generate automatiq Taches
  items = {
    numero: "active",
    etatTache: "active",
    dateExecution: "active",
    personnel: "active",
  };

  itemsVariable = {
    numero: "active",
    etatTache: "active",
    dateExecution: "active",
    personnel: "active",
  };

  tache: TachePreventif = {
    planPreventif: "",
    dateExecution: "",
    personnel: [],
    machine: "",
    etatTache: "",
    montant: 0,
    numero: 0,
  }

  addDaysToDate(dateStart, days) {
    var res = new Date(dateStart);
    res.setDate(res.getDate() + days);
    var res2 = formatDate(new Date(res), 'yyyy-MM-dd', 'en')
    return res2;
  }
  calculePeriode(periode) {
    const words = periode.split(' ');
    let nb = words[0]
    let date = words[1]
    switch (date) {
      case 'annee':
        return Number(nb) * 365
      case 'mois':
        return Number(nb) * 30
      case 'jours':
        return Number(nb)
    }
  }
  dateStart
  dateEnd
  getTaches(request) {
    this.planPreventif.listTaches = []
    this.dateStart = request.dateStart
    this.dateEnd = request.dateEnd
    let etattache = this.allEtatTaches.filter(x => x.libelle == "En attente")[0].id
    let personnelT = []
    let compteur = 1
    let i = this.dateStart
    let periode = this.calculePeriode(this.periodiciteLibelle)
    if (this.planPreventif.interne == 'oui') {
      personnelT = this.planPreventif.techniciens
    } else {
      personnelT[0] = this.planPreventif.fournisseur
    }
    while (i <= this.dateEnd) {
      this.tache = {
        etatTache: etattache,
        montant: this.planPreventif.montant,
        dateExecution: i,
        personnel: personnelT,
        numero: compteur++,
      }
      i = this.addDaysToDate(i, periode)
      this.planPreventif.listTaches.push(this.tache)
    }
  }
  //Décalage Taches
  @Output() setNewDates = new EventEmitter<any>();
  day1 = new Date();
  day2 = new Date();
  getDateStart(event) {
    this.day2 = event
    this.setNewDates.emit({ dateStart: formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en'), dateEnd: formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en') })
  }
  getDateEnd(event) {
    this.day1 = event
    this.setNewDates.emit({ dateStart: formatDate(new Date(this.day2), 'yyyy-MM-dd', 'en'), dateEnd: formatDate(new Date(this.day1), 'yyyy-MM-dd', 'en') })
  }
  nbJours
  decalerTache(listTaches, nbJours) {
    for (let i of listTaches) {
      if (this.day2 <= i.dateExecution && i.dateExecution <= this.day1) {
        i.dateExecution = this.addDaysToDate(i.dateExecution, nbJours)
      }
    }
    this.JoinAndClose()
  }
  //pour ouvrir un POP-Up
  open(content) {
    this.fnctModel.open(content)
  }
  //pour fermer un POP-Up
  JoinAndClose() {
    this.fnctModel.JoinAndClose()
  }

  
  //autocomplete Technicien
  keySelectedTechnicien = "nom"
  objetTechnicien = {
    nom: "nom",
    prenom: "prenom",
    role: "role",
    email: "email",
    telephone: "telephone"
  }
  nomTechnicien = {
    id:"",
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: ""
  }
  setTechnicienID(id) {
    this.nomTechnicien = this.allTechniciens.filter(x => x.id == id)[0]
  }
  ajoutTechnicien() {
    this.planPreventif.techniciens.push(this.nomTechnicien)
  }
  supprimerTechnicien(id) {
    this.planPreventif.techniciens = this.planPreventif.techniciens.filter(x => x.id != id)
  }
}
