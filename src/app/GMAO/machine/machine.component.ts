import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { MachineService } from 'src/app/services/serviceBD_GMAO/machine.service';
import { Machine } from 'src/app/model/modelGMAO/machine.model';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  formC: FormGroup
  machine: Machine;
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

  erreurMachine = {
    libelle: "",
  }

  constructor(private fb: FormBuilder,
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fnctModel: FnctModelService,
    private fctList: FctListService,
    private categSe: MachineService) {
    this.formC = this.fb.group({
      libelle: [''],
      limit: 10
    })
    this.getMachines()
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  //getAll Operation Preventifs
  isLoading = false
  machines = []
  getMachines(): void {
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
            this.machines = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getMachines()
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getMachines()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //Save Machine
  enregistrerMachine() {
    if (!this.fnctModel.controleInputs(this.erreurMachine, this.machine,this.tabLibelle, 'libelle')) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.categSe.create(this.machine,this.request)
      .subscribe(
        res => {
          this.getAllParametres()
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getMachines()
            this.notificationToast.showSuccess("Votre machine est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //modifier Machine
  id = ""
  modifierMachine() {
    if (!this.fnctModel.controleInputsModifer(this.erreurMachine, this.machine,this.tabLibelle)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.categSe.update(this.id, this.machine,this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getMachines()
            this.notificationToast.showSuccess("Votre machine est bien modifiée !")
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
    this.params1Delete = "La machine"
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
            this.getMachines()
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
  allMachines = []
  getAllParametres() {
    this.categSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allMachines = resultat.machines
            for (let item of this.allMachines) {
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
  getDataToHtml(machines) {
    return this.fctList.getDataToHtml(this.machines)
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

  //pour ouvrir un POP-Up
  open(content) {
    this.machine = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent, 
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  openModifier(content, contact) {
    this.machine = contact
    this.fnctModel.openModifier(content, contact)
  }

  //pour fermer un POP-Up
  JoinAndClose() {
    this.fnctModel.JoinAndClose()
  }

  totalPage = 1
  setLimitPage(newLimitPage: number) {
    this.request.limit = newLimitPage
    this.request.page = 1
    this.getMachines()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getMachines()
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
    this.getMachines()
  }
}
