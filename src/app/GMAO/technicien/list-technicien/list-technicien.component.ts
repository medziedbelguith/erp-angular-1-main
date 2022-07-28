import { TechnicienService } from 'src/app/services/serviceBD_GMAO/technicien.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';

@Component({
  selector: 'app-list-technicien',
  templateUrl: './list-technicien.component.html',
  styleUrls: ['./list-technicien.component.scss']
})
export class ListTechnicienComponent implements OnInit {
  formC: FormGroup

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    public informationGenerale: InformationsService,
    private fctList: FctListService,
    private technicienSe: TechnicienService) {

    this.formC = this.fb.group({
      nom: [''],
      prenom: [''],
      role: [''],
      email: [''],
      telephone: [''],
      adresse: [''],
      limit: 10
    })
    this.getTechniciens()
  }
  
  //pour effacer un champs avec POP-Up
  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.technicienSe.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getTechniciens()
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
    this.params1Delete = "La technicien"
    this.params2Delete = params2
  }
  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  gotToAdd() {
    this.router.navigate(['gmao/technicien/ajout']);
  }

  objectKeys = Object.keys;
  items = {
    nom: "active",
    prenom: "active",
    role: "active",
    email: "active",
    telephone: "active",
    adresse: "active",
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
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  oldRequest = {
    search: {
      nom: "",
      prenom: "",
      role: "",
      email: "",
      telephone: "",
      adresse: "",
    },
    orderBy: {
      nom: 0,
      prenom: 0,
      role: 0,
      email: 0,
      telephone: 0,
      adresse: 0,
    },
    limit: 10,
    page: 1,
    societe: this.informationGenerale.idSocieteCurrent,
  }

  ngOnInit(): void {
  }
  isLoading = false
  techniciens = []
  getTechniciens() {
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
    this.isLoading = true
    this.technicienSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.techniciens = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getTechniciens()
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getTechniciens()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getTechniciens()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getTechniciens()
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

    this.getTechniciens()
  }

  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(techniciens) {
    return this.fctList.getDataToHtml(this.techniciens)
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
}
