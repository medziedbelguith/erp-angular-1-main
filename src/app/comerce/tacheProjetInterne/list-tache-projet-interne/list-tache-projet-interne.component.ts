import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';
import { TacheProjetInterneService } from 'src/app/services/serviceBD_Commerce/tacheProjetInterne.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-tache-projet-interne',
  templateUrl: './list-tache-projet-interne.component.html',
  styleUrls: ['./list-tache-projet-interne.component.scss']
})
export class ListTacheProjetInterneComponent implements OnInit {
  formBL: FormGroup

  pageDetails = "/tacheProjetInterne/details/"
  pageModifie = "/tacheProjetInterne/modifier/"
  pageAjoute = "/tacheProjetInterne/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.projetTacheInterSer.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getTacheProjetInternes(this.request)
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre TacheProjetInterne est bien supprimée !")
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
    this.params1Delete = "La Tache projet Interne"
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  constructor(
    public fonctionPartages: FonctionPartagesService,
    private projetTacheInterSer: TacheProjetInterneService,
    private fb: FormBuilder,
    private router: Router, 
    public informationGenerale: InformationsService,
    private utilite:UtiliteService, 
    private notificationToast: ToastNotificationService) {

    this.formBL = this.fb.group({
      reference: [''],
      libelle: [''],
      projetInterne: [''],
      affecteA: [''],
      dateDebut: [''],
      dateFin: [''],
      chargeTravail: [''],
      avancement: [''],
      description: [''],
      limit: 10
    })
    this.getTacheProjetInternes(this.request)
  }

  gotToAdd() {
    this.router.navigate([this.pageAjoute]);
  }

  objectKeys = Object.keys;

  items = {
    reference: "Référence",
    libelle: "Libelle",
    affecteA: "Affecte A",
    projetInterne: "Projet Interne",
    dateDebut: "Date Debut",
    dateFin: "Date Fin",
    chargeTravail: "Charge Travail",
    avancement: "Avancement",
    description: "Description",
  };

  itemsVariable = {
    reference: "Référence",
    libelle: "Libelle",
    affecteA: "Affecte A",
    projetInterne: "Projet Interne",
    dateDebut: "Date Debut",
    dateFin: "Date Fin",
    chargeTravail: "Charge Travail",
    avancement: "Avancement",
    description: "Description",
  };

  request = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    societe: "",
    search: {
      reference: "",
      libelle: "",
      projetInterne: "",
      affecteA: "",
      dateDebut: "",
      dateFin: "",
      chargeTravail: "",
      avancement: "",
      description: "",
    },
    orderBy: {
      reference: 0,
      libelle: 0,
      projetInterne: 0,
      affecteA: 0,
      dateDebut: 0,
      dateFin: 0,
      chargeTravail: 0,
      avancement: 0,
      description: 0,
    },
    limit: 10,
    page: 1
  }

  oldRequest = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    societe: "",
    search: {
      reference: "",
      libelle: "",
      projetInterne: "",
      affecteA: "",
      dateDebut: "",
      dateFin: "",
      chargeTravail: "",
      avancement: "",
      description: "",
    },
    orderBy: {
      reference: 0,
      libelle: 0,
      projetInterne: 0,
      affecteA: 0,
      dateDebut: 0,
      dateFin: 0,
      chargeTravail: 0,
      avancement: 0,
      description: 0,
    },
    limit: 10,
    page: 1
  }

  ngOnInit(): void {
  }

  isLoading = false

  tacheProjetInternes = []
  getTacheProjetInternes(request) {
    if (this.isLoading) {
      return
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formBL.value[key]
    }
    this.request.dateStart = request.dateStart
    this.request.dateEnd = request.dateEnd
    this.request.limit = this.formBL.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.isLoading = true
    this.projetTacheInterSer.getAll(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.tacheProjetInternes = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (this.totalPage < this.request.page && this.request.page != 1) {
            this.request.page = this.totalPage
            this.getTacheProjetInternes(this.request)
          }
          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getTacheProjetInternes(this.request)
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
    this.getTacheProjetInternes(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getTacheProjetInternes(this.request)
  }

  titreFile = "Liste de tache Projet Internes"
  nameFile = "liste_tache_projet_internes"
  printout() {
    this.utilite.printout(this.tacheProjetInternes, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.tacheProjetInternes, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.tacheProjetInternes, this.items, this.titreFile, this.nameFile)
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

    this.getTacheProjetInternes(this.request)
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
