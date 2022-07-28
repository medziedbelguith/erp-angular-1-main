import { SessionCaisseService } from 'src/app/services/serviceBD_Commerce/sessionCaisse.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';

@Component({
  selector: 'app-reglements-caisse',
  templateUrl: './reglements-caisse.component.html',
  styleUrls: ['./reglements-caisse.component.scss']
})
export class ReglementsCaisseComponent implements OnInit {

  @Input() sessionCaisse

  @Input() utilisateur

  @Input() changeVar

  @Output() listGlobalReg = new EventEmitter<string>();

  formC: FormGroup

  allCreDebs = [ 'credit', 'debit']

  constructor(
    private utilite: UtiliteService,
    private sessionCaisseSer: SessionCaisseService,
    private fb: FormBuilder,
    public informationGenerale: InformationsService,) {

    this.formC = this.fb.group({
      numero: [''],
      client: [''],
      modeReglement: [''],
      typeReglement: [''],
      montant: [''],
      dateReglement: [''],
      numCheque: [''],
      dateEcheance: [''],
      credit: [''],
      debit: [''],

      limit: 5
    })

    this.getReglements(this.request)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.changeVar == true) {
      this.request.dateStart = this.sessionCaisse.dateOuverture
      this.request.dateEnd = this.sessionCaisse.dateCloture
      this.getReglements(this.request)
    }
  }

  objectKeys = Object.keys;

  items = {
    numero: "active",
    typeReglement: "active",
    modeReglement: "active",
    montant: "active",
    dateReglement: "active",
    numCheque: "active",
    dateEcheance: "active",
    credit: "active",
    debit: "active",
  };

  itemsVariable = {
    numero: "active",
    typeReglement: "active",
    modeReglement: "active",
    montant: "active",
    dateReglement: "active",
    numCheque: "active",
    dateEcheance: "active",
    credit: "active",
    debit: "active",
  };

  request = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
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
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
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

  //Afficher
  reglements = []
  isLoading = false
  getReglements(request) {
    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    this.request.magasin = this.informationGenerale.idSocieteCurrent

    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }

    this.isLoading = true
    this.sessionCaisseSer.reglements(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.reglements = resultat.resultat.docs
            this.calculeCreditDebit(this.reglements)
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getReglements(this.request)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  listReg = []
  calculeCreditDebit(reglements) {
    for (let item of reglements) {
      let variable = {
        id : item.id,
        numero: item.numero,
        typeReglement: item.typeReglement,
        modeReglement: item.modeReglement,
        montant: item.montant,
        dateReglement: item.dateReglement,
        credit: 0,
        debit: 0,
        numCheque: item.numCheque,
        dateEcheance: item.dateEcheance,
      }

      if (item.typeReglement == "bonAchat" || item.typeReglement == "bonRetourClient") {
        variable.credit = item.montant
        this.listReg.push(variable)

      } else if (item.typeReglement == "bonLivraison" || item.typeReglement == "bonRetourFournisseur") {
        variable.debit = item.montant
        this.listReg.push(variable)
      }
    }

    this.envoitListeRegl.emit({items : this.listReg})
  }

  @Output() envoitListeRegl = new EventEmitter<Object>();

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
  getDate(date) {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getReglements(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getReglements(this.request)
  }

  titreFile = "Liste des sessions caisses"
  nameFile = "liste_sessionsCaisses"
  printout() {
    this.utilite.printout(this.reglements, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.reglements, this.items, this.titreFile, this.nameFile)
  }

  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.reglements, this.items, this.titreFile, this.nameFile)
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

    this.getReglements(this.request)
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
