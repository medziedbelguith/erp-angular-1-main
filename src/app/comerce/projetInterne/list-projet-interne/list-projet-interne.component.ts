import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { ProjetInterneService } from 'src/app/services/serviceBD_Commerce/projetInterne.service';
import { UtiliteService } from 'src/app/services/utilite.service';

@Component({
  selector: 'app-list-projet-interne',
  templateUrl: './list-projet-interne.component.html',
  styleUrls: ['./list-projet-interne.component.scss']
})
export class ListProjetInterneComponent implements OnInit {
  formBL: FormGroup

  pageDetails = "/projetInterne/details/"
  pageModifie = "/projetInterne/modifier/"
  pageAjoute = "/projetInterne/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  objectKeys = Object.keys;

  items = {
    reference: "active",
    libelle: "active",
    dateDebut: "active",
    dateFin: "active",
    statutOpportunite: "active",
    probabiliteOpportunite: "active",
    mantantOpportunite: "active",
    budget: "active",
    tauxAvancement: "active",
    description: "active",
  };

  itemsVariable = {
    reference: "active",
    libelle: "active",
    dateDebut: "active",
    dateFin: "active",
    statutOpportunite: "active",
    probabiliteOpportunite: "active",
    mantantOpportunite: "active",
    budget: "active",
    tauxAvancement: "active",
    description: "active",
  };

  request = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    societe: "",
    search: {
      reference: "",
      libelle: "",
      dateDebut: "",
      dateFin: "",
      statutOpportunite: "",
      probabiliteOpportunite: "",
      mantantOpportunite: "",
      budget: "",
      tauxAvancement: "",
      description: "",
    },
    orderBy: {
      reference: 0,
      libelle: 0,
      dateDebut: 0,
      dateFin: 0,
      statutOpportunite: 0,
      probabiliteOpportunite: 0,
      mantantOpportunite: 0,
      budget: 0,
      tauxAvancement: 0,
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
      dateDebut: "",
      dateFin: "",
      statutOpportunite: "",
      probabiliteOpportunite: "",
      mantantOpportunite: "",
      budget: "",
      tauxAvancement: "",
      description: "",
    },
    orderBy: {
      reference: 0,
      libelle: 0,
      dateDebut: 0,
      dateFin: 0,
      statutOpportunite: 0,
      probabiliteOpportunite: 0,
      mantantOpportunite: 0,
      budget: 0,
      tauxAvancement: 0,
      description: 0,
    },
    limit: 10,
    page: 1
  }

  constructor(  
    private projetInterSer: ProjetInterneService,
    private fb: FormBuilder,
    private router: Router,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    private utilite:UtiliteService, ) {

    this.formBL = this.fb.group({
      reference: [''],
      libelle: [''],
      dateDebut: [''],
      dateFin: [''],
      statutOpportunite: [''],
      probabiliteOpportunite: [''],
      mantantOpportunite: [''],
      budget: [''],
      tauxAvancement: [''],
      description: [''],
      limit: 10
    })
    this.getProjetInternes(this.request)
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
          this.getProjetInternes(this.request)
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre ProjetInterne est bien supprimée !")
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
    this.params1Delete = "Le projet interne"
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
  projetInternes = []
  getProjetInternes(request) {
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
    this.projetInterSer.getAll(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.projetInternes = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (this.totalPage < this.request.page && this.request.page != 1) {
            this.request.page = this.totalPage
            this.getProjetInternes(this.request)
          }
          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getProjetInternes(this.request)
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
    this.getProjetInternes(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getProjetInternes(this.request)
  }

  titreFile = "Liste de tache Projet Internes"
  nameFile = "liste_tache_projet_internes"
  printout() {
    this.utilite.printout(this.projetInternes, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.projetInternes, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.projetInternes, this.items, this.titreFile, this.nameFile)
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

    this.getProjetInternes(this.request)
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
