import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SousFamille } from 'src/app/model/modelCommerce/sousFamille';
import { InformationsService } from 'src/app/services/informations.service';
import { SousFamilleService } from 'src/app/services/serviceBD_Commerce/sousFamille.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-sous-familles',
  templateUrl: './modifier-sous-familles.component.html',
  styleUrls: ['./modifier-sous-familles.component.scss']
})
export class ModifierSousFamillesComponent implements OnInit {
  sousFamilleFormGroup: FormGroup;

  @Output() closeModalModifierSousFamille = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierSousFamille = false

  closeModifierSousFamille() {
    this.closeModalModifierSousFamille.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalModifierSousFamille == true) {
      for (let key in this.erreurSousFamille) {
        this.erreurSousFamille[key] = ""

        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.sousFamille) {
        this.sousFamille[key] = ""
      }

      if (this.id.length > 1) {
        this.getSousFamille(this.id)
      }
    }
  }

  objectKeys = Object.keys;

  request = new SousFamille()

  sousFamille = new SousFamille()

  erreurSousFamille = {
    libelle: ""
  }
  constructor(
    private sousFamilleSer: SousFamilleService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private notificationToast: ToastNotificationService) {

  }

  getSousFamille(id) {
    this.isLoading = true
    this.sousFamilleSer.get(id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          console.log(res)
          if (response.status) {
            this.request = response.resultat
            for (let key in this.sousFamille) {
              this.sousFamille[key] = this.request[key]
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  ngOnInit(): void {
    this.getAllParametres()
  }

  controleInputs() {
    for (let key in this.erreurSousFamille) {
      this.erreurSousFamille[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.sousFamille) {
      if (this.sousFamille[key] == "") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }

        this.erreurSousFamille[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    if (this.sousFamille.libelle != "") {
      if (this.allSousFamilles.filter(x => x.libelle == this.sousFamille.libelle && x.id != this.id).length > 0) {
        this.erreurSousFamille.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if (document.getElementById('libelle') != null) {
          document.getElementById('libelle').classList.add("border-erreur")
        }

      }
    }
    return isValid
  }

  isLoading = false

  modifierSousFamille() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.sousFamille) {
      this.request[key] = this.sousFamille[key]
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true
    this.sousFamilleSer.update(this.id, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.closeModifierSousFamille()
            this.notificationToast.showSuccess("Votre sous Famille est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

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
  reseteFormulaire() {
    for (let key in this.erreurSousFamille) {
      this.sousFamille[key] = ""
    }
  }
}
