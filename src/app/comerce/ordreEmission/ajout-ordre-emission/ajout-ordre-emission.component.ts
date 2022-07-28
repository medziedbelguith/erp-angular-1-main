import { OrdreMissionService } from './../../../services/serviceBD_Commerce/ordre-mission.service';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { OrdreMission } from 'src/app/model/modelCommerce/odreMission';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-ajout-ordre-emission',
  templateUrl: './ajout-ordre-emission.component.html',
  styleUrls: ['./ajout-ordre-emission.component.scss']
})
export class AjoutOrdreEmissionComponent implements OnInit {
  ordreEmissionFormGroup: FormGroup;

  objectKeys = Object.keys;

  ordreEmissions = []

  request = new OrdreMission()

  ordreEmission = new OrdreMission()

  erreurOrdreEmission = {
    budget: "",
    trajet: "",
    camion: "",
    chauffeur: "",
    bonLivraison: "",
  }

  @Output() closeModalAjoutOrdreEmission = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutOrdreEmission = false

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalAjoutOrdreEmission == true) {
      for (let key in this.erreurOrdreEmission) {
        this.erreurOrdreEmission[key] = ""
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.ordreEmission) {
        this.ordreEmission[key] = ""
      }

      this.getAllParametres()
    }
  }

  closeAjoutOrdreEmission() {
    this.closeModalAjoutOrdreEmission.emit();
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private fnctModel:FnctModelService,
    public informationGenerale: InformationsService,
    private ordreMisSer :  OrdreMissionService,
    public fonctionPartagesService: FonctionPartagesService, ) { }

  ngOnInit(): void {

  }

  isLoading = false
  ajoutOrdreEmission() {
    if (!this.fnctModel.controleInput(this.erreurOrdreEmission, this.ordreEmission)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.ordreEmission) {
      this.request[key] = this.ordreEmission[key]
    }

    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.exercice = this.informationGenerale.exerciceCurrent + ""

    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.ordreMisSer.create(this.ordreEmission, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.closeAjoutOrdreEmission()
          this.notificationToast.showSuccess("Votre ordre mission est bien enregistrée !")
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  reseteFormulaire() {
    for (let key in this.erreurOrdreEmission) {
      this.ordreEmission[key] = ""
    }
  }

  allChauffeurs = []
  getAllParametres() {
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
      exercice: this.informationGenerale.exerciceCurrent
    }
    this.ordreMisSer.parametre(request)
    .subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.bonLivraisons = resultat.bonLivraisons
          this.ordreEmission.numero = resultat.numeroAutomatique
          this.allChauffeurs = resultat.chauffeurs
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  bonLivraisons = []
  //autocomplete bonLivraison
  keySelectedBonLivraison = "numero"
  objetBonLivraison = {
    numero: "numero",
    date: "Date",
    client: "client",
    totalRemise: "Total Remise",
    totalHT: "Total HT",
    totalTVA: "Total TVA",
    tFiscale: "Timbre Fiscale",
    totalTTC: "Total TTC",
    totalGain: "Total Gain",
    montantPaye: "Montant Paye",
  }

  setBonLivraisonID(id) {
    this.ordreEmission.bonLivraison = id
  }

  //autocomplete Chauffeur
  keySelectedChauffeur = "nom"
  objetChauffeur = {
    nom: "Nom",
    prenom: "Prenom",
    role: "Role",
    email: "Email",
    telephone: "Téléphone",
    adresse: "Adresse",
  }

  setChauffeur(id) {
    this.ordreEmission.chauffeur = id
  }
  //Pour ajouter chauffeur de cette fénetre 
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement(){
     this.isOpenModalAjoutElement = false
     this.getAllParametres()
  }
  openModalAjoutChauffeur(){
    console.log(this.fonctionPartagesService.titreOfModal.ajoutChauffeur)
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajoutChauffeur
    this.isOpenModalAjoutElement = true
 }  
}
