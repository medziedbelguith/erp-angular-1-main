import { TypeFrais } from './../../../model/modelGMAO/typeFrais.model';
import { TypeFraisService } from './../../../services/serviceBD_GMAO/type-frais.service';
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
  selector: 'app-list-type-frais',
  templateUrl: './list-type-frais.component.html',
  styleUrls: ['./list-type-frais.component.scss']
})
export class ListTypeFraisComponent implements OnInit {
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
    this.typeFraisSe.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getTypeFraiss()
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
    this.params1Delete = "La typeFrais"
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
    private typeFraisSe: TypeFraisService,
    public fonctionPartagesService: FonctionPartagesService,
    ) {
   
    this.formC = this.fb.group({
      libelle:[''],  
      limit:10
    })
    this.getTypeFraiss()
    this.getAllParametres()

  }

  gotToAdd(){
    this.router.navigate(['gmao/typeFrais/ajout']);
  }

  typeFrais : TypeFrais ;
  erreurTypeFrais = {
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

  typeFraiss = []

  getTypeFraiss() {
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
    this.typeFraisSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log("resultat",resultat)
            this.typeFraiss = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if(this.totalPage < this.request.page && this.request.page != 1){
              this.request.page = this.totalPage 
              this.getTypeFraiss()
            }
  
            if(!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page) ){
              this.getTypeFraiss()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  controleInputs() {
    for (let key in this.erreurTypeFrais) {
      this.erreurTypeFrais[key] = ""
    }
    var isValid = true
    for (let key in this.erreurTypeFrais) {
      if (this.typeFrais[key] == "") {
        this.erreurTypeFrais[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    for (let i = 0; i < this.tabLibelle.length; i++) {
      if (this.typeFrais.libelle == this.tabLibelle[i]) {
        this.erreurTypeFrais.libelle = "Votre libelle existe déja"
        isValid = false
        break;
      }
    }
    return isValid
  }
  //modifier typeFrais
  id = ""
  modifierTypeFrais() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.typeFraisSe.update(this.id, this.typeFrais, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getTypeFraiss()
            this.notificationToast.showSuccess("Votre typeFrais est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //Get parametre of typeFrais
  tabLibelle = []
  allTypeFraiss = []
  getAllParametres() {
    this.typeFraisSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allTypeFraiss = resultat.typeFraiss
            for (let item of this.allTypeFraiss) {
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
  getDataToHtml(typeFraiss) {
    return this.fctList.getDataToHtml(this.typeFraiss)
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
    this.typeFrais = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  openModifier(content, contact) {
    this.typeFrais = contact
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
    this.getTypeFraiss()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getTypeFraiss()
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
    this.getTypeFraiss()
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutTypeFrais() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTypeFrais
    this.isOpenModalAjoutElement = true
  }
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }
  //Save typeFrais
  enregistrerTypeFrais() {
    if (!this.fnctModel.controleInputs(this.erreurTypeFrais, this.typeFrais,this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.typeFraisSe.create(this.typeFrais, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getTypeFraiss()
            this.notificationToast.showSuccess("Votre typeFrais est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }
}
