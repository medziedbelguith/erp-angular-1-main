import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Router } from '@angular/router';

import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-ajout-modele',
  templateUrl: './ajout-modele.component.html',
  styleUrls: ['./ajout-modele.component.scss']
})
export class AjoutModeleComponent implements OnInit {
  modeleFormGroup: FormGroup;
  lienAjoute = "/modeles/newModele"
  objectKeys = Object.keys;

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  modeles = []

  request = {
    libelle: "",
    marque: "",
    societe:""
  }

  modele = {
    libelle: "",
    marque: "",
    societe:""
  }

  erreurModele = {
    libelle: "",
  }

  @Output() closeModalAjoutModele = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() idFamille = ""

  closeAjoutModele(){
    this.closeModalAjoutModele.emit();
  }

  @Input() isOpenModalAjoutModele = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutModele == true){
      this.getAllParametres()

      for (let key in this.erreurModele) {
        this.erreurModele[key] = ""
        
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.remove("border-erreur")
        }
      }

      for (let key in this.modele) {
        this.modele[key] = ""
      }

    }
  }

  constructor(private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private fonctionPartagesService: FonctionPartagesService,
    private router: Router,) { }

  ngOnInit(): void {

  }

  controleInputs() {
    for (let key in this.erreurModele) {
      this.erreurModele[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    var isValid = true

    for (let key in this.erreurModele) {
      if (this.modele[key] == "") {
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurModele[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    return isValid
  }

  isLoading = false

  ajoutModele() {
    if (!this.controleInputs()) {
       this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
       return
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.modele.societe = this.informationGenerale.idSocieteCurrent   

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.modele).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre modele est bien enregistrée !")
          //this.router.navigate(['variable/modele/list']);
          this.closeAjoutModele()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }

    );
  }

  reseteFormulaire() {
    for (let key in this.erreurModele) {
      this.modele[key] = ""
    }
  }

  isNumberInput(value) {
    var numberValue = Number(value);
    if (numberValue == NaN) {
      return false
    }
    return true;
  }

  getAllParametres() {
    this.http.get(this.informationGenerale.baseUrl + "/modeles/getAllParametres/"+this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.marques = resultat.marques
        }
      }, err => {
      }
    );
  }

  marques = []
  //autocomplete marque
  keySelectedMarque = "libelle"
  
  objetMarque = {
    libelle:"active",
  }

  setMarqueID(id){
    this.modele.marque = id
  }

  listAutoComplete = ['marque']

  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  
  closeModalAjoutElement(){
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }
  
  openModalAjoutMarque(){
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterMarque
    this.isOpenModalAjoutElement = true
  }

}
