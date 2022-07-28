import { Mission } from './../../../model/modelGMAO/mission.model';
import { MissionService } from './../../../services/serviceBD_GMAO/mission.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-mission',
  templateUrl: './list-mission.component.html',
  styleUrls: ['./list-mission.component.scss']
})
export class ListMissionComponent implements OnInit {
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
    this.missionSe.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getMissions()
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
    this.params1Delete = "La Mission"
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }
  constructor(
    private fb:FormBuilder, 
    private router:Router, 
    private http: HttpClient, 
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fnctModel: FnctModelService,
    private fctList: FctListService,
    private missionSe: MissionService,
    public fonctionPartagesService: FonctionPartagesService,
    ) {
   
    this.formC = this.fb.group({
      libelle:[''],  
      limit:10
    })
    this.getMissions()
    this.getAllParametres()

  }

  gotToAdd(){
    this.router.navigate(['gmao/missions/ajout']);
  }

  mission : Mission ;
  erreurMission = {
    libelle: "",
  }
  objectKeys = Object.keys;

  items = { 
    libelle:"active",
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
    societeRacine: this.informationGenerale.idSocieteCurrent,
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
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  ngOnInit(): void {
  }
  isLoading = false

  missions = []

  getMissions() {
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
    this.missionSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log("resultat",resultat)
            this.missions = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if(this.totalPage < this.request.page && this.request.page != 1){
              this.request.page = this.totalPage 
              this.getMissions()
            }
  
            if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
              this.getMissions()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  controleInputs() {
    for (let key in this.erreurMission) {
      this.erreurMission[key] = ""
    }
    var isValid = true
    for (let key in this.erreurMission) {
      if (this.mission[key] == "") {
        this.erreurMission[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    for (let i = 0; i < this.tabLibelle.length; i++) {
      if (this.mission.libelle == this.tabLibelle[i]) {
        this.erreurMission.libelle = "Votre libelle existe déja"
        isValid = false
        break;
      }
    }
    return isValid
  }
  //modifier Mission
  id = ""
  modifierMission() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.missionSe.update(this.id, this.mission, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getMissions()
            this.notificationToast.showSuccess("Votre mission est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //Get parametre of mission
  tabLibelle = []
  allMissions = []
  getAllParametres() {
    this.missionSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allMissions = resultat.missions
            for (let item of this.allMissions) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(missions) {
    return this.fctList.getDataToHtml(this.missions)
  }

  //pour rendre chaine to HTML
  stringToHtml(str) {
    return this.fctList.stringToHtml(str)
  }

  //pour faire attendre 
  wait(ms) {
    this.fctList.wait(ms)
  }

  //pour generer un PDF 
  generatePDF() {
    return this.fctList.generatePDF()
  }

  //pour exporter sous format excel 
  exportexcel() {
    return this.fctList.exportexcel()
  }

  //pour verifier la validité de 2 requests 
  testSyncronisation(request1, request2) {
    return this.fctList.testSyncronisation(request1, request2)
  }

  //pour changer croissante des variables
  activationCroissante(buttons1, buttons2) {
    this.fctList.activationCroissante(buttons1, buttons2)
  }

  //pour ouvrir un POP-Up
  open(content) {
    this.mission = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  openModifier(content, contact) {
    this.mission = contact
    this.fnctModel.openModifier(content, contact)
  }

  //pour fermer un POP-Up
  JoinAndClose() {
    this.fnctModel.JoinAndClose()
  }

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getMissions()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getMissions()
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
    this.getMissions()
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutMission() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterMission
    this.isOpenModalAjoutElement = true
  }
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }
  //Save Mission
  enregistrerMission() {
    if (!this.fnctModel.controleInputs(this.erreurMission, this.mission,this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.missionSe.create(this.mission, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getMissions()
            this.notificationToast.showSuccess("Votre mission est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

}
