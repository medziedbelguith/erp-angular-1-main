import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/services/informations.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FctListService } from 'src/app/services/fonctionList/fct-list.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { FraisMission } from 'src/app/model/modelGMAO/fraisMission.model';
import { FraisMissionService } from 'src/app/services/serviceBD_GMAO/frais-mission.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-frais-mission',
  templateUrl: './frais-mission.component.html',
  styleUrls: ['./frais-mission.component.scss']
})
export class FraisMissionComponent implements OnInit {

  formC: FormGroup
  fraisMission: FraisMission;
  objectKeys = Object.keys;

  items = {
    montant: "active",
    typeFrais: "active",
    mission: "active",
  };

  itemsVariable = {
    montant: "active",
    typeFrais: "active",
    mission: "active",
  };

  request = {
    search: {
      montant: "",
      typeFrais: "",
      mission: "",
    },
    orderBy: {
      typeFrais: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  oldRequest = {
    search: {
      montant: "",
      typeFrais: "",
      mission: "",
    },
    orderBy: {
      typeFrais: 0
    },
    societeRacine: this.informationGenerale.idSocieteCurrent,
    limit: 10,
    page: 1,
  }

  erreurFraisMission = {
    montant: 0,
    typeFrais: "",
    mission: "",
  }

  constructor(private fb: FormBuilder,
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fnctModel: FnctModelService,
    private fctList: FctListService,
    private fraisMSe: FraisMissionService,
    public fonctionPartagesService: FonctionPartagesService,
  ) {
    this.formC = this.fb.group({
      typeFrais: [''],
      montant: [''],
      mission: [''],
      limit: 10
    })
    this.getFraisMissions()
    this.getAllParametres()
  }

  ngOnInit(): void {
  }

  //getAll Frais Mission
  isLoading = false
  fraisMissions = []
  getFraisMissions(): void {
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
    this.fraisMSe.getAll(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            console.log(resultat)
            this.fraisMissions = resultat.resultat.docs
            this.totalPage = resultat.resultat.pages
            this.oldRequest = resultat.request
            if (this.totalPage < this.request.page && this.request.page != 1) {
              this.request.page = this.totalPage
              this.getFraisMissions()
            }
            if (!this.testSyncronisation(this.request, resultat.request) || (this.request.page != resultat.request.page)) {
              this.getFraisMissions()
            }
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //Save Frais Mission
  enregistrerFraisMission() {
    if (!this.fnctModel.controleInput(this.erreurFraisMission, this.fraisMission)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.fraisMSe.create(this.fraisMission, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getFraisMissions()
            this.notificationToast.showSuccess("Votre FraisMission est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //modifier Frais Mission
  id = ""
  modifierFraisMission() {
    if (!this.fnctModel.controleInput(this.erreurFraisMission, this.fraisMission)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.fraisMSe.update(this.id, this.fraisMission, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.getFraisMissions()
            this.notificationToast.showSuccess("Votre FraisMission est bien modifiée !")
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
    this.params1Delete = "La FraisMission"
    this.params2Delete = params2
  }
  deleteItem() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.fraisMSe.delete(this.idDeleteModal)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getFraisMissions()
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

  //Get parametre of Frais Mission
  allMissions = []
  allTypeFrais = []
  getAllParametres() {
    this.fraisMSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allMissions = resultat.missions
            this.allTypeFrais = resultat.typefraiss
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //autocomplete TypeFrais
  keySelectedTypeFrais = "libelle"
  objetTypeFrais = { libelle: "active" }
  setTypeFraisID(id) {
    this.fraisMission.typeFrais = id
  }
  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutTypeFrais() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterTypeFrais
    this.isOpenModalAjoutElement = true
    this.getAllParametres()
  }

  //autocomplete Mission
  keySelectedMission = "libelle"
  objetMission = { libelle: "active" }
  setMissionID(id) {
    this.fraisMission.mission = id
  }
  //open modal ajout Element
  openModalAjoutMission() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterMission
    this.isOpenModalAjoutElement = true
    this.getAllParametres()
  }
  
  closeModalAjoutElement() {
    this.getAllParametres()
    this.isOpenModalAjoutElement = false
  }
  //for the input number to get the number after comma
  tabNumbers = ["montant"]
  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 10)
  }
  fixedVerguleNumbers() {
    for (let i = 0; i < this.tabNumbers.length; i++) {
      this.fraisMission[this.tabNumbers[i]] = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.fraisMission[this.tabNumbers[i]]))
    }
  }
  //pour rendre chaine to HTML
  printout() {
    return this.fctList.printout()
  }

  //pour rendre chaine to HTML
  getDataToHtml(fraisMissions) {
    return this.fctList.getDataToHtml(this.fraisMissions)
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
    this.fraisMission = {
      id: "",
      typeFrais: "",
      mission: "",
      montant: 0,
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  //pour modifier un POP-Up
  openModifier(content, contact) {
    this.fraisMission = contact
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
    this.getFraisMissions()
  }

  setPage(newPage: number) {
    this.request.page = newPage
    this.getFraisMissions()
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
    this.getFraisMissions()
  }
}
