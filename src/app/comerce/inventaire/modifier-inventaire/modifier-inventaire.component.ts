import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventaire } from 'src/app/model/modelCommerce/inventaire';
import { InventaireService } from 'src/app/services/serviceBD_Commerce/inventaire.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-modifier-inventaire',
  templateUrl: './modifier-inventaire.component.html',
  styleUrls: ['./modifier-inventaire.component.scss']
})
export class ModifierInventaireComponent implements OnInit {

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  inventaireFormGroup: FormGroup;

  ligneInventaire = []

  objectKeys = Object.keys;

  request = new Inventaire()

  inventaire = new Inventaire()

  erreurInventaire = {
    personne: "",
    categorie: "",
  }

  id="";

  allArticles = []
  allCategories = []
  allPersonnels = []


  constructor(
    private notificationToast: ToastNotificationService,
    private route: ActivatedRoute, 
    public informationGenerale: InformationsService, 
    private router:Router,
    private inventaireServ : InventaireService,
    public fonctionPartagesService: FonctionPartagesService,
    private fnctModel:FnctModelService) {
      this.getAllParametres()
  }
  
  getCategorieLibelle(){
    if( this.inventaire.categorie != ""){
      var categories = this.allCategories.filter(x => x.id == this.inventaire.categorie)
      if(categories.length > 0){
        return categories[0].libelle
      }else{
        return ""
      } 
    }else{
      return ""
    }
  } 
  getAllParametres(){
    this.isLoading = true
    this.inventaireServ.parametre(this.informationGenerale.idSocieteCurrent)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allCategories = resultat.categories
          this.allPersonnels = resultat.personnels
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
    this.inventaire.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getInventaire(this.id)
    }
  }

  isLoading = false
  getInventaire(id) { 
    this.isLoading = true
    this.inventaireServ.getById(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.inventaire) {
            this.inventaire[key] = this.request[key]
          }
          this.inventaire.date = formatDate(new Date(this.inventaire.date), 'yyyy-MM-dd', 'en');
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  
  modifierInventaire() {
    if (!this.fnctModel.controleInput(this.erreurInventaire, this.inventaire)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for(let key in this.inventaire){
      this.request[key] = this.inventaire[key]
    }   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.inventaireServ.update(this.id,this.inventaire, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre inventaire est bien modifiée !")
             this.router.navigate(["/inventaire/list"])
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  //start Personnel
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement(){
     this.isOpenModalAjoutElement = false
     this.getAllParametres()
  }

  openModalAjoutPersonnel(){
     this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
     this.isOpenModalAjoutElement = true
  }

  objetPersonnel = {
    nom:"Nom",
    prenom:"Prénom",
    role:"Role",
    email:"Email",
    telephone:"Téléphone",
    adresse:"Adresse",
  }
  keySelectedPersonnel = "nom"
  setPersonnelID(id) {
    this.inventaire.personne = id
  }
//end Personnel

}
