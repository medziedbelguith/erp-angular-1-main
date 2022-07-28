import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-mode-reglement',
  templateUrl: './list-mode-reglement.component.html',
  styleUrls: ['./list-mode-reglement.component.scss']
})
export class ListModeReglementComponent implements OnInit {
  formC:FormGroup

  lienDelete = "/modeReglements/deleteModeReglement"
  lienList = "/modeReglements/listModeReglements"

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
            this.getModeReglements()
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
    this.params1Delete = "La modeReglement"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }

  constructor(
    private utilite:UtiliteService, 
    public fonctionPartagesService:FonctionPartagesService, 
    private fb:FormBuilder,
    private http: HttpClient, 
    public informationGenerale: InformationsService) {  
    this.formC = this.fb.group({
      libelle:[''],
      ordre:[''],
      valeurRetiree:[''],
      tierNecessaire:[''],
      enCours:[''],
    
      limit:10
    })

    this.getModeReglements()
  }

  objectKeys = Object.keys;

  items = { 
    libelle:"Libelle",
    ordre:"Ordre",
    valeurRetiree:"Valeur_Retiree",
    tierNecessaire:"Tier_Necessaire",
    enCours:"En_Cours",
    image:"Image"
    
  };

  itemsVariable = { 
    libelle:"active",
    ordre:"active",
    valeurRetiree:"active",
    tierNecessaire:"active",
    enCours:"active",
    image:"active"
  };

  request = { 
    search:{
      libelle:"",
      ordre:"",
      valeurRetiree:"",
      tierNecessaire:"" ,
      enCours:"",        
    },
    orderBy:{ 
      libelle:0,
      ordre:0,
      valeurRetiree:0,
      tierNecessaire:0,  
      enCours:0,          
    },
    limit: 10,
    page:1,
    societe:""
  } 

  oldRequest = { 
    search:{
      libelle:"",
      ordre:"",
      valeurRetiree:"",
      tierNecessaire:"",
      enCours:"",       
    },
    orderBy:{ 
      libelle:0,
      ordre:0,
      valeurRetiree:0,
      tierNecessaire:0, 
      enCours:0,        
    },
    limit: 10,
    page:1,
    societe:""
  }

  ngOnInit(): void {
  }
  isLoading = false

  modeReglements = []
  getModeReglements() {

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
          this.modeReglements = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if(this.totalPage < this.request.page && this.request.page != 1){
            this.request.page = this.totalPage 
            this.getModeReglements()
          }

          if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
            this.getModeReglements()
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
    this.getModeReglements()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getModeReglements()
  }

  titreFile = "Liste de modes reglements"
  nameFile = "liste_mode_reglements"
  printout() {
    this.utilite.printout(this.modeReglements, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.modeReglements, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.modeReglements, this.items, this.titreFile, this.nameFile)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getModeReglements()
  }
  
  openModalAjout(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModeReglement
    this.isOpenModalAjoutElement = true
  }

  openModalModifier(id){
    this.idAjoutElementModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierModeReglement
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
    
    this.getModeReglements()
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
