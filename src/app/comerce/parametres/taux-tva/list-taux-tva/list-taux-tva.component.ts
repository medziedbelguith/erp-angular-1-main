import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; 
import { Router } from '@angular/router';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-taux-tva',
  templateUrl: './list-taux-tva.component.html',
  styleUrls: ['./list-taux-tva.component.scss']
})
export class ListTauxTvaComponent implements OnInit {
  formC:FormGroup

  lienDelete = "/tauxTVAs/deleteTauxTVA"
  lienList = "/tauxTVAs/listTauxTVAs"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem(){     
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienDelete +"/"+this.idDeleteModal, {}).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.getTauxTVAs()
            this.closeModalDelete()
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
    this.params1Delete = "La TauxTVA"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  constructor(private utilite:UtiliteService, public fonctionPartagesService:FonctionPartagesService, private fb:FormBuilder, private router:Router, private http: HttpClient, public informationGenerale: InformationsService) {
   
    this.formC = this.fb.group({
      taux:[''],
      libelle:[''],
      limit:10
    })

    this.getTauxTVAs()

  }
  gotToAdd(){
    this.router.navigate(['parametre/tauxTVA/ajout']);
  }

  objectKeys = Object.keys;

  items = { 
    libelle:"Libelle",
    taux:"Taux",
  };

  itemsVariable = { 
    libelle:"Libelle",
    taux:"active",
  };

  request = { 
    search:{
      libelle:"",
      taux:"",   
    },
    orderBy:{ 
      libelle:0,
      taux:0,
    },
    societe:"",
    limit: 10,
    page:1,
  } 

  oldRequest = { 
    search:{
      libelle:"",
      taux:"",    
    },
    orderBy:{ 
      libelle:0,
      taux:0,
    },
    societe:"",
    limit: 10,
    page:1,
  }

  ngOnInit(): void {
  }
  isLoading = false

  tauxs = []

  getFormaThreeAfterVerguleNomber(float){
    var number = Number(float);
    return number.toFixed(2)
  }

  getTauxTVAs() {
    if (this.isLoading) {
      return
    }
    for(let key in this.request.search){
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit  
    if(!this.testSyncronisation(this.request, this.oldRequest)){
      this.request.page = 1
    }
    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.http.post(this.informationGenerale.baseUrl + this.lienList, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.tauxs = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getTauxTVAs()
          }
          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getTauxTVAs()
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
    if(request1.limit != request2.limit){
      return false
    }

    return true;
  }

  totalPage = 1

  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getTauxTVAs()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getTauxTVAs()
  }

  titreFile = "Liste de Taux TVA"
  nameFile = "liste_taux_TVA"
  printout() {
    this.utilite.printout(this.tauxs, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.tauxs, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.tauxs, this.items, this.titreFile, this.nameFile)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getTauxTVAs()
  }
  
  openModalAjout(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTauxTva
    this.isOpenModalAjoutElement = true
  }

  openModalModifier(id){
    this.idAjoutElementModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierTauxTva
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
    
    this.getTauxTVAs()
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
