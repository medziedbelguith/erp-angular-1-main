import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import { Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { UtilitearticleService } from 'src/app/comerce/article/services/utilitearticle.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { ModeLivraisonService } from 'src/app/services/serviceBD_Commerce/modeLivraison.service';

@Component({
  selector: 'app-list-mode-livraison',
  templateUrl: './list-mode-livraison.component.html',
  styleUrls: ['./list-mode-livraison.component.scss']
})
export class ListModeLivraisonComponent implements OnInit {
  formC:FormGroup

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  constructor(
    private fonctionPartagesService:FonctionPartagesService, 
    private utilite:UtiliteService, 
    private fb:FormBuilder, 
    private router:Router, 
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    private modeLivSer: ModeLivraisonService,) {
   
    this.formC = this.fb.group({
      libelle:[''],
    
      limit:10
    })

    this.getModeLivraisons()

  }

  objectKeys = Object.keys;

  items = { 
    libelle:"Libelle",
  };

  itemsVariable = { 
    libelle:"active",
  };

  request = { 
    search:{
      libelle:"",  
    },
    orderBy:{ 
      libelle:0,
    },
    limit: 10,
    page:1,
    societe:""
  } 

  oldRequest = { 
    search:{
      libelle:"",    
    },
    orderBy:{ 
      libelle:0,
    },
    limit: 10,
    page:1,
    societe:""
  }

  ngOnInit(): void {
  }

  isLoading = false
  modeLivraisons = []
  getModeLivraisons() {
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
    this.modeLivSer.getAll(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.modeLivraisons = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getModeLivraisons()
          }
          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getModeLivraisons()
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  deleteItem(){   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.modeLivSer.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getModeLivraisons()
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
    this.params1Delete = "La mode Livraison"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
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
   
    if(request1.limit != request2.limit){
      return false
    }

    return true;
  }

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getModeLivraisons()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getModeLivraisons()
  }

  titreFile = "Liste de modes de livraison"
  nameFile = "liste_mode_livraison"
  printout() {
    this.utilite.printout(this.modeLivraisons, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.modeLivraisons, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.modeLivraisons, this.items, this.titreFile, this.nameFile)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getModeLivraisons()
  }
  
  openModalAjout(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModeLivraison
    this.isOpenModalAjoutElement = true
  }

  openModalModifier(id){
    this.idAjoutElementModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierModeLivraison
    this.isOpenModalAjoutElement = true
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
    
    this.getModeLivraisons()
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
