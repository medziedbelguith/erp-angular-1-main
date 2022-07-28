import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { TachePreventifService } from 'src/app/services/serviceBD_GMAO/tache-preventif.service';

@Component({
  selector: 'app-list-tache-preventif',
  templateUrl: './list-tache-preventif.component.html',
  styleUrls: ['./list-tache-preventif.component.scss']
})
export class ListTachePreventifComponent implements OnInit {
  formC: FormGroup

  //pour effacer un champs avec POP-Up
  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""
  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "La tachePreventif"
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
    this.tachePreventifSe.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getTachePreventifs()
            this.closeModalDelete()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public informationGenerale: InformationsService,
    private fctList: FctListService,
    private tachePreventifSe: TachePreventifService) {

    this.formC = this.fb.group({
      planPreventif: [''],
      dateExecution: [''],
      personnel: [''],
      machine: [''],
      etatTache: [''],
      montant: [''],
      notes: [''],
      limit: 10
    })
    this.getTachePreventifs()
  }
  gotToAdd() {
    this.router.navigate(['gmao/tachePreventif/ajout']);
  }

  objectKeys = Object.keys;
  items = {
    planPreventif: "active",
    dateExecution: "active",
    personnel: "active",
    machine: "active",
    etatTache: "active",
    montant: "active",
    notes: "active",
  };

  itemsVariable = {
    planPreventif: "active",
    dateExecution: "active",
    personnel: "active",
    machine: "active",
    etatTache: "active",
    montant: "active",
    notes: "active",
  };

  request = {
    search: {
      planPreventif: "",
      dateExecution: "",
      personnel: "",
      machine: "",
      etatTache: "",
      montant: "",
      notes: "",
    },
    orderBy: {
      planPreventif: 0,
      dateExecution: 0,
      personnel: 0,
      machine: 0,
      montant: 0,
      notes: 0,
    },
    limit: 10,
    page: 1,
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  oldRequest = {
    search: {
      planPreventif: "",
      dateExecution: "",
      personnel: "",
      machine: "",
      montant: "",
      notes: "",
    },
    orderBy: {
      planPreventif: 0,
      dateExecution: 0,
      personnel: 0,
      machine: 0,
      montant: 0,
      notes: 0,
    },
    limit: 10,
    page: 1,
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  ngOnInit(): void {
  }

  isLoading = false
  tachePreventifs = []
  getTachePreventifs() {
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
    this.tachePreventifSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.tachePreventifs = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getTachePreventifs()
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getTachePreventifs()
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
    this.getTachePreventifs()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getTachePreventifs()
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

    this.getTachePreventifs()
  }

  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(tachePreventifs) {
    return this.fctList.getDataToHtml(this.tachePreventifs)
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
