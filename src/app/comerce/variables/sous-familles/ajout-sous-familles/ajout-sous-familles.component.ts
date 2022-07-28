import { SousFamilleService } from './../../../../services/serviceBD_Commerce/sousFamille.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Output, EventEmitter } from '@angular/core';
import { SousFamille } from 'src/app/model/modelCommerce/sousFamille';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-sous-familles',
  templateUrl: './ajout-sous-familles.component.html',
  styleUrls: ['./ajout-sous-familles.component.scss']
})
export class AjoutSousFamillesComponent implements OnInit {
  sousFamilleFormGroup: FormGroup;

  objectKeys = Object.keys;

  request = {
    libelle: "",
    societe: "",
    famille: ""
  }

  sousFamille = new SousFamille()

  erreurSousFamille = {
    libelle: "",
  }

  @Output() closeModalAjoutSousFamille = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() idFamille = ""

  @Input() idCategorie = ""

  componentName = "sousFamille"

  closeAjoutSousFamille() {
    this.closeModalAjoutSousFamille.emit();
  }

  @Input() isOpenModalAjoutSousFamille = false

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalAjoutSousFamille == true) {
      for (let key in this.erreurSousFamille) {
        this.erreurSousFamille[key] = ""

        if (document.getElementById(key + this.componentName) != null) {
          document.getElementById(key + this.componentName).classList.remove("border-erreur")
        }
      }

      for (let key in this.sousFamille) {
        this.sousFamille[key] = ""
      }

    }
  }

  constructor(
    private sousFamilleSer : SousFamilleService,
    private fnctModel: FnctModelService,
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService) { }

  ngOnInit(): void {
    this.getAllParametres()
  }

  isLoading = false
  ajoutSousFamille() {
    if (!this.fnctModel.controleInputs(this.erreurSousFamille, this.sousFamille, this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 

    for (let key in this.sousFamille) {
      this.request[key] = this.sousFamille[key]
    }

    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.famille = this.idFamille

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.sousFamilleSer.create(this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre Sous Famille est bien enregistrée !")
          this.closeAjoutSousFamille()
          this.getAllParametres()
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  reseteFormulaire() {
    for (let key in this.erreurSousFamille) {
      this.sousFamille[key] = ""
    }
  }

  //Get parametre of sousFamille
  tabLibelle = []
  allSousFamilles = []
  getAllParametres() {
    this.sousFamilleSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allSousFamilles = resultat.sousFamilles
            for (let item of this.allSousFamilles) {
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
