import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { TachePreventifService } from 'src/app/services/serviceBD_GMAO/tache-preventif.service';
import { InformationsService } from 'src/app/services/informations.service';
import { TachePreventif } from 'src/app/model/modelGMAO/tachePreventif.model';
import { OperationPreventifService } from 'src/app/services/serviceBD_GMAO/operation-preventif.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { OperationPreventif } from 'src/app/model/modelGMAO/operationPreventif.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modifier-tache-preventif',
  templateUrl: './modifier-tache-preventif.component.html',
  styleUrls: ['./modifier-tache-preventif.component.scss']
})
export class ModifierTachePreventifComponent implements OnInit {
  tachePreventifFormGroup: FormGroup;

  id = "";
  objectKeys = Object.keys;

  request = {
    planPreventif: "",
    dateExecution: "",
    personnel: "",
    machine: "",
    etatTache:"",
    montant: "",
    notes: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
 }

  tachePreventif : TachePreventif = {
    planPreventif: "",
    dateExecution: "",
    personnel: [],
    machine: "",
    etatTache:"",
    montant: 0,
    notes: "",
  }

  erreurTachePreventif = {
    planPreventif: "",
    dateExecution: "",
    personnel: "",
    machine: "",
    etatTache:"",
    montant: 0,
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationToast: ToastNotificationService,
    public fonctionPartagesService: FonctionPartagesService,
    public informationGenerale: InformationsService,
    private tachePreventifSe: TachePreventifService,
    private fnctModel: FnctModelService,
    private opeSe: OperationPreventifService) {

    this.getAllParametres()
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  getTachePreventif(id) {
    this.isLoading = true
    this.tachePreventifSe.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.tachePreventif) {
              this.tachePreventif[key] = this.request[key]
            }
            this.tachePreventif.dateExecution = formatDate(new Date(this.tachePreventif.dateExecution), 'yyyy-MM-dd', 'en');
           }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length > 1) {
      this.getTachePreventif(this.id)
    }
  }

  controleInputs() {
    for (let key in this.erreurTachePreventif) {
      this.erreurTachePreventif[key] = ""
    }
    var isValid = true
    for (let key in this.erreurTachePreventif) {
      if (this.tachePreventif[key] == "") {
        this.erreurTachePreventif[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    return isValid
  }

  isLoading = false
  modifierTachePreventif() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.tachePreventif) {
      this.request[key] = this.tachePreventif[key]
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.tachePreventifSe.update(this.id, this.tachePreventif, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.router.navigate(['gmao/tachePreventif/list']);
            this.notificationToast.showSuccess("Votre tachePreventif est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  reseteFormulaire() {
    for (let key in this.erreurTachePreventif) {
      this.tachePreventif[key] = ""
    }
  }

  //Get parametre of TachePreventif
  allPlanPreventifs = []
  allMachines = []
  allPersonnels = []
  getAllParametres() {
    this.tachePreventifSe.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allPlanPreventifs = resultat.planPreventifs
            this.allMachines = resultat.machines
            this.allPersonnels = resultat.personnels
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //autocomplete PlanPreventif
  keySelectedPlanPreventif = "libelle"
  objetPlanPreventif = { libelle: "active" }
  setPlanPreventifID(id) {
    this.tachePreventif.planPreventif = id
  }

  //autocomplete Machine
  keySelectedMachine = "libelle"
  objetMachine = { libelle: "active" }
  setMachineID(id) {
    this.tachePreventif.machine = id
  }
  //autocomplete Personnel
  keySelectedPersonnel = "nom"
  objetPersonnel = {
    nom: "nom",
    prenom: "prenom",
    adresse: "adresse",
    email: "email",
    role: "role",
    telephone: "telephone",
  }
  setPersonnelID(id) {
    this.tachePreventif.personnel = id
  }

  //pour ouvrir un POP-Up
  open(content) {
    this.operationPreventif = {
      id: "",
      libelle: "",
      societeRacine: this.informationGenerale.idSocieteCurrent,
    }
    this.fnctModel.open(content)
  }

  operationPreventif: OperationPreventif;
  openModalModifierOperationPreventif() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.opeSe.create(this.operationPreventif, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.notificationToast.showSuccess("Votre operationPreventif est bien enregistrée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
    this.JoinAndClose()
  }

  //pour fermer un POP-Up
  JoinAndClose() {
    this.fnctModel.JoinAndClose()
  }
  
  tabNumbers = ["tarif"]
  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 10)
  }

  fixedVerguleNumbers() {
    for (let i = 0; i < this.tabNumbers.length; i++) {
      this.tachePreventif[this.tabNumbers[i]] = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.tachePreventif[this.tabNumbers[i]]))
    }
  }
}
