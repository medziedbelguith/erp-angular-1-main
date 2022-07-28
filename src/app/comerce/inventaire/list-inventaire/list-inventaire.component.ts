import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InventaireService } from 'src/app/services/serviceBD_Commerce/inventaire.service';

@Component({
  selector: 'app-list-inventaire',
  templateUrl: './list-inventaire.component.html',
  styleUrls: ['./list-inventaire.component.scss']
})
export class ListInventaireComponent implements OnInit {
  formBL: FormGroup

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    private utilite:UtiliteService, 
    public fonctionPartagesService:FonctionPartagesService,
    private inventaireServ : InventaireService,) {

    this.formBL = this.fb.group({
      numero: [''],
      date: [''],
      categorie: [''],
      cloture: [''],
      personne: [''],
      note: [''],
      
      limit: 10
    })
    this.getInventaires()
  }

  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.inventaireServ.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getInventaires()
            this.closeModalDelete()
            this.notificationToast.showSuccess("Votre inventaire est bien supprimée !")
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
    this.params1Delete = "Le inventaire"
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  pageDetails= "/inventaire/details/"
  pageModifie = "/inventaire/modifier/"
  gotToAdd() {
    this.router.navigate(["/inventaire/ajout/"]);
  }

  objectKeys = Object.keys;
  items = {
    numero: "Numero",
    date: "Date",
    categorie: "Categorie",
    cloture: "Cloture",
    personne: "Personnel",
    note: "Note",
  };

  itemsVariable = {
    numero: "active",
    date: "active",
    categorie: "active",
    cloture: "active",
    personne: "active",
    note: "active",
  };

  ligneInventaire = [{
    article:"61c0692eb670950c58fff815",
    numero:"0",
    qteTeorique:0,
    qteInv1:0,
    qteInv2:0,
    qteInv3:0,
    qteInvValide:0,
    notes:"",
  }]

  request = {
    search: {
      numero: "",
      date: "",
      categorie: "",
      cloture: "",
      personne: "",
      note: "",
    },
    orderBy: {
      numero: 0,
      date: 0,
      categorie: 0,
      cloture: 0,
      personne: 0,
      note: 0,
    },
    limit: 10,
    page: 1,
    magasin:""
  }

  oldRequest = {
    search: {
      numero: "",
      date: "",
      categorie: "",
      cloture: "",
      personne: "",
      note: "",
    },
    orderBy: {
      numero: 0,
      date: 0,
      categorie: 0,
      cloture: 0,
      personne: 0,
      note: 0,
    },
    limit: 10,
    page: 1,
    magasin:""
  }

  ngOnInit(): void {
  }

  isLoading = false
  inventaires = []
  getInventaires() {
    if (this.isLoading) {
      return
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formBL.value[key]
    }
    this.request.limit = this.formBL.value.limit
    this.request.magasin = this.informationGenerale.idSocieteCurrent
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.isLoading = true
    this.inventaireServ.getAll(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.inventaires = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (this.totalPage < this.request.page && this.request.page != 1) {
            this.request.page = this.totalPage
            this.getInventaires()
          }

          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getInventaires()
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
    this.getInventaires()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getInventaires()
  }

  titreFile = "Liste des inventaires"
  nameFile = "liste_inventaires"
  printout() {
    this.utilite.printout(this.inventaires, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.inventaires, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.inventaires, this.items, this.titreFile, this.nameFile)
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

    this.getInventaires()
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
