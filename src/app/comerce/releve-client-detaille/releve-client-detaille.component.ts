import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-releve-client-detaille',
  templateUrl: './releve-client-detaille.component.html',
  styleUrls: ['./releve-client-detaille.component.scss']
})
export class ReleveClientDetailleComponent implements OnInit {

  formC: FormGroup

  apiListBlA = "/reglements/getByIdClientBLArticle/"
  apiListBl = "/reglements/getByIdClientBL/"
  apiList = "/clients/listClients"


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService) {

    this.formC = this.fb.group({
      day1: [''],
      day2: [''],
      allClients: [''],

      client: [''],
      dateOperation: [''],
      numero: [''],
      reference: [''],
      destination: [''],
      debit: [''],
      credit: [''],
      solde: [''],

      limit: 10
    })
    this.getAllParametres()
  }

  objectKeys = Object.keys;

  itemsG = {
    client: "Client",
    numero: "Numero",
    dateOperation: "Date Opération",
    libelle: "Libelle",
    debit: "Débit",
    credit: "Crédit",
    solde: "Solde",
  };

  itemsVariableG = {
    client: "active",
    numero: "active",
    dateOperation: "active",
    libelle: "active",
    debit: "active",
    credit: "active",
    solde: "active",
  };

  itemsVariableGOrderby = {
    client: 0,
    numero: 0,
    dateOperation: 0,
    libelle: 0,
    debit: 0,
    credit: 0,
    solde: 0,
  }

  request = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search: {
      dateEcheance: "",
      dateReglement: "",
      modeReglement: "",
      montant: "",
      notes: "",
      numCheque: "",
      tresorerie: "",
      client: "",
      numero: "",
      solde: "",
    },
    orderBy: {
      dateEcheance: 0,
      dateReglement: 0,
      modeReglement: 0,
      montant: 0,
      notes: 0,
      numCheque: 0,
      tresorerie: 0,
      client: 0,
      numero: 0,
      solde: 0,
    },
    limit: 3,
    page: 1
  }

  oldRequest = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search: {
      dateEcheance: "",
      dateReglement: "",
      modeReglement: "",
      montant: "",
      notes: "",
      numCheque: "",
      tresorerie: "",
      client: "",
      solde: "",
    },
    orderBy: {
      dateEcheance: 0,
      dateReglement: 0,
      modeReglement: 0,
      montant: 0,
      notes: 0,
      numCheque: 0,
      tresorerie: 0,
      client: 0,
      solde: 0,
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

  getReleveClient(request) {
    console.log(request)
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.dateStart = request.dateStart
    this.request.dateEnd = request.dateEnd

    if (this.isLoading) {
      return
    }
    if (this.idClient.length < 5) {
      this.listGl = []
      return
    }
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.apiListBlA + this.idClient, this.request).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
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
            this.getReleveClient(this.request)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
  sommeDebit = 0
  sommeCrédit = 0
  getTotalOfKey(key) {
    var somme = 0
    for (let item of this.listGl) {
      somme += item[key]
    }
    return somme
  }

  //Debut autocom Clien
  allClients = []
  getAllParametres() {
    let request = { page: 1, limit: 0, search: {}, orderBy: {}, societe: this.informationGenerale.idSocieteCurrent }
    this.http.post(this.informationGenerale.baseUrl + this.apiList, request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allClients = resultat.resultat.docs
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  //autocomplete client
  keySelectedClient = "raisonSociale"
  objetClient = {
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
  idClient = ""
  setClientID(id) {
    this.idClient = id
  }

  //open modal ajout Client
  isOpenModalAjoutClient = false
  idAjoutClientModal = ""
  typeElement
  closeModalAjoutClient() {
    this.isOpenModalAjoutClient = false
    this.getAllParametres()
  }
  openModalAjoutClient() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterClient
    this.isOpenModalAjoutClient = true
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

  getDated(event)
  {
    this.request.dateStart = event.dateStart
    this.request.dateEnd = event.dateEnd
    console.log("releve",event)
  }
}
