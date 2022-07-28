import { ModeLivraisonService } from './../../../../services/serviceBD_Commerce/modeLivraison.service';
import { ModeLivraison } from './../../../../model/modelCommerce/modeLivraison';
import { Router } from '@angular/router';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

import { Output, EventEmitter } from '@angular/core';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
@Component({
  selector: 'app-ajout-mode-livraison',
  templateUrl: './ajout-mode-livraison.component.html',
  styleUrls: ['./ajout-mode-livraison.component.scss']
})
export class AjoutModeLivraisonComponent implements OnInit {
  modeLivraisonFormGroup: FormGroup;

  objectKeys = Object.keys;

  @Output() closeModalAjoutModeLivraison = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutModeLivraison = false

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalAjoutModeLivraison == true) {
      for (let key in this.erreurModeLivraison) {
        this.erreurModeLivraison[key] = ""

        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.modeLivraison) {
        this.modeLivraison[key] = ""
      }
    }
  }

  closeAjoutModeLivraison() {
    this.closeModalAjoutModeLivraison.emit();
  }

  request = new ModeLivraison()

  modeLivraison = new ModeLivraison()

  erreurModeLivraison = {
    libelle: "",
  }
  constructor(
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fnctModel: FnctModelService,
    private modeLivSer: ModeLivraisonService,) {
     }

  ngOnInit(): void {
    this.getAllParametres()
  }

  isLoading = false

  ajoutModeLivraison() {
    if (!this.fnctModel.controleInputs(this.erreurModeLivraison, this.modeLivraison, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.modeLivraison) {
      this.request[key] = this.modeLivraison[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.modeLivSer.create(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre mode livraison est bien enregistrée !")
            this.closeAjoutModeLivraison()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //Get parametre of ModeLivraison
  tabLibelle = []
  allModeLivraisons = []
  getAllParametres() {
    this.modeLivSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allModeLivraisons = resultat.modeLivraisons
            for (let item of this.allModeLivraisons) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  reseteFormulaire() {
    for (let key in this.erreurModeLivraison) {
      this.modeLivraison[key] = ""
    }
  }
}
