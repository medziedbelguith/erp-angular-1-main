import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FraisService } from 'src/app/services/serviceBD_Commerce/frais.service';
import { formatDate } from '@angular/common';
import { UtiliteService } from 'src/app/services/utilite.service';

@Component({
  selector: 'app-list-frais',
  templateUrl: './list-frais.component.html',
  styleUrls: ['./list-frais.component.scss']
})
export class ListFraisComponent implements OnInit {

  formC:FormGroup

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem(){    
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.fraisServ.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getFrais()
            this.closeModalDelete()
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
    this.params1Delete = "Le Frais"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  constructor(
    private fb:FormBuilder, 
    private router:Router,  
    public informationGenerale: InformationsService,
    private fraisServ : FraisService,
    private utilite:UtiliteService, ) {
   
    this.formC = this.fb.group({
      type:[''],
      direct:[''],
     
      limit:10
    })

    this.getFrais()

  }
  gotToAdd(){
    this.router.navigate(['variable/frais/ajout']);
  }

  objectKeys = Object.keys;

  items = { 
    type:"active",
    direct:"active",
  };

  itemsVariable = { 
    type:"active",
    direct:"active",
  };

  request = { 
    search:{
      type:"",
      direct:"",
    },
    orderBy:{ 
      type:0,
      direct:0,
    },
    limit: 10,
    page:1,
    societe:""
  } 

  oldRequest = { 
    search:{
      type:"",
      direct:"",
    },
    orderBy:{ 
      type:0,
      direct:0,
    },
    limit: 10,
    page:1,
    societe:""
  }

  ngOnInit(): void {
  }
  isLoading = false

  frais = []
  getFrais() {
    if (this.isLoading) {
      return
    }
    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent   
    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }
    this.isLoading = true
    this.fraisServ.getAll(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.frais = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getFrais()
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getFrais()
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
    this.getFrais()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getFrais()
  }

  titreFile = "Liste des fraiss"
  nameFile = "liste_fraiss"
  printout() {
    this.utilite.printout(this.frais, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.frais, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.frais, this.items, this.titreFile, this.nameFile)
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

    this.getFrais()
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

