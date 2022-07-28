import { EtatTache } from './../../../model/modelGMAO/etatTache.model';
import { TachePreventif } from './../../../model/modelGMAO/tachePreventif.model';
import { PlanPreventifService } from 'src/app/services/serviceBD_GMAO/plan-preventif.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { TachePreventifService } from 'src/app/services/serviceBD_GMAO/tache-preventif.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-alert-tache',
  templateUrl: './alert-tache.component.html',
  styleUrls: ['./alert-tache.component.scss']
})
export class AlertTacheComponent implements OnInit {

  formC: FormGroup
  constructor(
    private fnctModel: FnctModelService,
    private fb: FormBuilder,
    private router: Router, private http: HttpClient,
    public informationGenerale: InformationsService,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService,
    private tachePreventifSe: TachePreventifService,
    private planPreventifSe: PlanPreventifService
  ) {

    this.formC = this.fb.group({
      day1: [''],
      day2: [''],
      allPlanPreventifs: [''],
      planPreventif: [''],
      dateExecution: [''],
      personnel: [''],
      machine: [''],
      etatTache: [''],
      montant: [''],
      nbJours: [''],

      limit: 10
    })
    this.getAllParametres()
  }

  objectKeys = Object.keys;

  itemsG = {
    planPreventif: "Plan preventif",
    numero: "Numero",
    dateExecution: "Date execution",
    machine: "Machine",
    montant: "Montant",
    etatTache: "Etat tache",
    check: "Fait"
  };

  itemsVariableG = {
    planPreventif: "Plan preventif",
    numero: "Numero",
    dateExecution: "Date execution",
    machine: "Machine",
    montant: "Montant",
    etatTache: "Etat tache",
    check: "Fait"
  };

  itemsVariableGOrderby = {
    planPreventif: 0,
    dateExecution: 0,
    personnel: 0,
    machine: 0,
    etatTache: 0,
    montant: 0,
  }

  request = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
    search: {
      alerteAvant: 0,
      dernierDate: "",
      dureeExecution: 0,
      fournisseur: "",
      id: "",
      interne: "",
      libelle: "",
      listTaches: [],
      machine: "",
      montant: 0,
      notes: "",
      operationPreventif: "",
      periodicite: "",
      prochaineDate: "",
      societeRacine: "",
      techniciens: [],
    },
    orderBy: {
      planPreventif: 0,
      dateExecution: 0,
      personnel: 0,
      machine: 0,
      etatTache: 0,
      montant: 0,
      notes: 0,
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 3,
    page: 1
  }

  oldRequest = {
    dateStart: this.informationGenerale.idDateAujourdCurrent,
    dateEnd: this.informationGenerale.idDateFinCurrent,
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
      etatTache: 0,
      montant: 0,
      notes: 0,
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 3,
    page: 1
  }

  ngOnInit(): void {
  }

