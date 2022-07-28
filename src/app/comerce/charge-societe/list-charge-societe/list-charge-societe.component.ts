import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { ChargeSocieteService } from 'src/app/services/serviceBD_Commerce/ChargeSociete.service';
import { UtiliteService } from 'src/app/services/utilite.service';

@Component({
  selector: 'app-list-charge-societe',
  templateUrl: './list-charge-societe.component.html',
  styleUrls: ['./list-charge-societe.component.scss']
})
export class ListChargeSocieteComponent implements OnInit {
  formBL: FormGroup

  pageModifie = "/chargesSociete/modifier/"
  pageAjoute = "/chargesSociete/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  objectKeys = Object.keys;

  items = {
    date: "active",
    montant: "active",
    modeReglement: "active",
    motif: "active",
    proprietaire: "active",
    notes: "active",
  };

  itemsVariable = {
    date: "active",
    montant: "active",
    modeReglement: "active",
    motif: "active",
    proprietaire: "active",
    notes: "active",
  };

  request = {
    societe: "",
    search: {
      date: "",
      montant: "",
      modeReglement: "",
      motif: "",
      proprietaire: "",
      notes: "",
    },
    orderBy: {
      date: 0,
      montant: 0,
      modeReglement: 0,
      motif: "",
      proprietaire: 0,
      notes: 0,
    },
    limit: 10,
    page: 1
  }

  oldRequest = {
    societe: "",
    search: {
      date: "",
      montant: "",
      modeReglement: "",
      motif: "",
      proprietaire: "",
      notes: "",
    },
    orderBy: {
      date: 0,
      montant: 0,
      modeReglement: 0,
      motif: "",
      proprietaire: 0,
      notes: 0,
    },
    limit: 10,
    page: 1
  }

  constructor(
    private projetInterSer: ChargeSocieteService,
    private fb: FormBuilder,
    private router: Router,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    private utilite: UtiliteService,) {

    this.formBL = this.fb.group({
      date: [''],
      montant: [''],
      modeReglement: [''],
      motif: [''],
      proprietaire: [''],
      notes: [''],
      limit: 10
    })
    this.getChargeSocietes(this.request)
  }

  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.projetInterSer.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getChargeSocietes(this.request)
            this.closeModalDelete()
            this.notificationToast.showSuccess("Votre charge Societe est bien supprimée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "Le charge Societe"
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  gotToAdd() {
    this.router.navigate([this.pageAjoute]);
  }

  ngOnInit(): void {
  }

  isLoading = false
  chargeSocietes = []
  getChargeSocietes(request) {
    if (this.isLoading) {
      return
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formBL.value[key]
    }

    this.request.limit = this.formBL.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.isLoading = true
    this.projetInterSer.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.chargeSocietes = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getChargeSocietes(this.request)
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getChargeSocietes(this.request)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
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
    this.getChargeSocietes(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getChargeSocietes(this.request)
  }

  titreFile = "Liste de charge societe"
  nameFile = "liste_charge_societe"
  printout() {
    this.utilite.printout(this.chargeSocietes, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.chargeSocietes, this.items, this.titreFile, this.nameFile)
  }

  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.chargeSocietes, this.items, this.titreFile, this.nameFile)
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

    this.getChargeSocietes(this.request)
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

  getDate(date) {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }
}
