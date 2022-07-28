import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { ConditionReglementService } from 'src/app/services/serviceBD_Commerce/condition-reglement.service';
import { ConditionReglement } from 'src/app/model/modelCommerce/condition-reglement';

@Component({
  selector: 'app-condition-reglement',
  templateUrl: './condition-reglement.component.html',
  styleUrls: ['./condition-reglement.component.scss']
})
export class ConditionReglementComponent implements OnInit {

  formC: FormGroup
  conditionReglement: ConditionReglement =
    {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
  objectKeys = Object.keys;

  items = {
    libelle: "active"
  };

  itemsVariable = {
    libelle: "active"
  };

  request = {
    search: {
      libelle: ""
    },
    orderBy: {
      libelle: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  oldRequest = {
    search: {
      libelle: ""
    },
    orderBy: {
      libelle: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  erreurConditionReglement = {
    libelle: "",
  }

  constructor(private fb: FormBuilder,
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fnctModel: FnctModelService,
    private fctList: FctListService,
    private categSe: ConditionReglementService) {
    this.formC = this.fb.group({
      libelle: [''],
      limit: 10
    })
    this.getConditionReglements()
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  //getAll Operation Preventifs
  isLoading = false
  conditionReglements = []
  getConditionReglements(): void {
    if (this.isLoading) {
      return
    }
    for (let key in this.request.search) {
      this.request.search[key] = this.formC.value[key]
    }
    this.request.limit = this.formC.value.limit
    if (!this.testSyncronisation(this.request, this.oldRequest)) {
      this.request.page = 1
    }
    this.isLoading = true
    this.categSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.conditionReglements = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getConditionReglements()
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getConditionReglements()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }
  var = 'jours'
  construireLibelle(ch) {
    this.var = ch
  }
  controleInputs() {
    for (let key in this.erreurConditionReglement) {
      this.erreurConditionReglement[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true

    for (let key in this.erreurConditionReglement) {
      if (this.conditionReglement[key] == " jours") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurConditionReglement[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if (this.conditionReglement.libelle != "") {
      if (this.allConditionReglements.filter(x => x.libelle == this.conditionReglement.libelle).length > 0) {
        this.erreurConditionReglement.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if (document.getElementById('libelle') != null) {
          document.getElementById('libelle').classList.add("border-erreur")
        }
      }
    }

    return isValid
  }
  //Save ConditionReglement
  enregistrerConditionReglement() {
    this.conditionReglement.libelle += " " + this.var
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.categSe.create(this.conditionReglement, this.request)
      .subscribe(
        res => {
          this.getAllParametres()
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getConditionReglements()
            this.notificationToast.showSuccess("Votre conditionReglement est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //modifier ConditionReglement
  id = ""
  modifierConditionReglement() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.conditionReglement.libelle = this.conditionReglement.libelle + ' ' + this.conditionReglement2
    this.categSe.update(this.id, this.conditionReglement, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getConditionReglements()
            this.notificationToast.showSuccess("Votre conditionReglement est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //pour delete un champs avec POP-Up
  isOpenModalDelete = false
  idDeleteModal = ""
  params1Delete = ""
  params2Delete = ""
  openModalDelete(id, params2) {
    this.idDeleteModal = id
    this.isOpenModalDelete = true
    this.params1Delete = "La conditionReglement"
    this.params2Delete = params2
  }
  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.categSe.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getConditionReglements()
            this.getAllParametres()
            this.closeModalDelete()
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //pour fermer POP-Up du supprission
  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  //Get parametre of Operation Preventif
  tabLibelle = []
  allConditionReglements = []
  getAllParametres() {
    this.categSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allConditionReglements = resultat.conditionReglements
            console.log(this.allConditionReglements)
            for (let item of this.allConditionReglements) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //pour ouvrir un POP-Up
  open(content) {
    this.conditionReglement = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  conditionReglement2 = ''
  tab = ['jours', 'mois', 'annee']
  openModifier(content, contact) {
    let libelle = contact.libelle.split(' ')
    this.conditionReglement.id = contact.id
    this.conditionReglement.libelle = libelle[0]
    this.conditionReglement2 = libelle[1]
    this.tab = this.tab.filter(item => item !== this.conditionReglement2)
    this.fnctModel.openModifier(content, contact)
  }

  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(conditionReglements) {
    return this.fctList.getDataToHtml(this.conditionReglements)
  }

  //pour rendre chaine to HTML
  stringToHtml(str) {
    return this.fctList.stringToHtml(str)
  }

  //pour faire attendre 
  wait(ms) {
    this.fctList.wait(ms)
  }

  //pour generer un PDF 
  generatePDF() {
    return this.fctList.generatePDF()
  }

  //pour exporter sous format excel 
  exportexcel() {
    return this.fctList.exportexcel()
  }

  //pour verifier la validité de 2 requests 
  testSyncronisation(request1, request2) {
    return this.fctList.testSyncronisation(request1, request2)
  }

  //pour changer croissante des variables
  activationCroissante(buttons1, buttons2) {
    this.fctList.activationCroissante(buttons1, buttons2)
  }

  //pour fermer un POP-Up
  JoinAndClose() {
    this.fnctModel.JoinAndClose()
  }

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getConditionReglements()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getConditionReglements()
  }

  changeCroissante(key) {
    var classStyle = key + "-croissante";
    var buttons = document.getElementsByClassName(classStyle);
    if (this.request.orderBy[key] == 1) {
      this.request.orderBy[key] = -1
      this.activationCroissante(buttons[0], buttons[1])
    } else {
      this.request.orderBy[key] = 1
      this.activationCroissante(buttons[1], buttons[0])
    }

    for (let varkey in this.request.orderBy) {
      if (key != varkey) {
        this.request.orderBy[varkey] = 0
      }
    }
    this.getConditionReglements()
  }
}
