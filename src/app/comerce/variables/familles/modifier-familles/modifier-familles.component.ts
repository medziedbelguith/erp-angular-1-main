import { Famille } from './../../../../model/modelCommerce/famille';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FamilleService } from 'src/app/services/serviceBD_Commerce/famille.service';
import { SousFamilleService } from 'src/app/services/serviceBD_Commerce/sousFamille.service';

@Component({
  selector: 'app-modifier-familles',
  templateUrl: './modifier-familles.component.html',
  styleUrls: ['./modifier-familles.component.scss']
})
export class ModifierFamillesComponent implements OnInit {
  familleFormGroup: FormGroup;

  objectKeys = Object.keys;

  @Output() closeModalModifierFamille = new EventEmitter<string>();

  @Input() id = ""

  @Input() isOpenModalModifierFamille = false

  closeModifierFamille() {
    this.closeModalModifierFamille.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalModifierFamille == true) {

      for (let key in this.erreurFamille) {
        this.erreurFamille[key] = ""

        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.famille) {
        this.famille[key] = ""
      }

      if (this.id.length > 1) {
        this.getFamille(this.id)
      }
    }
  }

  request = {
    libelle: "",
    sousFamilles: []
  }

  famille = new Famille()

  erreurFamille = {
    libelle: ""
  }

  constructor(
    private sousFamilleSer: SousFamilleService,
    private familleSer: FamilleService,
    private fonctionPartagesService: FonctionPartagesService,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute,
    private notificationToast: ToastNotificationService) {


  }

  getFamille(id) {

    this.sousfamillesSelected = []

    this.isLoading = true
    this.familleSer.get(id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.famille) {
              this.famille[key] = this.request[key]
            }

            for (let i = 0; i < response.sousFamilles.length; i++) {
              this.sousfamillesSelected.push({ id: response.sousFamilles[i].sousFamille._id, libelle: response.sousFamilles[i].sousFamille.libelle })
            }

            this.getSousFamilles()

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
    for (let key in this.erreurFamille) {
      this.erreurFamille[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.famille) {
      if (this.famille[key] == "") {
        this.erreurFamille[key] = "Veuillez remplir ce champ"
        isValid = false
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }
    if (this.famille.libelle != "") {
      if (this.allFamillees.filter(x => x.libelle == this.famille.libelle && x.id != this.id).length > 0) {
        this.erreurFamille.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if (document.getElementById('libelle') != null) {
          document.getElementById('libelle').classList.add("border-erreur")
        }

      }
    }
    return isValid
  }

  isLoading = false

  modifierFamille() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.famille) {
      this.request[key] = this.famille[key]
    }

    var listId = []
    for (let i = 0; i < this.sousfamillesSelected.length; i++) {
      listId.push({ id: this.sousfamillesSelected[i].id })
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.request.sousFamilles = listId
    this.familleSer.update(this.id, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre famille est bien modifiée !")
            this.closeModifierFamille()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  reseteFormulaire() {
    for (let key in this.erreurFamille) {
      this.famille[key] = ""
    }
  }

  sousfamilles = []
  sousfamillesSelected = []
  allFamilles = []

  addSousFamille(item) {
    this.sousfamillesSelected.push(item)
    this.sousfamilles = this.sousfamilles.filter(x => x.id != item.id)
  }

  removeSousFamille(item) {
    this.sousfamillesSelected = this.sousfamillesSelected.filter(x => x.id != item.id)
  }

  addSousFamilleSelected(item) {
    this.sousfamilles.push(item)
  }

  removeSousFamilleSelected(item) {
    this.sousfamillesSelected = this.sousfamillesSelected.filter(x => x.id != item.id)
    this.sousfamilles.push(item)
  }

  checkAllSelect() {
    this.sousfamilles.push.apply(this.sousfamilles, this.sousfamillesSelected);
    this.sousfamillesSelected = []
  }
  checkAll() {
    this.sousfamillesSelected.push.apply(this.sousfamillesSelected, this.sousfamilles);
    this.sousfamilles = []
  }
  motRecherche = ""

  recherche() {
    if (this.motRecherche != "") {
      this.sousfamilles = this.allFamilles.filter(x => x.libelle.toUpperCase().indexOf(this.motRecherche.toUpperCase()) == 0)
    } else {
      this.sousfamilles = this.allFamilles
    }

    for (let i = 0; i < this.sousfamillesSelected.length; i++) {
      this.sousfamilles = this.sousfamilles.filter(x => x.id != this.sousfamillesSelected[i].id)
    }

  }

  isCheked(item) {
    if (this.sousfamillesSelected.filter(x => x.id == item.id).length == 1) {
      return true
    }
    return false
  }

  getSousFamilles() {

    if (this.isLoading) {
      return
    }

    let requestFamilles = {
      page: 1,
      limit: 100000,
      search: {},
      orderBy: {},
      societe: this.informationGenerale.idSocieteCurrent
    }
    this.isLoading = true
    this.sousFamilleSer.getAll(requestFamilles)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.sousfamilles = resultat.resultat.docs
            this.allFamilles = resultat.resultat.docs

            for (let i = 0; i < this.sousfamillesSelected.length; i++) {
              this.sousfamilles = this.sousfamilles.filter(x => x.id != this.sousfamillesSelected[i].id)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getSousFamilles()
  }

  openModalAjout() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterSousFamille
    this.isOpenModalAjoutElement = true
  }
  //Get parametre of Famille
  tabLibelle = []
  allFamillees = []
  getAllParametres() {
    this.familleSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allFamillees = resultat.familles
            for (let item of this.allFamillees) {
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