  isLoading = false
  erreurAlerte = ""
  getReleveClient(request) {
    if(this.alerte.nbJours == 0){
      this.erreurAlerte = "Veuillez remplir ce champ"
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.dateStart = request.dateStart
    this.request.dateEnd = request.dateEnd
    this.isLoading = false
     if (this.isLoading) {
       return
     }
    console.log("this.plan",this.plan)
    this.initialiserListeTache(this.plan, request)
  }

  //Debut autocom PlanPreventif
  listGl = []
  tabAllRegroupeElem: any = []
  allPlanPreventifs = []
  allEtatTaches = []
  alerte ={
     nbJours : 0,
  }
  getAllParametres() {
    this.tachePreventifSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allPlanPreventifs = resultat.planPreventifs
            this.allEtatTaches = resultat.etatTaches
            for (let item in this.allPlanPreventifs) {
              this.allPlanPreventifs[item].dernierDate = formatDate(new Date(this.allPlanPreventifs[item].dernierDate), 'yyyy-MM-dd', 'en')
              this.allPlanPreventifs[item].prochaineDate = formatDate(new Date(this.allPlanPreventifs[item].prochaineDate), 'yyyy-MM-dd', 'en')
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    // var id = 0
    // this.planPreventifSe.listeTaches(this.informationGenerale.idSocieteCurrent)
    //   .subscribe(
    //     res => {
    //       let resultat: any = res
    //       if (resultat.status) {
    //         this.listGl = resultat.allListeTaches
    //         for (let i = 0; i < this.listGl.length; i++) {
    //           for (let j = 0; j < this.listGl[i].tab.length; j++) {
    //             for (let k = 0; k < this.listGl[i].tab[j].length; k++) {
    //               if(this.listGl[i].tab[j].alerteAvant < this.alerte.nbJours && this.listGl[i].tab[j].etatTache == "En Atttente")
    //               {
    //                 var item = {
    //                   id: id++,
    //                   planPreventif: this.listGl[i].planPreventif,
    //                   machine: this.listGl[i].machine,
    //                   dateExecution: this.listGl[i].tab[j][k].dateExecution,
    //                   etatTache: this.listGl[i].tab[j][k].etatTache,
    //                   montant: this.listGl[i].tab[j][k].montant,
    //                   numero: this.listGl[i].tab[j][k].numero,
    //                   personnel: this.listGl[i].tab[j][k].personnel,
    //                 }
    //                 this.tabAllRegroupeElem.push(item)
    //               }
    //             }
    //           }
    //         }
    //         console.log("this.tabAllRegroupeElem", this.tabAllRegroupeElem)
    //       }
    //     },
    //     error => {
    //       this.isLoading = false
    //       alert("Désole, ilya un problème de connexion internet")
    //     });
  }

  //autocomplete PlanPreventif
  keySelectedPlanPreventif = "libelle"
  objetPlanPreventif = {
    libelle: "Libelle",
    dernierDate: "Dernier date"
  }
  idPlanPreventif = ""
  plan
  setPlanPreventifID(id) {
    this.idPlanPreventif = id
    this.plan = ""
    this.plan = this.allPlanPreventifs.filter(x => x.id == id)[0]    
  }

  //autocomplete EtatTache
  keySelectedEtatTache = "libelle"
  objetEtatTache = {
    libelle: "Libelle",
  }
  idEtatTache = ""
  libEtat = ""
  idRep = ""
  setEtatTacheID(id) {
    this.idEtatTache = id
    this.libEtat = this.allEtatTaches.filter(x => x.id == id)[0].libelle
    this.idRep = this.allEtatTaches.filter(x => x.libelle == "Reporté")[0].id
    }

  listtache
  initialiserListeTache(plan,request) {
    var id = 0
    console.log("request",request)
    this.tabAllRegroupeElem = []
    for (let j of plan.listTaches) {
      if(j.etatTache == "6214eb9e9443ac15e4b49d19" && plan.alerteAvant <= this.alerte.nbJours )
      {
        j.dateExecution = formatDate(new Date(j.dateExecution), 'yyyy-MM-dd', 'en')
        console.log("j.dateExecution",j.dateExecution)
        if(request.dateStart >= j.dateExecution && j.dateExecution < request.dateEnd)
        {
          this.listtache = {
            dateExecution: j.dateExecution,
            etatTache: j.etatTache,
            machine: plan.machine,
            montant: j.montant,
            numero: j.numero,
            personnel: j.personnel,
            planPreventif: plan.libelle,
            id: id++,
          }
          this.tabAllRegroupeElem.push(this.listtache)
        }
      }
    }
  }

  listeTacheF = {
    dateExecution: "",
    etatTache: "",
    montant: "",
    numero: "",
    personnel: [],
  }
  listG = []
  listG2 = []
  clickFait(id) { 
    this.listG2 = this.tabAllRegroupeElem
    if (this.libEtat == "Reporté") {
      this.tabAllRegroupeElem = this.tabAllRegroupeElem.filter(x => x.id != id)
      this.libEtat = ""
      for (let key in this.listG2) {
        this.listeTacheF = {
          dateExecution: this.listG2[key].dateExecution,
          etatTache: this.idRep,
          montant: this.listG2[key].montant,
          numero: this.listG2[key].numero,
          personnel: this.listG2[key].personnel,
        }
        this.listG.push(this.listeTacheF)
      }
      this.plan.listTaches = this.listG
      this.planPreventifSe.update(this.plan.id, this.plan, this.request).subscribe();
    }
  }
  //open modal ajout PlanPreventif
  isOpenModalAjoutPlanPreventif = false
  idAjoutPlanPreventifModal = ""
  typeElement
  closeModalAjoutPlanPreventif() {
    this.isOpenModalAjoutPlanPreventif = false
    this.getAllParametres()
  }

  openModalAjoutPlanPreventif() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPlanPreventif
    this.isOpenModalAjoutPlanPreventif = true
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
    if (request1.dateStart != request2.dateStart || request1.dateEnd != request2.dateEnd) {
      return false
    }
    return true;
  }

  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.itemsVariableGOrderby[key] == 1) {
      this.itemsVariableGOrderby[key] = -1
      this.fonctionPartagesService.activationCroissante(buttons[0], buttons[1])

    } else {
      this.itemsVariableGOrderby[key] = 1
      this.fonctionPartagesService.activationCroissante(buttons[1], buttons[0])
    }
    for (let varkey in this.itemsVariableGOrderby) {
      if (key != varkey) {
        this.itemsVariableGOrderby[varkey] = 0
      }
    }
    this.listGl = this.fonctionPartagesService.orderByDocuments(this.itemsVariableGOrderby, this.listGl)
  }

  getDate(date) {
    return formatDate(new Date(date), 'dd/MM/yyyy', 'en')
  }
}
