import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import {formatDate} from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-bon-transfert',
  templateUrl: './list-bon-transfert.component.html',
  styleUrls: ['./list-bon-transfert.component.scss']
})
export class ListBonTransfertComponent implements OnInit {
  formBL:FormGroup

  apiDelete = "/bonTransferts/deleteBonTransfert"
  apiList = "/bonTransferts/listBonTransferts"
  
  pageDetails = "/bonTransfert/details/"
  pageModifie = "/bonTransfert/modifier/"
  pageAjoute = "/bonTransfert/ajout"

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
            this.getBonTransferts(this.request)
            this.closeModalDelete()
            this.notificationToast.showSuccess("Votre bonTransfert est bien supprimée !")
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
    this.params1Delete = "Le bonTransfert"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  
  constructor(private fb:FormBuilder, 
    private router:Router, private http: HttpClient, 
    public informationGenerale: InformationsService,
    private notificationToast:ToastNotificationService,
    public fonctionPartages:FonctionPartagesService,
    private utilite:UtiliteService) {
   
    this.formBL = this.fb.group({
      numero:[''],
      date:[''],
      totalRemise:[''],
      totalHT:[''],
      magasinDepart:[''],
      magasinArrive:[''],
    
      limit:5
    })
    this.getBonTransferts(this.request)
  }

  gotToAdd(){
    this.router.navigate([this.pageAjoute]);
  }

  objectKeys = Object.keys;

  itemsNotShowInput = ["magasinArrive","magasinDepart", "date"]

  titreFile = "Liste Bon Transfert"
  nameFile = "liste_bon_transfert"
  printout() {
    this.utilite.printout(this.bonTransferts, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.bonTransferts, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.bonTransferts, this.items, this.titreFile, this.nameFile)
  }
  
  items = { 
    numero:"Numero",
    date:"Date",
    totalRemise:"Total_Remise",
    totalHT:"total_HT",
    magasinDepart:"Magasin_Départ",
    magasinArrive:"Magasin_Arrivée",
  };

  itemsVariable = { 
    numero:"active",
    date:"active",
    totalRemise:"active",
    totalHT:"active",
    magasinDepart:"active",
    magasinArrive:"active",
  };

  request = { 
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search:{
      numero:"",
      date:"",
      totalRemise:"",
      totalHT:"",
      magasinDepart:"",
      magasinArrive:"",
    },
    orderBy:{ 
      numero:0,
      date:0,
      totalRemise:0,
      totalHT:0,
      magasinDepart:0,
      magasinArrive:0,
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
      tiers:"",
      totalRemise:"",
      totalHT:"",
      magasinDepart:"",
      magasinArrive:"",
    },
    orderBy:{ 
      numero:0,
      date:0,
      tiers:0,
      totalRemise:0,
      totalHT:0,
      magasinDepart:0,
      magasinArrive:0,
    },
    societe:"",
    limit: 5,
    page:1
  } 
  
  ngOnInit(): void {
  }

  isLoading = false

  bonTransferts = []

  getBonTransferts(request) {

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

    this.http.post(this.informationGenerale.baseUrl + this.apiList, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.bonTransferts = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getBonTransferts(this.request)
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getBonTransferts(this.request)
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
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
    this.getBonTransferts(this.request)
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getBonTransferts(this.request)
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
    
    this.getBonTransferts(this.request)
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
