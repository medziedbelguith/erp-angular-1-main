import { SessionCaisseService } from 'src/app/services/serviceBD_Commerce/sessionCaisse.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';

@Component({
  selector: 'app-list-session-caisse',
  templateUrl: './list-session-caisse.component.html',
  styleUrls: ['./list-session-caisse.component.scss']
})
export class ListSessionCaisseComponent implements OnInit {

  formC: FormGroup

  pageDetails = "sessionCaisses/details/"
  pageModifie = "sessionCaisses/modifier/"
  pageAjoute = "sessionCaisses/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem() {

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.sessionCaisseSer.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getSessionCaisses()
            this.closeModalDelete()
            this.notificationToast.showSuccess("Votre Session Caisse est bien supprimée !")
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
    this.params1Delete = "La session caisse "
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }


  constructor(
    private utilite: UtiliteService,
    private sessionCaisseSer: SessionCaisseService,
    private fb: FormBuilder,
    private router: Router,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService) {


    this.formC = this.fb.group({
      caisse: [''],
      utilisateur: [''],
      numero: [''],
      dateOuverture: [''],
      cloture: [''],
      dateCloture: [''],
      fondCaisseOuvrier: [''],
      fondCaisseAdmin: [''],
      totalCaisse: [''],
      montantDifference: [''],
      remarque: [''],
      limit: 10
    })
    this.getSessionCaisses()
  }

  gotToAdd() {
    this.router.navigate(['sessionCaisses/ajout']);
  }

  objectKeys = Object.keys;

  items = {
    caisse: "active",
    utilisateur: "active",
    numero: "active",
    dateOuverture: "active",
    cloture: "active",
    dateCloture: "active",
    fondCaisseOuvrier: "active",
    fondCaisseAdmin: "active",
    totalCaisse: "active",
    montantDifference: "active",
    remarque: "active",
  };

  itemsVariable = {
    caisse: "active",
    utilisateur: "active",
    numero: "active",
    dateOuverture: "active",
    cloture: "active",
    dateCloture: "active",
    fondCaisseOuvrier: "active",
    fondCaisseAdmin: "active",
    totalCaisse: "active",
    montantDifference: "active",
    remarque: "active",
  };

  request = {
    search: {
      caisse: "",
      utilisateur: "",
      numero: "",
      dateOuverture: "",
      cloture: "",
      dateCloture: "",
      fondCaisseOuvrier: "",
      fondCaisseAdmin: "",
      totalCaisse: "",
      montantDifference: "",
      remarque: "",
    },
    orderBy: {
      caisse: 0,
      utilisateur: 0,
      numero: "",
      dateOuverture: 0,
      cloture: 0,
      dateCloture: 0,
      fondCaisseOuvrier: 0,
      fondCaisseAdmin: 0,
      totalCaisse: 0,
      montantDifference: 0,
      remarque: 0,
    },
    societe:"",
    limit: 10,
    page: 1
  }

  oldRequest = {
    search: {
      caisse: "",
      utilisateur: "",
      numero: "",
      dateOuverture: "",
      cloture: "",
      dateCloture: "",
      fondCaisseOuvrier: "",
      fondCaisseAdmin: "",
      totalCaisse: "",
      montantDifference: "",
      remarque: "",
    },
    orderBy: {
      caisse: 0,
      utilisateur: 0,
      numero: "",
      dateOuverture: 0,
      cloture: 0,
      dateCloture: 0,
      fondCaisseOuvrier: 0,
      fondCaisseAdmin: 0,
      totalCaisse: 0,
      montantDifference: 0,
      remarque: 0,
    },
    societe:"",
    limit: 10,
    page: 1
  }

  ngOnInit(): void {
  }

  isLoading = false

  sessionCaisses = []

  getSessionCaisses() {

    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }

    this.isLoading = true
    this.sessionCaisseSer.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.sessionCaisses = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getSessionCaisses()
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

  getDate(date) {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getSessionCaisses()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getSessionCaisses()
  }

  titreFile = "Liste des sessions caisses"
  nameFile = "liste_sessionsCaisses"
  printout() {
    this.utilite.printout(this.sessionCaisses, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.sessionCaisses, this.items, this.titreFile, this.nameFile)
  }

  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.sessionCaisses, this.items, this.titreFile, this.nameFile)
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

    this.getSessionCaisses()
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
