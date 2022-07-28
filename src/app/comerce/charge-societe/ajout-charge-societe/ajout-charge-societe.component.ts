import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Router } from '@angular/router';
import { ChargeSociete } from 'src/app/model/modelCommerce/chargeSociete';
import { ChargeSocieteService } from 'src/app/services/serviceBD_Commerce/ChargeSociete.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-charge-societe',
  templateUrl: './ajout-charge-societe.component.html',
  styleUrls: ['./ajout-charge-societe.component.scss']
})
export class AjoutChargeSocieteComponent implements OnInit {

  chargeSocieteFormGroup: FormGroup;

  objectKeys = Object.keys;

  request = new ChargeSociete()

  chargeSociete = new ChargeSociete()

  erreurChargeSociete = {
    date: "",
    montant: "",
    modeReglement: "",
    motif: "",
    proprietaire: "",
  }

  constructor(
    private fnctModel: FnctModelService,
    private chargeSocieteSer: ChargeSocieteService,
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService) {
    this.getAllParametres()
  }

  modeReglements = []
  getAllParametres() {
    this.chargeSocieteSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            console.log(resultat)
            this.modeReglements = resultat.modeReglements
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }


  ngOnInit(): void {
    let sessionCaise = this.informationGenerale.getSessionCaisse()
    this.request.sessionCaisse = sessionCaise[0].id
  }

  isLoading = false
  ajoutChargeSociete() {
    if (!this.fnctModel.controleInput(this.erreurChargeSociete, this.chargeSociete)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.chargeSociete) {
      this.request[key] = this.chargeSociete[key]
    }
    if (this.isLoading) {
      return
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.isLoading = true
    this.chargeSocieteSer.create(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log(resultat)
            this.router.navigate(['/chargeSociete/list']);
            this.notificationToast.showSuccess("Votre charge societe est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  reseteFormulaire() {
    for (let key in this.erreurChargeSociete) {
      this.chargeSociete[key] = ""
    }
  }

  //autocomplete mode Reglement 
  keySelectedModeReglement = "libelle"

  objetModeReglement = {
    libelle: "active",
  }

  setModeReglementID(id) {
    this.chargeSociete.modeReglement = id
  }

  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }

  openModalAjoutModeReglement() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterModeReglement
    this.isOpenModalAjoutElement = true
  }
}
