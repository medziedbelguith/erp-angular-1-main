import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { FonctionPartagesService } from '../services/fonction-partages.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parametres-page',
  templateUrl: './parametres-page.component.html',
  styleUrls: ['./parametres-page.component.scss']
})
export class ParametresPageComponent implements OnInit {

  fraisFormGroup: FormGroup;
  lienAjoute = "/parametres/setConfiguration"
  lienGet = "/parametres/getConfiguration/"

  objectKeys = Object.keys;

  request = {
    nombreChiffresApresVerguleNormale: 3,
    nombreChiffresApresVerguleQuantite: 3,
    prixTimbreFiscale: 0.6,
    tauxFodec: 1,
    coefficientRetenueImpot: 1.5,
    societe: "",
    clientPardefault: "",
    modeReglementPardefault : "",
    validationStockBonAchat:"non"
  }

  parametres = {
    nombreChiffresApresVerguleNormale: 3,
    nombreChiffresApresVerguleQuantite: 3,
    prixTimbreFiscale: 0.6,
    tauxFodec: 1,
    coefficientRetenueImpot: 1.5,
    societe: "",
    clientPardefault: "",
    modeReglementPardefault:"",
    validationStockBonAchat:"non"
  }

  erreurParametres = {
    nombreChiffresApresVerguleNormale: "",
    nombreChiffresApresVerguleQuantite: "",
    prixTimbreFiscale: "",
    tauxFodec: "",
    coefficientRetenueImpot: "",
  }

  variableGlobal = {
    exerciceSelectionner: 0,
  }

  exercices = []

  constructor(private notificationToast: ToastNotificationService,
    private http: HttpClient,
    private router: Router,
    public informationGenerale: InformationsService,
    private fonctionPartagesService: FonctionPartagesService) {
    this.getConfiguration()
  }

  ngOnInit(): void {
    this.variableGlobal.exerciceSelectionner = this.informationGenerale.exerciceCurrent
    this.getAllParametres()
  }

  isLoading = false

  ajoutFrais() {
    for (let key in this.parametres) {
      this.request[key] = this.parametres[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent

    if (this.isLoading) {
      return
    }
    this.informationGenerale.setExerciceCurrent(this.variableGlobal.exerciceSelectionner, this.parametres.clientPardefault,this.parametres.modeReglementPardefault, this.parametres.validationStockBonAchat)
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre Configuration est bien enregistrée !")
          this.fonctionPartagesService.setParametres(this.request)
        }
      }, err => {
        console.log(err)
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  getConfiguration() {
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGet + this.informationGenerale.idSocieteCurrent).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res

        if (resultat.status) {
          this.parametres = resultat.resultat
          this.exercices = resultat.exercices
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  enregistreVariableGlobal() {
    this.informationGenerale.setExerciceCurrent(this.variableGlobal.exerciceSelectionner, this.parametres.clientPardefault,this.parametres.modeReglementPardefault,this.parametres.validationStockBonAchat)
    this.notificationToast.showSuccess("Votre Configuration est bien enregistrée !")
  }

  //get all Clients
  allClients = []
  allModeReglements = []
  apiList = "/clients/getAllParametres/"
  getAllParametres() {
    this.http.get(this.informationGenerale.baseUrl + this.apiList + this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.allClients = resultat.clients
            this.allModeReglements = resultat.modereglements
          }
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
  //autocomplete client
  keySelectedClient = "raisonSociale"
  objetClient = {
    code: "Code",
    raisonSociale: "Raison-Sociale",
    matriculeFiscale: "Matricule-Fiscale",
    email: "Email",
  }
  setClientID(id) {
    this.parametres.clientPardefault = id
  }

  //open modal ajout Client
  isOpenModalAjoutClient = false
  idAjoutClientModal = ""
  typeElement
  closeModalAjoutClient() {
    this.isOpenModalAjoutClient = false
    this.getAllParametres()
  }
  openModalAjoutClient() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterClient
    this.isOpenModalAjoutClient = true
  }
  openModalAjoutModeReglement() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModeReglement
    this.isOpenModalAjoutClient = true
  }

  //autocomplete ModeReglement
  keySelectedModeReglement = "libelle"
  objetModeReglement = {
    libelle: "Libelle",
    ordre: "Ordre",
    valeurRetiree: "Valeur Retiree",
    tierNecessaire: "Tier Necessaire",
  }
  setModeReglementID(id) {
    this.parametres.modeReglementPardefault = id
  }

  clickIsValid2(){
    if(this.parametres.validationStockBonAchat == "oui"){
      this.parametres.validationStockBonAchat = "non"
    }else{
      this.parametres.validationStockBonAchat = "oui"
    }
  }


}
