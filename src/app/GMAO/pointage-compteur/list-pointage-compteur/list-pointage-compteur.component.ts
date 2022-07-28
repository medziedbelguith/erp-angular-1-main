import { PointageCompteurService } from './../../../services/serviceBD_GMAO/pointage-compteur.service';
import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pointage-compteur',
  templateUrl: './list-pointage-compteur.component.html',
  styleUrls: ['./list-pointage-compteur.component.scss']
})
export class ListPointageCompteurComponent implements OnInit {
  formC: FormGroup

  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    public informationGenerale: InformationsService,
    private fctList: FctListService,
    private pointageComSe: PointageCompteurService) {

    this.formC = this.fb.group({
      numero: [''],
      date: [''],
      vehicule: [''],
      chauffeur: [''],
      valeurCompteur: [''],
      notes: [''],
      limit: 10
    })
    this.getPointageCompteurs()
  }

  gotToAdd() {
    this.router.navigate(['gmao/pointageCompteur/ajout']);
  }

  objectKeys = Object.keys;

  items = {    
    numero: "active",
    date: "active",
    vehicule: "active",
    chauffeur: "active",
    valeurCompteur: "active",
    notes: "active",
  };

  itemsVariable = {
    numero: "active",
    date: "active",
    vehicule: "active",
    chauffeur: "active",
    valeurCompteur: "active",
    notes: "active",
  };

  request = {
    search: {
      numero: "",
      date: "",
      vehicule: "",
      chauffeur: "",
      valeurCompteur: "",
      notes: "",
    },
    orderBy: {
      numero: 0,
      date: 0,
      vehicule:0,
      chauffeur: 0,
      valeurCompteur:0,
      notes: 0,
    },
    limit: 10,
    page: 1,
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  oldRequest = {
    search: {
      numero: "",
      date: "",
      vehicule: "",
      chauffeur: "",
      valeurCompteur: "",
      notes: "",
    },
    orderBy: {
      numero: 0,
      date: 0,
      vehicule:0,
      chauffeur: 0,
      valeurCompteur:0,
      notes: 0,
    },
    limit: 10,
    page: 1,
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  ngOnInit(): void {
  }

  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.pointageComSe.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getPointageCompteurs()
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
    this.params1Delete = "La pointageCompteur"
    this.params2Delete = params2
  }
  //pour fermer POP-Up du supprission
  closeModalDelete() {
    this.isOpenModalDelete = false
  }
  isLoading = false
  pointageCompteurs = []
  getPointageCompteurs() {
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
    this.pointageComSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
            if (resultat.status) {
              this.pointageCompteurs = resultat.resultat.docs
              this.totalPage = resultat.resultat.pages
              this.oldRequest = resultat.request
              if (this.totalPage < this.request.page && this.request.page != 1) {
                this.request.page = this.totalPage
                this.getPointageCompteurs()
              }
              if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
                this.getPointageCompteurs()
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
  getDataToHtml(pointageCompteurs) {
    return this.fctList.getDataToHtml(this.pointageCompteurs)
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

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getPointageCompteurs()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getPointageCompteurs()
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
    this.getPointageCompteurs()
  }
}
