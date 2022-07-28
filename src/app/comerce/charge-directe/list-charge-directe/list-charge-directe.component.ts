import { ChargeDirecte } from './../../../model/modelComerce/charge-directe/charge-directe';
import { ChargeDirecteService } from 'src/app/services/serviceBD_Comerce/charge-directe/charge-directe.service';
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
  selector: 'app-list-charge-directe',
  templateUrl: './list-charge-directe.component.html',
  styleUrls: ['./list-charge-directe.component.scss']
})
export class ListChargeDirecteComponent implements OnInit {
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
    this.chargeDirecteSe.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getChargeDirectes()
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
    this.params1Delete = "La ChargeDirecte"
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
    private chargeDirecteSe: ChargeDirecteService,
    public fonctionPartagesService: FonctionPartagesService,
    ) {
   
    this.formC = this.fb.group({
      libelle:[''],  
      limit:10
    })
    this.getChargeDirectes()
    this.getAllParametres()

  }

  gotToAdd(){
    this.router.navigate(['chargeDirectes/ajout']);
  }

  chargeDirecte : ChargeDirecte ;
  erreurChargeDirecte = {
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

  chargeDirectes = []

  getChargeDirectes() {
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
    this.chargeDirecteSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.chargeDirectes = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if(this.totalPage < this.request.page && this.request.page != 1){
              this.request.page = this.totalPage 
              this.getChargeDirectes()
            }
  
            if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
              this.getChargeDirectes()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  controleInputs() {
    for (let key in this.erreurChargeDirecte) {
      this.erreurChargeDirecte[key] = ""
    }
    var isValid = true
    for (let key in this.erreurChargeDirecte) {
      if (this.chargeDirecte[key] == "") {
        this.erreurChargeDirecte[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    for (let i = 0; i < this.tabLibelle.length; i++) {
      if (this.chargeDirecte.libelle == this.tabLibelle[i]) {
        this.erreurChargeDirecte.libelle = "Votre libelle existe déja"
        isValid = false
        break;
      }
    }
    return isValid
  }
  //modifier ChargeDirecte
  id = ""
  modifierChargeDirecte() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.chargeDirecteSe.update(this.id, this.chargeDirecte, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getChargeDirectes()
            this.notificationToast.showSuccess("Votre ChargeDirecte est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //Get parametre of ChargeDirecte
  tabLibelle = []
  allChargeDirectes = []
  getAllParametres() {
    this.chargeDirecteSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allChargeDirectes = resultat.chargeDirectes
            for (let item of this.allChargeDirectes) {
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
  getDataToHtml(chargeDirectes) {
    return this.fctList.getDataToHtml(this.chargeDirectes)
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
    this.chargeDirecte = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  openModifier(content, contact) {
    this.chargeDirecte = contact
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
    this.getChargeDirectes()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getChargeDirectes()
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
    this.getChargeDirectes()
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutChargeDirecte() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajoutCharge
    this.isOpenModalAjoutElement = true
  }
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }
  //Save ChargeDirecte
  enregistrerChargeDirecte() {
    if (!this.fnctModel.controleInputs(this.erreurChargeDirecte, this.chargeDirecte,this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.chargeDirecteSe.create(this.chargeDirecte, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getChargeDirectes()
            this.notificationToast.showSuccess("Votre ChargeDirecte est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }
}
