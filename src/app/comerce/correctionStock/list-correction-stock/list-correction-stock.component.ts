import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { Router, RouterModule } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-correction-stock',
  templateUrl: './list-correction-stock.component.html',
  styleUrls: ['./list-correction-stock.component.scss']
})
export class ListCorrectionStockComponent implements OnInit {
  formBL: FormGroup

  apiDelete = "/correctionStocks/deleteCorrectionStock"
  apiList = "/correctionStocks/listCorrectionStocks"

  pageDetails = "/correctionStock/details/"
  pageModifie = "/correctionStock/modifier/"
  pageAjoute = "/correctionStock/ajout"

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
          this.getCorrectionStocks()
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre correctionStock est bien supprimée !")
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
    this.params1Delete = "Le correction stock"
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }
  
  constructor(private fb: FormBuilder,
    private router: Router, private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    private utilite:UtiliteService,
    public fonctionPartagesService:FonctionPartagesService) {

    this.formBL = this.fb.group({
      numero: [''],
      date: [''],
      personnel: [''],
      limit: 10
    })

    this.getCorrectionStocks()
  }

  gotToAdd() {
    this.router.navigate([this.pageAjoute]);
  }

  objectKeys = Object.keys;

  items = {
    numero: "Numero",
    date: "Date",
    personnel: "Personnel",
  };

  itemsVariable = {
    numero: "Numero",
    date: "Date",
    personnel: "Personnel",
  };

  
  request = {
    search: {
      numero: "",
      date: "",
      personnel: "",
    },
    orderBy: {
      numero: 0,
      date: 0,
      personnel: 0,
    },
    limit: 10,
    page: 1,
    societe:""
  }

  oldRequest = {
    search: {
      numero: "",
      date: "",
      personnel: "",
    },
    orderBy: {
      numero: 0,
      date: 0,
      personnel: 0,
    },
    limit: 10,
    page: 1,
    societe:""
  }

  ngOnInit(): void {
  }

  isLoading = false

  correctionStocks = []

  getCorrectionStocks() {

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

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.correctionStocks = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (this.totalPage < this.request.page && this.request.page != 1) {
            this.request.page = this.totalPage
            this.getCorrectionStocks()
          }

          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getCorrectionStocks()
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

  getDate(date) {
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getCorrectionStocks()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getCorrectionStocks()
  }

  titreFile = "Liste de corrections des stocks"
  nameFile = "liste_corrections_des_stocks"
  printout() {
    this.utilite.printout(this.correctionStocks, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.correctionStocks, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.correctionStocks, this.items, this.titreFile, this.nameFile)
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

    this.getCorrectionStocks()
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
