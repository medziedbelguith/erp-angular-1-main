import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
const parametres = require("../parametres.json");

import { Router, NavigationEnd } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ajouter-reglement',
  templateUrl: './ajouter-reglement.component.html',
  styleUrls: ['./ajouter-reglement.component.scss']
})
export class AjouterReglementComponent implements OnInit {
  societeFormGroup: FormGroup;

  parametres2 = {
    typeReglement: "",
    apiAjoute: "",
    apiParametres: "",
    apiBons: "",
    titreAjouter: "",
    typeTier: "",
    pageList:""
  }

  objectKeys = Object.keys;

  request = {
    client: "",
    modeReglement: "",
    tresorerie: "",
    montant: 0,
    dateReglement: "",
    numCheque: "",
    dateEcheance: "",
    notes: "",
    societe: "",
    numero: "",
    reste: 0,
    typeReglement: "bonLivraison",
    activerLiltrage: "non",
    bonLivraisons: [],
    sessionCaisse : ""
  }

  reglement = {
    client: "",
    modeReglement: "",
    tresorerie: "",
    montant: 0,
    dateReglement: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    numCheque: "",
    dateEcheance: "",
    notes: "",
    societe: "",
    numero: "",
    reste: 0,
    typeReglement: "bonLivraison",
    activerLiltrage: "non",
    bonLivraisons: []
  }

  erreurReglement = {
    modeReglement: "",
    montant: "",
    client: "",
    dateReglement: "",
  }

  parametres = {
    allClients: [],
    allModeReglements: [],
    bonLivraisons: [],
  }

  ancienBonLivraisons = []

  constructor(
    private informationsService:InformationsService,
    private router: Router, 
    private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService) { }

  ngOnInit(): void {
    var key = this.router.url.replace("/reglement/", "")
    key = key.substring(0, key.indexOf('/'))
    this.parametres2 = parametres[key]

    this.getAllParametres()
    let sessionCaise = this.informationsService.getSessionCaisse()
    this.request.sessionCaisse = sessionCaise[0].id
  }

  getAllParametres() {
    this.http.post(this.informationGenerale.baseUrl + this.parametres2.apiParametres + this.informationGenerale.idSocieteCurrent, { typeReglement: this.parametres2.typeReglement }).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.parametres.allClients = resultat.clients
          this.parametres.allModeReglements = resultat.modeReglements
          this.reglement.numero = resultat.numeroAutomatique
        }
      }, err => {
        console.log(err)
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

  controleInputs() {
    for (let key in this.erreurReglement) {
      this.erreurReglement[key] = ""
    }
    var isValid = true
    for (let key in this.erreurReglement) {
      if (this.reglement[key] == "") {
        this.erreurReglement[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if (this.reglement.montant == 0) {
      this.erreurReglement.montant = "Votre Montant est null"
      isValid = false
    }
    return isValid
  }

  isLoading = false
  client
  ajoutReglement() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    this.client = this.parametres.allClients.filter((x) => x.id == this.reglement.client)[0]
    if (this.calculerDifference() > this.calculePeriode(this.client.conditionReglement)) {
      this.notificationToast.showError("Verifier votre date de règlement et echeance !")
      return
    }
    for (let key in this.reglement) {
      this.request[key] = this.reglement[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    var bonLivraisons = []
    for (let i = 0; i < this.parametres.bonLivraisons.length; i++) {
      if (this.parametres.bonLivraisons[i].montantAPayer != 0 || this.parametres.bonLivraisons[i].isPayee == "oui") {
        bonLivraisons.push(this.parametres.bonLivraisons[i])
      }
    }
    this.request.bonLivraisons = bonLivraisons
    this.request.typeReglement = this.parametres2.typeReglement
    this.http.post(this.informationGenerale.baseUrl + this.parametres2.apiAjoute, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre reglement est bien enregistrée !")
          this.router.navigate([this.parametres2.pageList]);
 
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  reseteFormulaire() {
    for (let key in this.erreurReglement) {
      this.reglement[key] = ""
    }
  }

  getBonLivraison() {

    if (this.reglement.activerLiltrage == "non" || this.reglement.client == "") {
      return
    }

    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.parametres2.apiBons + this.reglement.client).subscribe(
      res => {
        this.isLoading = false
        var resultat: any = res
        if (resultat.status) {
          let bonLivraisons = resultat.bonLivs
          let newBonLivraisons = []
          for (let i = 0; i < bonLivraisons.length; i++) {
            bonLivraisons[i].montantAPayer = 0
            bonLivraisons[i].montantTotal = bonLivraisons[i].totalTTC + bonLivraisons[i].timbreFiscale
            newBonLivraisons.push({
              id: bonLivraisons[i].id,
              montantAPayer: bonLivraisons[i].montantAPayer,
              montantTotal: bonLivraisons[i].montantTotal,
              montantPaye: bonLivraisons[i].montantPaye,
              restPayer: bonLivraisons[i].restPayer,
              isPayee: bonLivraisons[i].isPayee,
            })
          }

          this.parametres.bonLivraisons = bonLivraisons
          this.ancienBonLivraisons = newBonLivraisons

        }
      }, err => {
        this.isLoading = false
        alert("Désole, il y a un problème de connexion internet")
      }
    );

  }

  calculePeriode(periode) {
    const words = periode.split(' ');
    let nb = words[0]
    let date = words[1]
    switch (date) {
      case 'annee':
        return Number(nb) * 365
      case 'mois':
        return Number(nb) * 30
      case 'jours':
        return Number(nb)
    }
  }

  calculerDifference() {
    var date1s = new Date(this.reglement.dateReglement)
    var date2s = new Date(this.reglement.dateEcheance)
    var time_diff = date2s.getTime() - date1s.getTime()
    return (time_diff / (1000 * 3600 * 24))
  }

}
