import { PersonnelService } from './../../../services/serviceBD_Commerce/personnel.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtiliteService } from 'src/app/services/utilite.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.scss']
})
export class ListPersonnelComponent implements OnInit {
  formC: FormGroup

  lienDelete = "/personnels/deletePersonnel"
  lienList = "/personnels/listPersonnels"

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.personnelServ.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getPersonnels()
            this.closeModalDelete()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "Le personnel"
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }
  constructor(
    private personnelServ: PersonnelService,
    private utilite: UtiliteService,
    private fonctionPartagesService: FonctionPartagesService,
    private fb: FormBuilder,
    private router: Router,
    public informationGenerale: InformationsService) {

    this.formC = this.fb.group({
      nom: [''],
      prenom: [''],
      role: [''],
      email: [''],
      telephone: [''],
      adresse: [''],
      limit: 10
    })

    this.getPersonnels()

  }
  gotToAdd() {
    this.router.navigate(['personnel/ajout']);
  }

  objectKeys = Object.keys;

  items = {
    nom: "Nom",
    prenom: "Prenom",
    role: "Role",
    email: "Email",
    telephone: "Téléphone",
    adresse: "Adresse",
  };

  itemsVariable = {
    nom: "active",
    prenom: "active",
    role: "active",
    email: "active",
    telephone: "active",
    adresse: "active",
  };

  request = {
    search: {
      nom: "",
      prenom: "",
      role: "",
      email: "",
      telephone: "",
      adresse: ""
    },
    orderBy: {
      nom: 0,
      prenom: 0,
      role: 0,
      email: 0,
      telephone: 0,
      adresse: 0,
    },
    societeRacine: "",
    limit: 10,
    page: 1,
    societe: ""
  }

  oldRequest = {
    search: {
      nom: "",
      prenom: "",
      role: "",
      email: "",
      telephone: "",
      adresse: ""
    },
    orderBy: {
      nom: 0,
      prenom: 0,
      role: 0,
      email: 0,
      telephone: 0,
      adresse: 0,
    },
    societeRacine: "",
    limit: 10,
    page: 1,
    societe: ""
  }

  ngOnInit(): void {
  }
  isLoading = false

  personnels = []
  getPersonnels() {
    if (this.isLoading) {
      return
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.isLoading = true
    this.personnelServ.getAll(this.request)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.isLoading = false
            let resultat: any = res
            if (resultat.status) {
              console.log(resultat)
              this.personnels = resultat.resultat.docs
              this.totalPage = resultat.resultat.pages
              this.oldRequest = resultat.request
              if (this.totalPage < this.request.page && this.request.page != 1) {
                this.request.page = this.totalPage
                this.getPersonnels()
              }
              if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
                this.getPersonnels()
              }
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
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getPersonnels()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getPersonnels()
  }

  titreFile = "Liste de personnels"
  nameFile = "liste_personnels"
  printout() {
    this.utilite.printout(this.personnels, this.items, this.titreFile)
  }

  generatePDF() {
    this.utilite.generatePDF(this.personnels, this.items, this.titreFile, this.nameFile)
  }

  exportexcel() {
    /* table id is passed over here */
    this.utilite.exportexcel(this.personnels, this.items, this.titreFile, this.nameFile)
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getPersonnels()
  }

  openModalAjout() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
    this.isOpenModalAjoutElement = true
  }

  openModalModifier(id) {
    this.idAjoutElementModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.modifierPersonnel
    this.isOpenModalAjoutElement = true
  }

  openModalDetails(id) {
    this.idAjoutElementModal = id
    this.typeElement = this.fonctionPartagesService.titreOfModal.detailsPersonnel
    this.isOpenModalAjoutElement = true
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

    this.getPersonnels()
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
