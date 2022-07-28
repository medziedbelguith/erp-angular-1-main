import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PointageCompteur } from 'src/app/model/modelGMAO/pointageCompteur.model';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { InformationsService } from 'src/app/services/informations.service';
import { PointageCompteurService } from 'src/app/services/serviceBD_GMAO/pointage-compteur.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-modifier-pointage-compteur',
  templateUrl: './modifier-pointage-compteur.component.html',
  styleUrls: ['./modifier-pointage-compteur.component.scss']
})
export class ModifierPointageCompteurComponent implements OnInit {

  pointageCompteurFormGroup: FormGroup;
  objectKeys = Object.keys;

  request = {
    numero: "",
    date: "",
    vehicule: "",
    chauffeur: "",
    valeurCompteur: "",
    notes: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  pointageCompteur: PointageCompteur = {
    numero: "",
    date: "",
    vehicule: "",
    chauffeur: "",
    valeurCompteur: 0,
    notes: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  erreurPointageCompteur: PointageCompteur = {
    numero: "",
    date: "",
    vehicule: "",
    chauffeur: "",
    valeurCompteur: 0,
    notes: "",
  }

  constructor(
    private route: ActivatedRoute,
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private pointageCompSer: PointageCompteurService,) 
    {
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
      });
      
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length > 1) {
      this.getPointageCompteur(this.id)
    }
    this.getAllParametres()
    }

  getPointageCompteur(id) {
    this.isLoading = true
    this.pointageCompSer.get(this.id)
      .subscribe(
        res => {
          this.isLoading = false
          let response: any = res
          if (response.status) {
            this.request = response.resultat
            for (let key in this.pointageCompteur) {
              this.pointageCompteur[key] = this.request[key]
            }
            this.pointageCompteur.date = formatDate(new Date(this.pointageCompteur.date), 'yyyy-MM-dd', 'en');
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  id
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.length > 1) {
      this.getPointageCompteur(this.id)
    }
  }

  controleInputs() {
    for (let key in this.erreurPointageCompteur) {
      this.erreurPointageCompteur[key] = ""
    }
    var isValid = true
    for (let key in this.pointageCompteur) {
      if (this.pointageCompteur[key] == "") {
        this.erreurPointageCompteur[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }
    return isValid
  }

  isLoading = false
  modifierPointageCompteur() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.pointageCompteur) {
      this.request[key] = this.pointageCompteur[key]
    }
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.pointageCompSer.update(this.id,this.pointageCompteur, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.getAllParametres()
            this.router.navigate(['gmao/pointageCompteur/list']);
            this.notificationToast.showSuccess("Votre pointageCompteur est bien modifiée !")
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });

  }

  reseteFormulaire() {
    for (let key in this.erreurPointageCompteur) {
      this.pointageCompteur[key] = ""
    }
  }

  allPointageComps = []
  allVehicules = []
  allChauffeurs = []
  getAllParametres() {
    this.pointageCompSer.parametre(this.informationGenerale.idSocieteCurrent)
      .subscribe(
        res => {
          let resultat: any = res
          if (resultat.status) {
            this.allPointageComps = resultat.pointageCompteurs
            this.allVehicules = resultat.vehicules
            this.allChauffeurs = resultat.chauffeurs
            this.pointageCompteur.numero = resultat.numero.numero
          }
        },
        error => {
          this.isLoading = false
          alert("Désole, ilya un problème de connexion internet")
        });
  }

  @Input() isModifier = true
  @Output() getAllParametress = new EventEmitter<string>();
  getCodeFunction() {
    if (this.isModifier == true) {
      this.pointageCompteur.numero = this.request.numero
    } else {
      this.getAllParametress.emit()
    }
  }
  //autocomplete Vehicule
  keySelectedVehicule = "libelle"
  objetVehicule = { libelle: "active", }
  setVehiculeID(id) {
    this.pointageCompteur.vehicule = id
  }
  //autocomplete Chauffeur
  keySelectedChauffeur = "nom"
  objetChauffeur = {
    nom: "nom",
    prenom: "prenom",
    role: "role",
    email: "email",
    telephone: "telephone"
  }
  setChauffeurID(id) {
    this.pointageCompteur.chauffeur = id
  }
  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalAjoutChauffeur() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajoutChauffeur
    this.isOpenModalAjoutElement = true
  }
  openModalAjoutVehicule() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajoutVehicule
    this.isOpenModalAjoutElement = true
  }
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }
}
