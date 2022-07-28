import { BonTravailService } from './../../../services/serviceBD_Commerce/bonTravail.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { formatDate } from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-bon-travail',
  templateUrl: './list-bon-travail.component.html',
  styleUrls: ['./list-bon-travail.component.scss']
})
export class ListBonTravailComponent implements OnInit {
  formBL:FormGroup

  pageDetails = "/bonTravail/details/"
  pageModifie = "/bonTravail/modifier/"
  pageAjoute = "/bonTravail/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  constructor(
    private fb:FormBuilder, 
    private router:Router, 
    public informationGenerale: InformationsService,
    private notificationToast:ToastNotificationService,
    public fonctionPartages:FonctionPartagesService,
    private utilite:UtiliteService,
    private bonTravailSer: BonTravailService,
    
    ) {
   
    this.formBL = this.fb.group({
      numero:[''],
      date:[''],
      personnel:[''],
      totalHT:[''],
    
      limit:5
    })
    this.getBonTravails(this.request)
  }
  deleteItem(){     
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.bonTravailSer.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getBonTravails(this.request)
            this.closeModalDelete()
            this.notificationToast.showSuccess("Votre bonTravail est bien supprimée !")
         }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  openModalDelete(id, params2){
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "Le bon Travail"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  gotToAdd(){
    this.router.navigate([this.pageAjoute]);
  }

  objectKeys = Object.keys;

  itemsNotShowInput = ["magasinArrive","magasinDepart", "date"]

  items = { 
    numero:"Numero",
    date:"Date",
    personnel:"Personnel",
    totalHT:"TotalHT",
  };

  itemsVariable = { 
    numero:"active",
    date:"active",
    personnel:"active",
    totalHT:"active",
  };

  request = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search:{
      numero:"",
      date:"",
      personnel:"",
      totalHT:"",
    },
    orderBy:{ 
      numero:0,
      date:0,
      personnel:0,
      totalHT:0,
    },
    societe:"",
    limit: 5,
    page:1
  } 

  oldRequest = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search:{
      numero:"",
      date:"",
      personnel:"",
      totalHT:"",
    },
    orderBy:{ 
      numero:0,
      date:0,
      personnel:0,
      totalHT:0,
    },
    societe:"",
    limit: 5,
    page:1
  } 
  
  ngOnInit(): void {
  }

  isLoading = false

  bonTravails = []

  getBonTravails(request) {

    if (this.isLoading) {
      return
    }

    for(let key in this.request.search){
      this.request.search[key] = this.formBL.value[key]
    }

    this.request.dateStart = request.dateStart 
    this.request.dateEnd = request.dateEnd 
    this.request.limit = this.formBL.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }
    this.isLoading = true
    this.bonTravailSer.getAll(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.bonTravails = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getBonTravails(this.request)
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getBonTravails(this.request)
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  testSyncronisation(request1, request2){
    for(let key in request1.search){
      if(request1.search[key] != request2.search[key]){
        return false
      }
    }
 
    for(let key in request1.orderBy){
      if(request1.orderBy[key] != request2.orderBy[key]){
        return false
      }
    }

    if(request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd){
      return false
    }
   
    if(request1.limit != request2.limit){
      return false
    }

    return true;
  }

  totalPage = 1

  getDate(date){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en');
  }

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getBonTravails(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getBonTravails(this.request)
  }


  titreFile = "Liste Bon Travail"
  nameFile = "liste_bon_travail"
  printout() {
    this.utilite.printout(this.bonTravails, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.bonTravails, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.bonTravails, this.items, this.titreFile, this.nameFile)
  }

  changeCroissante(key){
    var classStyle = key+"-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if(this.request.orderBy[key] == 1){
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    }else{
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for(let varkey in  this.request.orderBy){
      if(key != varkey){
         this.request.orderBy[varkey] = 0
      }
    }
    
    this.getBonTravails(this.request)
  }


  activationCroissante(buttons1, buttons2){
    var buttons = document.getElementsByClassName("croissante");

    for(let i = 0; i < buttons.length; i++){
      var classList = buttons[i].getAttribute("class")
      classList = classList.replace("active-buttons-croissante","")
      buttons[i].setAttribute("class", classList) 
    }
   
    classList = buttons2.getAttribute("class")
    classList = classList.replace("active-buttons-croissante","")
    classList += " active-buttons-croissante"
    buttons2.setAttribute("class", classList)
  }
}
