import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import {formatDate} from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';

@Component({
  selector: 'app-list-bon-prelevement',
  templateUrl: './list-bon-prelevement.component.html',
  styleUrls: ['./list-bon-prelevement.component.scss']
})
export class ListBonPrelevementComponent implements OnInit {
  formBL:FormGroup

  apiDelete = "/bonPrelevements/deleteBonPrelevement"
  apiList = "/bonPrelevements/listBonPrelevements"
  
  pageDetails = "/bonPrelevement/details/"
  pageModifie = "/bonPrelevement/modifier/"
  pageAjoute = "/bonPrelevement/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem(){
     
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiDelete +"/"+this.idDeleteModal, {}).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getBonPrelevements(this.request)
            this.closeModalDelete()
            this.notificationToast.showSuccess("Votre bonPrelevement est bien supprimée !")
         }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  openModalDelete(id, params2){
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "Le bonPrelevement"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  
  constructor(
    private utilite: UtiliteService,
    private fb:FormBuilder, 
    private router:Router, private http: HttpClient, 
    public informationGenerale: InformationsService,
    private notificationToast:ToastNotificationService) {
   
    this.formBL = this.fb.group({
      numero:[''],
      date:[''],
      magasinier:[''],
      personnel:[''],
      articleAchats:[''],
    
      limit:5
    })
    this.getBonPrelevements(this.request)
  }

  gotToAdd(){
    this.router.navigate([this.pageAjoute]);
  }

  objectKeys = Object.keys;

  itemsNotShowInput = ["date"]

  items = { 
    numero:"active",
    date:"active",
    magasinier:"active",
    personnel:"active",
  };

  itemsVariable = { 
    numero:"active",
    date:"active",
    magasinier:"active",
    personnel:"active",
  };

  request = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search:{
      numero:"",
      date:"",
      magasinier:"",
      personnel:"",
      articleAchats:"",
    },
    orderBy:{ 
      numero:0,
      date:0,
      magasinier:0,
      personnel:0,
      articleAchats:0,
    },
    limit: 5,
    page:1
  } 

  oldRequest = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search:{
      numero:"",
      date:"",
      magasinier:"",
      personnel:"",
      articleAchats:"",
    },
    orderBy:{ 
      numero:0,
      date:0,
      magasinier:0,
      personnel:0,
      articleAchats:0,
    },
    limit: 5,
    page:1
  } 
  
  ngOnInit(): void {
  }

  isLoading = false

  bonPrelevements = []

  getBonPrelevements(request) {
    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formBL.value[key]
    }

    this.request.dateStart = request.dateStart 
    this.request.dateEnd = request.dateEnd 
    this.request.limit = this.formBL.value.limit

    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.bonPrelevements = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getBonPrelevements(this.request)
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getBonPrelevements(this.request)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  titreFile = "Liste Bon Prelevement"
  nameFile = "liste_bon_Prelevement"
  printout() {
    this.utilite.printout(this.bonPrelevements, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.bonPrelevements, this.items, this.titreFile, this.nameFile)
  }

  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.bonPrelevements, this.items, this.titreFile, this.nameFile)
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

    if (request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd) {
      return false
    }

    if (request1.limit != request2.limit) {
      return false
    }

    if (request1.magasin != request2.magasin) {
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
    this.getBonPrelevements(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getBonPrelevements(this.request)
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

    this.getBonPrelevements(this.request)
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
