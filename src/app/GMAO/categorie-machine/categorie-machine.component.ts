import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { CategorieMachine } from 'src/app/model/modelGMAO/categorieMachine.model';
import { CategorieMachineService } from 'src/app/services/serviceBD_GMAO/categorie-machine.service';

@Component({
  selector: 'app-categorie-machine',
  templateUrl: './categorie-machine.component.html',
  styleUrls: ['./categorie-machine.component.scss']
})
export class CategorieMachineComponent implements OnInit {

  formC: FormGroup
  categorieMachine: CategorieMachine;
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

  erreurCategorieMachine = {
    libelle: "",
  }

  constructor(
    private fb: FormBuilder,
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fnctModel: FnctModelService,
    private fctList: FctListService,
    private categSe: CategorieMachineService) {
    this.formC = this.fb.group({
      libelle: [''],
      limit: 10
    })
    this.getCategorieMachines()
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  //getAll Categorie Machines
  isLoading = false
  categorieMachines = []
  getCategorieMachines(): void {
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
            this.categorieMachines = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getCategorieMachines()
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getCategorieMachines()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //Save Categorie Machine
  enregistrerCategorieMachine() {
    if (!this.fnctModel.controleInputs(this.erreurCategorieMachine, this.categorieMachine,this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.categSe.create(this.categorieMachine, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getCategorieMachines()
            this.notificationToast.showSuccess("Votre Categorie machine est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //modifier Categorie Machine
  id = ""
  modifierCategorieMachine() {
    if (!this.fnctModel.controleInputsModifer(this.erreurCategorieMachine, this.categorieMachine,this.tabLibelle)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.categSe.update(this.id, this.categorieMachine, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getCategorieMachines()
            this.notificationToast.showSuccess("Votre categorie machine est bien modifiée !")
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
    this.params1Delete = "La categorie machine"
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
            this.getCategorieMachines()
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

  //Get parametre of Categorie Machine
  tabLibelle = []
  allCategorieMachines = []
  getAllParametres() {
    this.categSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allCategorieMachines = resultat.categorieMachines
            for (let item of this.allCategorieMachines) {
              this.tabLibelle.push(item.libelle)
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(categorieMachines) {
    return this.fctList.getDataToHtml(this.categorieMachines)
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

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getCategorieMachines()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getCategorieMachines()
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
    this.getCategorieMachines()
  }

  //pour ouvrir un POP-Up
  open(content) {
    this.categorieMachine = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  openModifier(content, contact) {
    this.categorieMachine = contact
    this.fnctModel.openModifier(content, contact)
  }

  //pour fermer un POP-Up
  JoinAndClose() {
    this.fnctModel.JoinAndClose()
  }
}
