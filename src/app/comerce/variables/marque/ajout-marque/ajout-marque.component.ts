import { MarqueService } from './../../../../services/serviceBD_Commerce/marque.service';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Marque } from 'src/app/model/modelCommerce/marque';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-marque',
  templateUrl: './ajout-marque.component.html',
  styleUrls: ['./ajout-marque.component.scss']
})
export class AjoutMarqueComponent implements OnInit {
  marqueFormGroup: FormGroup;

  objectKeys = Object.keys;

  request = new Marque()

  marque = new Marque()

  erreurMarque = {
    libelle: "",
  }

  titre = "marque"

  @Output() closeModalAjoutMarque = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutMarque = false

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalAjoutMarque == true) {
      for (let key in this.erreurMarque) {
        this.erreurMarque[key] = ""
        if (document.getElementById(this.titre + key) != null) {
          document.getElementById(this.titre + key).classList.remove("border-erreur")
        }
      }

      for (let key in this.marque) {
        this.marque[key] = ""
      }
    }
  }


  closeAjoutMarque() {
    this.closeModalAjoutMarque.emit();
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private fnctModel: FnctModelService,
    private marqueSer: MarqueService,
    public informationGenerale: InformationsService) {
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  isLoading = false
  ajoutMarque() {
    if (!this.fnctModel.controleInputs(this.erreurMarque, this.marque, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.marque) {
      this.request[key] = this.marque[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.marqueSer.create(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre marque est bien enregistrée !")
            this.closeAjoutMarque()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //Get parametre of Marque
  tabLibelle = []
  allMarques = []
  getAllParametres() {
    this.marqueSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allMarques = resultat.marques
            console.log("this.allMarques", this.allMarques)
            for (let item of this.allMarques) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

}
