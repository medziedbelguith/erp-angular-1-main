import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { PlanPreventifService } from 'src/app/services/serviceBD_GMAO/plan-preventif.service';

@Component({
  selector: 'app-list-plan-preventif',
  templateUrl: './list-plan-preventif.component.html',
  styleUrls: ['./list-plan-preventif.component.scss']
})
export class ListPlanPreventifComponent implements OnInit {
  formC: FormGroup

  //pour effacer un champs avec POP-Up
  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public informationGenerale: InformationsService,
    private fctList: FctListService,
    private planPreventifSe: PlanPreventifService) {

    this.formC = this.fb.group({
      libelle: [''],
      operationPreventif: [''],
      machine: [''],
      dernierDate: [''],
      prochaineDate: [''],
      periodicite: [''],
      alerteAvant: [''],
      interne: [''],
      dureeExecution: [''],
      montant: [''],
      notes: [''],
      limit: 10
    })
    this.getPlanPreventifs()
  }
  gotToAdd() {
    this.router.navigate(['gmao/planPreventif/ajout']);
  }

  objectKeys = Object.keys;
  items = {
    libelle: "active",
    operationPreventif: "active",
    machine: "active",
    dernierDate: "active",
    prochaineDate: "active",
    periodicite: "active",
    alerteAvant: "active",
    interne: "active",
    dureeExecution: "active",
    montant: "active",
    notes: "active",
  };

  itemsVariable = {
    libelle: "active",
    operationPreventif: "active",
    machine: "active",
    dernierDate: "active",
    prochaineDate: "active",
    periodicite: "active",
    alerteAvant: "active",
    interne: "active",
    dureeExecution: "active",
    montant: "active",
    notes: "active",
  };

  request = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search: {
      libelle: "",
      operationPreventif: "",
      machine: "",
      dernierDate: "",
      prochaineDate: "",
      periodicite: "",
      alerteAvant: "",
      interne: "",
      dureeExecution: "",
      montant: "",
      notes: "",
      fournisseur: "",
      techniciens: [],
      listTaches: [],
    },
    orderBy: {
      libelle: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  oldRequest = {
    dateStart: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateEnd: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    search: {
      libelle: "",
      operationPreventif: "",
      machine: "",
      dernierDate: "",
      prochaineDate: "",
      periodicite: "",
      alerteAvant: "",
      interne: "",
      dureeExecution: "",
      montant: "",
      notes: "",
      fournisseur: "",
      techniciens: [],
      listTaches: [],
    },
    orderBy: {
      libelle: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  ngOnInit(): void {
  }

  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "La planPreventif"
    this.params2Delete = params2
  }
  //pour fermer POP-Up du supprission
  closeModalDelete() {
    this.isOpenModalDelete = false
  }
  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.planPreventifSe.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getPlanPreventifs()
            this.closeModalDelete()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  
  isLoading = false
  planPreventifs = []
  getPlanPreventifs() {
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
    this.planPreventifSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log("resultat", resultat)
            this.planPreventifs = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getPlanPreventifs()
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getPlanPreventifs()
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
    this.getPlanPreventifs()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getPlanPreventifs()
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

    this.getPlanPreventifs()
  }

  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(planPreventifs) {
    return this.fctList.getDataToHtml(this.planPreventifs)
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
