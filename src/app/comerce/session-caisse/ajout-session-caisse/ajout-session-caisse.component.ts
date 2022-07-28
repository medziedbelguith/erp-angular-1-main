import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { SessionCaisse } from 'src/app/model/modelCommerce/sessionCaisse';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { SessionCaisseService } from 'src/app/services/serviceBD_Commerce/sessionCaisse.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-session-caisse',
  templateUrl: './ajout-session-caisse.component.html',
  styleUrls: ['./ajout-session-caisse.component.scss']
})
export class AjoutSessionCaisseComponent implements OnInit {

  @Output() closeModalAjoutSessionCaisse = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutSessionCaisse = false

  ngOnChanges(changes: SimpleChanges) {
    if (this.isOpenModalAjoutSessionCaisse) {
      for (let key in this.erreurSessionCaisse) {
        this.erreurSessionCaisse[key] = ""

        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.sessionCaisse) {
        this.sessionCaisse[key] = ""
      }

      this.getAllParametres()
    }
  }

  closeAjoutCaisse() {
    this.closeModalAjoutSessionCaisse.emit();
  }

  sessionCaisseFormGroup: FormGroup;

  objectKeys = Object.keys;

  sessionCaisses = []

  request = new SessionCaisse()

  sessionCaisse = new SessionCaisse()

  utilisateur

  erreurSessionCaisse = {
    caisse: "",
    utilisateur: "",
    numero: "",
    dateOuverture: "",
    fondCaisseOuvrier: "",
    fondCaisseAdmin: "",
  }

  constructor(
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,
    private fonctionPartagesService: FonctionPartagesService,
    private fnctModel: FnctModelService,
    private sessionCaisseSer: SessionCaisseService,
    private tokenStorageService: TokenStorageService,
    private router: Router,) {
  }

  ngOnInit(): void {
    let utilisateur = this.tokenStorageService.getUser()
    this.sessionCaisse.utilisateur = utilisateur.id
    this.getAllParametres()
  }

  listTotalRegl = []
  envoitListeRegl(listReg) {
    this.listTotalRegl = listReg
  }

  controleInputs() {
    for (let key in this.erreurSessionCaisse) {
      this.erreurSessionCaisse[key] = ""
      if (document.getElementById(key) != null) {
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true
    for (let key in this.erreurSessionCaisse) {
      if (key == 'fondCaisseAdmin' || key == 'fondCaisseOuvrier') {
        if (this.sessionCaisse[key] < 0) {
          if (document.getElementById(key) != null) {
            document.getElementById(key).classList.add("border-erreur")
          }
          this.erreurSessionCaisse[key] = "Veuillez saisir un entier superieur à zéro"
          isValid = false
        }

      } else if (key == 'caisse' || key == 'utilisateur' || key == 'numero' || key == 'dateOuverture') {
        if (this.sessionCaisse[key] == "") {
          if (document.getElementById(key) != null) {
            document.getElementById(key).classList.add("border-erreur")
          }
          this.erreurSessionCaisse[key] = "Veuillez remplir ce champ"
          isValid = false
        }

      }
    }
    return isValid
  }

  isLoading = false
  ajoutSessionCaisse() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    for (let key in this.sessionCaisse) {
      this.request[key] = this.sessionCaisse[key]
    }
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.sessionCaisseSer.create(this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre session caisse est bien enregistrée !")
            this.router.navigate(["sessionCaisses/list"]);
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //Get parametre of sessionCaisse 
  allSessionCaisses = []
  allCaisses = []
  allUtilisateurs = []
  getAllParametres() {
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
      exercice: this.informationGenerale.exerciceCurrent
    }
    this.sessionCaisseSer.parametre(request)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allCaisses = resultat.caisses
            this.allUtilisateurs = resultat.utilisateurs
            this.allSessionCaisses = resultat.sessionCaisses
            this.sessionCaisse.numero = resultat.numeroAutomatique
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  //Get Liste des reglements
  changeVar = false
  getListReglements() {
    if (this.sessionCaisse.dateCloture < this.sessionCaisse.dateOuverture) {
      this.notificationToast.showError("Votre date de cloture est inférieur à la date d'ouveture !")
      return
    }
    this.changeVar = true
  }

  //autocomplete caisse
  keySelectedCaisse = "libelle"
  objetCaisse = {
    libelle: "Libelle",
  }
  setCaisseID(id) {
    this.sessionCaisse.caisse = id
  }

  //open modal ajout Caisse
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }
  openModalAjoutCaisse() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterCaisse
    this.isOpenModalAjoutElement = true
  }

  //autocomplete Utilisateur
  keySelectedUtilisateur = "nom"
  objetUtilisateur = {
    nom: "Nom",
    prenom: "Prenom",
  }
  setUtilisateurID(id) {
    this.sessionCaisse.utilisateur = id
  }

  openModalAjoutUtilisateur() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterUtilisateur
    this.isOpenModalAjoutElement = true
  }
}

