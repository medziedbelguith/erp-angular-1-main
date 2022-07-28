import { TypeCompte } from './../../../model/modelCommerce/typeCompte';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { TypeCompteService } from 'src/app/services/serviceBD_Commerce/typeCompte.service';

@Component({
  selector: 'app-ajout-type-compte',
  templateUrl: './ajout-type-compte.component.html',
  styleUrls: ['./ajout-type-compte.component.scss']
})
export class AjoutTypeCompteComponent implements OnInit {

  TypeCompteFormGroup: FormGroup;
  lienAjoute = "/typeComptes/newTypeCompte"

  objectKeys = Object.keys;

  request = new TypeCompte()

  typeCompte = new TypeCompte()

  erreurTypeCompte = {
    libelle: "",
  }

  titre = "TypeCompte"

  @Output() closeModalAjoutTypeCompte = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutTypeCompte = false

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalAjoutTypeCompte == true) {
      for (let key in this.erreurTypeCompte) {
        this.erreurTypeCompte[key] = ""

        if (document.getElementById(this.titre + key) != null) {
          document.getElementById(this.titre + key).classList.remove("border-erreur")
        }
      }

      for (let key in this.typeCompte) {
        this.typeCompte[key] = ""
      }
    }
  }


  closeAjoutTypeCompte() {
    this.closeModalAjoutTypeCompte.emit();
  }

  constructor(
    private typeCompteSer: TypeCompteService,
    private notificationToast: ToastNotificationService,
    private fnctModel: FnctModelService,
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getAllParametres()
  }

  isLoading = false

  ajoutTypeCompte() {
    if (!this.fnctModel.controleInputs(this.erreurTypeCompte, this.typeCompte, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.typeCompte) {
      this.request[key] = this.typeCompte[key]
    }
    if (this.isLoading) {
      return
    }

    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.isLoading = true
    this.typeCompteSer.create(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.closeAjoutTypeCompte()
            this.notificationToast.showSuccess("Votre typeCompte est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //Get parametre of TypeCompte
  tabLibelle = []
  allTypeComptes = []
  getAllParametres() {
    this.typeCompteSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allTypeComptes = resultat.typeComptes
            for (let item of this.allTypeComptes) {
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
    for (let key in this.erreurTypeCompte) {
      this.typeCompte[key] = ""
    }
  }

}
