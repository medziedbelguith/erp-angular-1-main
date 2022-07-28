import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { PlanPreventifService } from 'src/app/services/serviceBD_GMAO/plan-preventif.service';
import { InformationsService } from 'src/app/services/informations.service';
import { PlanPreventif } from 'src/app/model/modelGMAO/planPreventif.model';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { formatDate } from '@angular/common';
import { TachePreventif } from 'src/app/model/modelGMAO/tachePreventif.model';
import { TachePreventifService } from 'src/app/services/serviceBD_GMAO/tache-preventif.service';

@Component({
  selector: 'app-modifier-plan-preventif',
  templateUrl: './modifier-plan-preventif.component.html',
  styleUrls: ['./modifier-plan-preventif.component.scss']
})
export class ModifierPlanPreventifComponent implements OnInit {
  planPreventifFormGroup: FormGroup;

  id = "";
  objectKeys = Object.keys;

  request = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
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
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
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
    private route: ActivatedRoute,
    private router: Router,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService,
    public informationGenerale: InformationsService,
    private planPreventifSe: PlanPreventifService,
    private fnctModel: FnctModelService,
    private tachePreventifSe : TachePreventifService,) {
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
      });
      
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length > 1) {
      this.getPlanPreventif(this.id)
    }
  }

  getPlanPreventif(id) {
    this.isLoading = true
    this.planPreventifSe.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            console.log("response",response)
            this.request = response.resultat
            for (let key in this.planPreventif) {
              this.planPreventif[key] = this.request[key]
            }
            this.planPreventif.dernierDate = formatDate(new Date(this.planPreventif.dernierDate), 'yyyy-MM-dd', 'en');
            this.planPreventif.prochaineDate = formatDate(new Date(this.planPreventif.prochaineDate), 'yyyy-MM-dd', 'en');
            for (let key of this.planPreventif.listTaches) {
              key.dateExecution = formatDate(new Date(key.dateExecution), 'yyyy-MM-dd', 'en');
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }
  ngOnInit(): void {
    this.getAllParametres()
    this.getAllParametresTache()
  }
  controleInputs() {
    for (let key in this.erreurPlanPreventif) {
      this.erreurPlanPreventif[key] = ""
    }
    var isValid = true
    for (let key in this.erreurPlanPreventif) {
      if (this.planPreventif[key] == "") {
        this.erreurPlanPreventif[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    for (let i = 0; i < this.tabLibelle.length; i++) {
      if (this.planPreventif.libelle == this.tabLibelle[i]) {
        this.erreurPlanPreventif.libelle = "Votre libelle existe déja"
        isValid = false
        break;
      }
    }
    return isValid
  }

  isLoading = false
  modifierPlanPreventif() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.planPreventifSe.update(this.id, this.planPreventif, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getAllParametresTache()
            this.router.navigate(['gmao/planPreventif/list']);
            this.notificationToast.showSuccess("Votre planPreventif est bien modifiée !")
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
              if(item.libelle != this.planPreventif.libelle)
              {
                this.tabLibelle.push(item.libelle)
              }
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
    this.planPreventif.machine = id
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
  isOpenModalAjoutElement = false
  keySelectedOperationPreventif = "libelle"
  objetOperationPreventif = { libelle: "active" }
  setOperationPreventifID(id) {
    this.planPreventif.operationPreventif = id
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
  nomTechnicien= {
    nom: "",
    prenom: "",
    role: "",
    email: "",
    telephone: ""
  }
  setTechnicienID(id) {
    let test = this.allTechniciens.filter(x => x.id == id)[0]
    this.nomTechnicien.nom = test.nom
    this.nomTechnicien.prenom = test.prenom
    this.nomTechnicien.role = test.role
    this.nomTechnicien.email = test.email
    this.nomTechnicien.telephone = test.telephone
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
            this.allEtatTaches = resultat.etatTaches
            console.log(this.allEtatTaches)
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
  calculePeriode(peride) {
    const words = peride.split(' ');
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

  techniciens = []
  ajoutTechnicien() {
    this.planPreventif.techniciens.push(this.nomTechnicien)
   }
  supprimerTechnicien(id) {
    this.planPreventif.techniciens = this.planPreventif.techniciens.filter(x => x.id != id)
  }
}
