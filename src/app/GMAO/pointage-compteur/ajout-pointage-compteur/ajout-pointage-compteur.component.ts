import { PointageCompteurService } from './../../../services/serviceBD_GMAO/pointage-compteur.service';
import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { PointageCompteur } from 'src/app/model/modelGMAO/pointageCompteur.model';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-ajout-pointage-compteur',
  templateUrl: './ajout-pointage-compteur.component.html',
  styleUrls: ['./ajout-pointage-compteur.component.scss']
})
export class AjoutPointageCompteurComponent implements OnInit {
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

  pointageCompteur : PointageCompteur = {
    numero : "",
    date: "",
    vehicule: "",
    chauffeur: "",
    valeurCompteur: 0,
    notes: "",
    societeRacine: this.informationGenerale.idSocieteCurrent,
  }

  erreurPointageCompteur : PointageCompteur = {
    numero: "",
    date: "",
    vehicule: "",
    chauffeur: "",
    valeurCompteur: 0,
    notes: "",
  }

  @Output() closeModalAjoutPointageCompteur = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutPointageCompteur = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutPointageCompteur){
      this.getAllParametres()
    }
  }
  
  closeAjoutArticle(){
    this.closeModalAjoutPointageCompteur.emit();
  }

  constructor(
    private notificationToast: ToastNotificationService,
    private router: Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private pointageCompSer: PointageCompteurService,
    private fnctModel: FnctModelService,) 
    {
      this.getAllParametres()
    }

  ngOnInit(): void {
  }
  
  isLoading = false
  ajoutPointageCompteur() {
    if (!this.fnctModel.controleInput(this.erreurPointageCompteur, this.pointageCompteur)) {
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
    this.pointageCompSer.create(this.pointageCompteur, this.request)
      .subscribe(
        res => {
          this.isLoading = false
          let resultat: any = res
          if (resultat.status) {
            this.notificationToast.showSuccess("Votre pointageCompteur est bien enregistrée !")
            if(this.isPopup){
              this.closeAjoutArticle()
            }else{
              this.router.navigate(['gmao/pointageCompteur/list']);
            }
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
  getCodeFunction(){
    if(this.isModifier == true){
      this.pointageCompteur.numero = this.request.numero
    }else{
      this.getAllParametress.emit()
    }
  }
  //autocomplete Vehicule
  keySelectedVehicule = "libelle"
  objetVehicule = {libelle: "active",}
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
