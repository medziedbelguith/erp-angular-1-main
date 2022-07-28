import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from '../../../services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { formatDate } from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';

@Component({
  selector: 'app-list-articles-vendu',
  templateUrl: './list-articles-vendu.component.html',
  styleUrls: ['./list-articles-vendu.component.scss']
})
export class ListArticlesVenduComponent implements OnInit {

  formBL: FormGroup

  apiList = "/articles/bonLivraisons"

  listInputNotShow = ["nbrVentes", "totalTTC", "totalTVA", "totalHT", "totalRemise"]

  constructor(
    private utilite:UtiliteService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService) {

    this.formBL = this.fb.group({
      reference: [''],
      designation: [''],
      quantiteVentes: [''],
      totalTTC: [''],
      totalTVA: [''],
      totalHT: [''],
      totalRemise: [''],
      limit: 10
    })

    this.getClients(this.request)

  }

  objectKeys = Object.keys;

  items = {
    reference: "active",
    designation: "active",
    quantiteVentes: "active",
    totalHT: "active",
    totalRemise: "active",
    totalTVA: "active",
    totalTTC: "active",
  };

  itemsVariable = {
    reference: "active",
    designation: "active",
    quantiteVentes: "active",
    totalHT: "active",
    totalRemise: "active",
    totalTVA: "active",
    totalTTC: "active",
  };

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      reference: "",
      designation: "",
      quantiteVentes: "",
      totalHT: "",
      totalRemise: "",
      totalTVA: "",
      totalTTC: "",
    },
    orderBy: {
      reference: 0,
      designation: 0,
      quantiteVentes: 0,
      totalHT: 0,
      totalRemise: 0,
      totalTVA: 0,
      totalTTC: 0,
    },
    societe :"",
    limit: 10,
    page: 1
  }

  oldRequest = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      reference: "",
      designation: "",
      quantiteVentes: "",
      totalHT: "",
      totalRemise: "",
      totalTVA: "",
      totalTTC: "",
    },
    orderBy: {
      reference: 0,
      designation: 0,
      quantiteVentes: 0,
      totalHT: 0,
      totalRemise: 0,
      totalTVA: 0,
      totalTTC: 0,
    },
    societe :"",
    limit: 10,
    page: 1
  }

  ngOnInit(): void {
  }

  isLoading = false

  clients = []

  getClients(request) {

    if (this.isLoading) {
      return
    }

    for (let key in this.request.search) {
      this.request.search[key] = this.formBL.value[key]
    }

    this.request.dateStart = request.dateStart
    this.request.dateEnd = request.dateEnd
    this.request.limit = this.formBL.value.limit

    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }

    this.isLoading = true

    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.clients = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (this.totalPage < this.request.page && this.request.page != 1) {
            this.request.page = this.totalPage
            this.getClients(this.request)
          }

          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getClients(this.request)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
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
    this.getClients(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getClients(this.request)
  }
  objetFile = {
    reference: "Référence",
    codeBarre: "Code_Barre",
    designation: "Désignation",
    qteEnStock: "Quantité en stock",
    qteTheorique: "Quantité théorique",
    prixFourn: "Prix fournisseur",
    remiseF: "Remise fournisseur (%)",
    marge: "Marge (%)",
    prixAchat: "PrixAchat",
    prixTTC: "Prix TTC",
    categorie: "Catégorie",
    marque: "Marque",
    modele: "Modele"
  }
  titreFile = "Liste d'articles vendu"
  nameFile = "liste_article_vendu"
  printout() {
    this.utilite.printout(this.clients, this.objetFile, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.clients, this.objetFile, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.clients, this.objetFile, this.titreFile, this.nameFile)
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

    this.getClients(this.request)
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

