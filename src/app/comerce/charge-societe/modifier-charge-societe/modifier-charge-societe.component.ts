import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ChargeSociete } from 'src/app/model/modelCommerce/ChargeSociete';
import { ChargeSocieteService } from 'src/app/services/serviceBD_Commerce/ChargeSociete.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-modifier-charge-societe',
  templateUrl: './modifier-charge-societe.component.html',
  styleUrls: ['./modifier-charge-societe.component.scss']
})
export class ModifierChargeSocieteComponent implements OnInit {
  chargeSocieteFormGroup: FormGroup;

  id="";
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
    private fnctModel:FnctModelService,
    public informationGenerale: InformationsService,
    private chargeSocieteSer: ChargeSocieteService,
    private route: ActivatedRoute, 
    private router: Router, 
    private notificationToast:ToastNotificationService,
    public fonctionPartagesService:FonctionPartagesService) {

    this.getAllParametres()
  

  }

  modeReglements=[]
  getAllParametres() {
    this.chargeSocieteSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.modeReglements = resultat.statutOpportunites
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  getChargeSociete(id) {
    this.isLoading = true
    this.chargeSocieteSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.chargeSociete) {
            this.chargeSociete[key] = this.request[key]
          }
          this.chargeSociete.date = formatDate(new Date(this.chargeSociete.date), 'yyyy-MM-dd', 'en');
          
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getChargeSociete(this.id)
    }
    let sessionCaise = this.informationGenerale.getSessionCaisse()
    this.request.sessionCaisse = sessionCaise[0].id
  }

  isLoading = false
  modifierChargeSociete() {
    if (!this.fnctModel.controleInput(this.erreurChargeSociete, this.chargeSociete)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for(let key in this.chargeSociete){
      this.request[key] = this.chargeSociete[key]
    } 
    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.chargeSocieteSer.update(this.id, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.router.navigate(['/chargeSociete/list']);
          this.notificationToast.showSuccess("Votre charge Societe est bien modifiée !")
  
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
