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
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.scss']
})
export class ExercicesComponent implements OnInit {

  formC:FormGroup

  lienDelete = "/exercices/deleteExercice"
  lienList = "/exercices/listExercices"

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
            this.getExercices()
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
    this.params1Delete = "Exercice"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  constructor(
    private fb:FormBuilder, 
    private router:Router, 
    private http: HttpClient, 
    public informationGenerale: InformationsService, 
    private utilite:UtiliteService,
    private fonctionPartagesService:FonctionPartagesService
   ) {
   
    this.formC = this.fb.group({
      exercice:[''],
      isEnCours:[''],
      limit:3
    })

    this.getExercices()

  }
 
  objectKeys = Object.keys;

  items = { 
    exercice:"Exercice",
    isEnCours:"En Cours"
  };

  itemsVariable = { 
    exercice:"active",
    isEnCours:"active"
  };

  request = { 
    search:{
      exercice:"" ,
      isEnCours:""
    },
    orderBy:{ 
      exercice:0,
      isEnCours:0
    },
    limit: 3,
    page:1,
    societe:""
  } 

  oldRequest = { 
    search:{
      exercice:"" ,
      isEnCours:""
    },
    orderBy:{ 
      exercice:0,
      isEnCours:0
    },
    limit: 3,
    page:1,
    societe:""
  }

  ngOnInit(): void {
  }
  isLoading = false

  exercices = []

  getExercices() {

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

    this.http.post(this.informationGenerale.baseUrl + this.lienList, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.exercices = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getExercices()
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getExercices()
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
    this.getExercices()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getExercices()
  }

  titreFile = "Liste de exercices"
  nameFile = "liste_exercices"
  printout() {
    this.utilite.printout(this.exercices, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.exercices, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.exercices, this.items, this.titreFile, this.nameFile)
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
    this.getExercices()
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

   //open modal ajout Element
   isOpenModalAjoutElement = false
   idModifierExerciceModal = ""
   typeElement

   closeModalAjoutElement(){
     this.isOpenModalAjoutElement = false
     this.getExercices()
   }
 
   openModalAjout(){
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterExercice
      this.isOpenModalAjoutElement = true
   }

   openModalUpdate(id){
    this.idModifierExerciceModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierExercice
    console.log(this.typeElement)
    this.isOpenModalAjoutElement = true
   }

}