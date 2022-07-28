import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-releve-fournisseur',
  templateUrl: './releve-fournisseur.component.html',
  styleUrls: ['./releve-fournisseur.component.scss']
})
export class ReleveFournisseurComponent implements OnInit {

  formC: FormGroup

  apiListBl = "/reglements/getByIdFournisseurBA/"
  apiList = "/fournisseurs/listFournisseurs"

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService) {

    this.formC = this.fb.group({
      day1: [''],
      day2: [''],
      allFournisseurs: [''],

      dateEcheance: [''],
      dateReglement: [''],
      modeReglement: [''],
      montant: [''],
      notes: [''],
      numCheque: [''],
      tresorerie: [''],
      fournisseur: [''],


      numero: [''],
      tFiscale: [''],
      totalGain: [''],
      totalHT: [''],
      totalRemise: [''],
      totalTTC: [''],
      totalTVA: [''],

      limit: 10
    })
    this.getFournisseurs()
  }

  objectKeys = Object.keys;

  itemsG = {
    fournisseur: "Fournisseur",
    type: "Type",
    numero: "Numero",
    dateOperation: "Date Opération",
    modeReglement: "Mode Règlement",
    numCheque: "N° Chèque",
    debit: "Débit",
    credit: "Crédit",
    solde: "Solde",
  };

  itemsVariableG = {
    fournisseur: "Fournisseur",
    type: "Type",
    numero: "Numero",
    dateOperation: "Date Opération",
    modeReglement: "Mode Règlement",
    numCheque: "N° Chèque",
    debit: "Débit",
    credit: "Crédit",
    solde: "Solde",
  };

  itemsVariableGOrderby = {
    fournisseur: 0,
    type: 0,
    numero: 0,
    dateOperation: 0,
    modeReglement: 0,
    numCheque: 0,
    debit: 0,
    credit: 0,
    solde: 0,
  }

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      dateEcheance: "",
      dateReglement: "",
      modeReglement: "",
      montant: "",
      notes: "",
      numCheque: "",
      tresorerie: "",
      fournisseur: "",

      numero: "",
      tFiscale: "",
      totalGain: "",
      totalHT: "",
      totalRemise: "",
      totalTTC: "",
      totalTVA: "",
    },
    orderBy: {
      dateEcheance: 0,
      dateReglement: 0,
      modeReglement: 0,
      montant: 0,
      notes: 0,
      numCheque: 0,
      tresorerie: 0,
      fournisseur: 0,

      numero: 0,
      tFiscale: 0,
      totalGain: 0,
      totalHT: 0,
      totalRemise: 0,
      totalTTC: 0,
      totalTVA: 0,
    },
    limit: 3,
    page: 1
  }

  oldRequest = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      dateEcheance: "",
      dateReglement: "",
      modeReglement: "",
      montant: "",
      notes: "",
      numCheque: "",
      tresorerie: "",
      fournisseur: "",
    },
    orderBy: {
      dateEcheance: 0,
      dateReglement: 0,
      modeReglement: 0,
      montant: 0,
      notes: 0,
      numCheque: 0,
      tresorerie: 0,
      fournisseur: 0,
    },
    limit: 3,
    page: 1
  }

  listGl = []
  listGlEmpty = [{}, {}, {}, {}, {}, {}]
  soldeCurrente = 0
  soldeBefore = 0

  ngOnInit(): void {
  }

  isLoading = false

  getDate(date) {
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
  }

  getReleveDate(request) {
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.dateStart = request.dateStart
    this.request.dateEnd = request.dateEnd
  }

  apiListR = "/reglements/getByIdFournisseur/"

  isCheckedWithFiltrage = 'non'

  getReleveFournisseur()
  {
    this.isCheckedWithFiltrage = 'non'
    if (this.isLoading) {
      return
    }
    if (this.idFournisseur.length < 5) {
      this.listGl = []
      return
    }
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.apiListR + this.idFournisseur, this.request).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.listGl = response.tabReleveFournisseurs
          this.soldeCurrente = response.soldeCurrente
          this.soldeBefore = response.soldeBefore
          this.listGlEmpty = []
          if (this.listGl.length < 6) {
            for (let i = this.listGl.length; i < 6; i++) {
              this.listGlEmpty.push({})
            }
          }

          if (!this.testSyncronisation(this.request, response.request)) {
            this.getReleveFournisseur()
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  filtreBL(request) {
    
    this.isCheckedWithFiltrage = 'oui' 
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.dateStart = request.dateStart
    this.request.dateEnd = request.dateEnd
    if (this.isLoading) {
      return
    }
    if (this.idFournisseur.length < 5) {
      this.listGl = []
      return
    }
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.apiListBl + this.idFournisseur, this.request).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          console.log("this.listGl Avec filtre response", response)
          this.listGl = response.listGlobal
          this.soldeCurrente = response.soldeCurrente
          this.soldeBefore = response.soldeBefore
          this.listGlEmpty = []

          if (this.listGl.length < 6) {
            for (let i = this.listGl.length; i < 6; i++) {
              this.listGlEmpty.push({})
            }
          }
          if (!this.testSyncronisation(this.request, response.request)) {
            this.filtreBL(this.request)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  getTotalOfKey(key) {
    var somme = 0
    for (let item of this.listGl) {
      somme += item[key]
    }
    return somme
  }
  //Debut autocom Fournisseur
  allFournisseurs = []

  getFournisseurs() {
    let request = { page: 1, limit: 0, search: {}, orderBy: {}, societe: this.informationGenerale.idSocieteCurrent }
    this.http.post(this.informationGenerale.baseUrl + this.apiList, request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allFournisseurs = resultat.resultat.docs
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  //autocomplete Fournisseur
  keySelectedFournisseur = "raisonSociale"

  objetFournisseur = {
    raisonSociale: "Raison-Sociale",
    matriculeFiscale: "Matricule-Fiscale",
    email: "Email",
    telephone: "Téléphone",
    code: "Code",
    plafondCredit: "Plafond-Credit",
    mobiles: "Mobiles",
    siteWeb: "Site-Web",
    conditionReglement: "Condition-Réglement",
    credit: "Crédit",
    fax: "Fax",
  }

  idFournisseur = ""

  setFournisseurID(id) {
    this.idFournisseur = id
  }
  //open modal ajout Fournisseur
  isOpenModalAjoutFournisseur = false
  idAjoutFournisseurModal = ""
  typeElement
  closeModalAjoutFournisseur() {
    this.isOpenModalAjoutFournisseur = false
    this.getFournisseurs()
  }
  openModalAjoutFournisseur() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterFournisseur
    this.isOpenModalAjoutFournisseur = true
  }

  testSyncronisation(request1, request2) {
    for (let key in request1.search) {
      if (request1.search[key] != request2.search[key]) {
        return false
      }
    }

    for (let key in request1.orderBy) {
      if (request1.orderBy[key] != request2.orderBy[key]) {
        return false
      }
    }

    if (request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd) {
      return false
    }

    return true;
  }

  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.itemsVariableGOrderby[key] == 1) {
      this.itemsVariableGOrderby[key] = -1
      this.fonctionPartagesService.activationCroissante(buttons[0], buttons[1])

    } else {
      this.itemsVariableGOrderby[key] = 1
      this.fonctionPartagesService.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.itemsVariableGOrderby) {
      if (key != varkey) {
        this.itemsVariableGOrderby[varkey] = 0
      }
    }

    this.listGl = this.fonctionPartagesService.orderByDocuments(this.itemsVariableGOrderby, this.listGl)

  }
}
