import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { PeriodiciteService } from 'src/app/services/serviceBD_GMAO/periodicite.service';
import { Periodicite } from 'src/app/model/modelGMAO/periodicite.model';

@Component({
  selector: 'app-periodicite',
  templateUrl: './periodicite.component.html',
  styleUrls: ['./periodicite.component.scss']
})
export class PeriodiciteComponent implements OnInit {

  formC: FormGroup
  periodicite: Periodicite =
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

  erreurPeriodicite = {
    libelle: "",
  }

  constructor(private fb: FormBuilder,
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fnctModel: FnctModelService,
    private fctList: FctListService,
    private categSe: PeriodiciteService) {
    this.formC = this.fb.group({
      libelle: [''],
      limit: 10
    })
    this.getPeriodicites()
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  //getAll Operation Preventifs
  isLoading = false
  periodicites = []
  getPeriodicites(): void {
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
            this.periodicites = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getPeriodicites()
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getPeriodicites()
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
    for (let key in this.erreurPeriodicite) {
      this.erreurPeriodicite[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true

    for (let key in this.erreurPeriodicite) {
      if (this.periodicite[key] == " jours") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurPeriodicite[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if (this.periodicite.libelle != "") {
      if (this.allPeriodicites.filter(x => x.libelle == this.periodicite.libelle).length > 0) {
        this.erreurPeriodicite.libelle = "Cette libelle est déjà utilisée !!"
        isValid = false
        if (document.getElementById('libelle') != null) {
          document.getElementById('libelle').classList.add("border-erreur")
        }
      }
    }

    return isValid
  }
  //Save Periodicite
  enregistrerPeriodicite() {
    this.periodicite.libelle += " " + this.var
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.categSe.create(this.periodicite, this.request)
      .subscribe(
        res => {
          this.getAllParametres()
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getPeriodicites()
            this.notificationToast.showSuccess("Votre periodicite est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //modifier Periodicite
  id = ""
  modifierPeriodicite() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.periodicite.libelle = this.periodicite.libelle + ' ' + this.periodicite2
    this.categSe.update(this.id, this.periodicite, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getPeriodicites()
            this.notificationToast.showSuccess("Votre periodicite est bien modifiée !")
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
    this.params1Delete = "La periodicite"
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
            this.getPeriodicites()
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
  allPeriodicites = []
  getAllParametres() {
    this.categSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allPeriodicites = resultat.periodicites
            for (let item of this.allPeriodicites) {
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
    this.periodicite = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  periodicite2 = ''
  tab = ['jours', 'mois', 'annee']
  openModifier(content, contact) {
    let libelle = contact.libelle.split(' ')
    this.periodicite.id = contact.id
    this.periodicite.libelle = libelle[0]
    this.periodicite2 = libelle[1]
    this.tab = this.tab.filter(item => item !== this.periodicite2)
    this.fnctModel.openModifier(content, contact)
  }

  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(periodicites) {
    return this.fctList.getDataToHtml(this.periodicites)
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
    this.getPeriodicites()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getPeriodicites()
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
    this.getPeriodicites()
  }
}
