import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { OrdreMissionService } from 'src/app/services/serviceBD_Commerce/ordre-mission.service';

@Component({
  selector: 'app-list-ordre-emission',
  templateUrl: './list-ordre-emission.component.html',
  styleUrls: ['./list-ordre-emission.component.scss']
})
export class ListOrdreEmissionComponent implements OnInit {

  formC: FormGroup

  pageModifie = "ordreEmission/modifier/"
  pageAjoute = "ordreEmission/ajout"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "L'ordre Emission "
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    private utilite:UtiliteService, 
    public fonctionPartagesService:FonctionPartagesService,
    private ordreMisSer :  OrdreMissionService) {


    this.formC = this.fb.group({
      numero: [''],
      budget: [''],
      trajet: [''],
      camion: [''],
      chauffeur: [''],
      bonLivraison: [''],

      limit: 10
    })
    this.getOrdreEmissions()
  }

  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.ordreMisSer.delete(this.idDeleteModal)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.getOrdreEmissions()
          this.closeModalDelete()
          this.notificationToast.showSuccess("Votre ordre mission est bien supprimée !")
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }
  gotToAdd() {
    this.router.navigate(['ordreEmission/ajout']);
  }

  objectKeys = Object.keys;
  
  items = {
    numero: "Numero",
    budget: "Budget",
    trajet: "Trajet",
    camion: "Camion",
    chauffeur: "Chauffeur",
    bonLivraison: "Bon Livraison",
  };

  itemsVariable = {
    numero: "active",
    budget: "active",
    trajet: "active",
    camion: "active",
    chauffeur: "active",
    bonLivraison: "active",
  };

  request = {
    search: {
      numero:"",
      budget: "",
      trajet: "",
      camion: "",
      chauffeur: "",
      bonLivraison: "",
    },
    orderBy: {
      numero: 0,
      budget: 0,
      trajet: 0,
      camion: 0,
      chauffeur: 0,
      bonLivraison: 0,
    },
    societe:this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1
  }

  oldRequest = {
    search: {
      numero: "",
      budget: "",
      trajet: "",
      camion: "",
      chauffeur: "",
      bonLivraison: "",
    },
    orderBy: {
      numero: 0,
      budget: 0,
      trajet: 0,
      camion: 0,
      chauffeur: 0,
      bonLivraison: 0,
    },
    societe:this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1
  }

  ngOnInit(): void {
  }

  isLoading = false
  ordreEmissions = []
  getOrdreEmissions() {
    if (this.isLoading) {
      return
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    this.request.societe = this.informationGenerale.idSocieteCurrent 
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.isLoading = true
    this.ordreMisSer.getAll(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.ordreEmissions = resultat.resultat.docs
          this.totalPage = resultat.resultat.pages
          this.oldRequest = resultat.request
          if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
            this.getOrdreEmissions()
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getOrdreEmissions()
  }
  
  openModalAjout(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterOrdreEmission
    this.isOpenModalAjoutElement = true
  }

  openModalModifier(id){
    this.idAjoutElementModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierOrdreEmission
    this.isOpenModalAjoutElement = true
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
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getOrdreEmissions()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getOrdreEmissions()
  }

  titreFile = "Liste de ordre missions"
  nameFile = "liste_ordre_missions"
  printout() {
    this.utilite.printout(this.ordreEmissions, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.ordreEmissions, this.items, this.titreFile, this.nameFile)
  }
  
  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.ordreEmissions, this.items, this.titreFile, this.nameFile)
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

    this.getOrdreEmissions()
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
