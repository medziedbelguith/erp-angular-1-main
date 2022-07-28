import { SessionCaisseService } from 'src/app/services/serviceBD_Commerce/sessionCaisse.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  selector: 'app-charge-mode-regl',
  templateUrl: './charge-mode-regl.component.html',
  styleUrls: ['./charge-mode-regl.component.scss']
})
export class ChargeModeReglComponent implements OnInit {

  @Input() sessionCaisse

  @Input() utilisateur

  @Input() listTotalRegl

  formC: FormGroup

  allCreDebs = ['solde', 'caisse']

  constructor(
    private sessionCaisseSer: SessionCaisseService,
    private fb: FormBuilder,
    public informationGenerale: InformationsService,) {

    this.formC = this.fb.group({
      typeOperation: [''],
      solde: [''],
      charge: [''],
      retrait: [''],
      caisse: [''],

      limit: 5
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listReg = []
    if(this.listTotalRegl.length != 0)
    {
      this.remplirTab(this.listTotalRegl)
    }
  }

  objectKeys = Object.keys;

  items = {
    typeOperation: "active",
    solde: "active",
    charge: "active",
    retrait: "active",
    caisse: "active",
  };

  itemsVariable = {
    typeOperation: "active",
    solde: "active",
    charge: "active",
    retrait: "active",
    caisse: "active",
  };

  request = {
    dateStart: "",
    dateEnd: "",
    magasin: "",
    search: {
      numero: "",
      client: "",
      modeReglement: "",
      typeReglement: "",
      montant: "",
      dateReglement: "",
      numCheque: "",
      dateEcheance: "",
    },
    orderBy: {
      numero: 0,
      client: 0,
      modeReglement: 0,
      typeReglement: 0,
      montant: 0,
      dateReglement: 0,
      numCheque: 0,
      dateEcheance: 0,
    },
    limit: 10,
    page: 1
  }

  oldRequest = {
    dateStart: "",
    dateEnd: "",
    search: {
      numero: "",
      client: "",
      modeReglement: "",
      typeReglement: "",
      montant: "",
      dateReglement: "",
      numCheque: "",
      dateEcheance: "",
    },
    orderBy: {
      numero: 0,
      client: 0,
      modeReglement: 0,
      typeReglement: 0,
      montant: 0,
      dateReglement: 0,
      numCheque: 0,
      dateEcheance: 0,
    },
    societe: "",
    limit: 10,
    page: 1
  }

  ngOnInit(): void {
  }

  listReg = []
  //Afficher la liste global
  isLoading = false
  getReglements() {
    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.dateStart = this.sessionCaisse.dateOuverture
    this.request.dateEnd = this.sessionCaisse.dateCloture
    this.request.limit = this.formC.value.limit
    this.request.magasin = this.informationGenerale.idSocieteCurrent

    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.isLoading = true

  }

  remplirTab(tab) {
    for (let item of tab.items) {
      let solde = item.debit - item.credit
      let caisse = solde
      let type = item.modeReglement
      this.listReg.push({typeOperation: type,
                         solde: solde,
                         charge: 0,
                         retrait: 0,
                         caisse:caisse})
    }
  }
  
  //initialiser le completation de lignes si  
  //les lignes de table est inferieur a 6
  emptyTable = []
  initialisationEmptyTable() {
    this.emptyTable = []
    if (this.listReg.length < 4) {
      for (let i = this.listReg.length; i < 4; i++) {
        this.emptyTable.push({})
      }
      return true
    }
    return false
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

    if (request1.limit != request2.limit) {
      return false
    }

    return true;
  }

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getReglements()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getReglements()
  }

  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.request.orderBy[key] == 1) {
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    } else {
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.request.orderBy) {
      if (key != varkey) {
        this.request.orderBy[varkey] = 0
      }
    }

    this.getReglements()
  }

  activationCroissante(buttons1, buttons2) {
    var buttons = document.getElementsByClassName("croissante");

    for (let i = 0; i < buttons.length; i++) {
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante", "")
      buttons[i].setAttribute("class", classList)
    }

    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante", "")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }
}
