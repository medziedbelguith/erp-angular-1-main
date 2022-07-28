import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-modele',
  templateUrl: './list-modele.component.html',
  styleUrls: ['./list-modele.component.scss']
})
export class ListModeleComponent implements OnInit {

  formC: FormGroup

  apiDelete = "/modeles/deleteModele"
  apiList = "/modeles/listModeles"

  pageDetails = "variable/modele/details/"
  pageModifie = "variable/modele/modifier/"
  pageAjoute = "variable/modele/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem() {

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiDelete + "/" + this.idDeleteModal, {}).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getModeles()
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre modele est bien supprimée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "Le modele "
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }


  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    private utilite:UtiliteService,
    private fonctionPartagesService:FonctionPartagesService
    ) {


    this.formC = this.fb.group({

      libelle: [''],
      marque: [''],
      limit: 10
    })
    this.getModeles()
  }

  objectKeys = Object.keys;

  items = {
    libelle: "Libelle",
    marque: "Marque",
  };

  itemsVariable = {
    libelle: "active",
    marque: "active",
  };

  request = {
    search: {
      libelle: "",
      marque: "",
    },
    orderBy: {
      libelle: 0,
      marque: 0,
    },
    limit: 10,
    page: 1,
    societe:""
  }

  oldRequest = {
    search: {
      libelle: "",
      marque: "",
    },
    orderBy: {
      libelle: 0,
      marque: 0,
    },
    limit: 10,
    page: 1,
    societe:""
  }

  ngOnInit(): void {
  }

  isLoading = false

  modeles = []

  getModeles() {

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

    this.http.post(this.informationGenerale.baseUrl + "/modeles/listModeles", this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.modeles = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getModeles()
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
    this.getModeles()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getModeles()
  }

  titreFile = "Liste de modeles"
  nameFile = "liste_modeles"
  printout() {
    this.utilite.printout(this.modeles, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.modeles, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.modeles, this.items, this.titreFile, this.nameFile)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getModeles()
  }
  
  openModalAjout(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModele
    this.isOpenModalAjoutElement = true
  }

  openModalModifier(id){
    this.idAjoutElementModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierModele
    this.isOpenModalAjoutElement = true
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

    this.getModeles()
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
