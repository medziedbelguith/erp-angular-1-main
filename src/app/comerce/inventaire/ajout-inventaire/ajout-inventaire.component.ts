import { Component, OnInit } from '@angular/core';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Inventaire } from 'src/app/model/modelCommerce/inventaire';
import { InventaireService } from 'src/app/services/serviceBD_Commerce/inventaire.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-ajout-inventaire',
  templateUrl: './ajout-inventaire.component.html',
  styleUrls: ['./ajout-inventaire.component.scss']
})
export class AjoutInventaireComponent implements OnInit {

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  allArticles = []
  articles = []
  allCategories = []
  allPersonnels = []
  objectKeys = Object.keys;

  request = new Inventaire()

  inventaire = new Inventaire()

  erreurInventaire = {
    personne: "",
    categorie: "",
  }

  constructor(
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService, 
    public fonctionPartagesService: FonctionPartagesService, 
    private router:Router,
    private inventaireServ : InventaireService,
    private fnctModel:FnctModelService,
    private tokenStorage: TokenStorageService) {
    this.getAllParametres()
  }

  getAllParametres(){
    this.isLoading = true
    this.inventaireServ.parametre(this.informationGenerale.idSocieteCurrent)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.allArticles = []
          this.allCategories = resultat.categories
          this.allPersonnels = resultat.personnels
          this.inventaire.numero = resultat.numeroAutomatique
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  initialiserInventaireArticle(articles){
    this.allArticles = articles
    this.articles = []
    var j = 0
    for (let item of articles) {
      j++
      var objet = {
        article: item.id,
        numero: j,
        qteTheorique: item.qteTheorique,
        qteEnStock: item.qteEnStock,
        qteInv1: 0,
        qteInv2: 0,
        qteInv3: 0,
        qteInv1IsValid: "non",
        qteInv2IsValid: "non",
        qteInv3IsValid: "non",
        qteInvValide: 0,
        notes: "",
        lot:"",
        reference: item.reference,
        designation: item.designation,
        isShow:0,
        sousProduit:""
      }
      this.articles.push(objet)

      for(let item2 of item.stocks){
        var objet2 = {
          article: item.id,
          numero: 0,
          qteTheorique: item2.qteTheorique,
          qteEnStock: item2.qteEnStock,
          qteInv1: 0,
          qteInv2: 0,
          qteInv3: 0,
          qteInv1IsValid: "non",
          qteInv2IsValid: "non",
          qteInv3IsValid: "non",
          qteInvValide: 0,
          notes: "",
          lot:item2.lot,
          reference: item.reference+" ( "+this.getReference(item.sousProduits, item2.sousProduit)+" ) ",
          designation: item.designation,
          isShow:0,
          sousProduit:item2.sousProduit
        }
        this.articles.push(objet2)
      }
    }
  }

  getReference(sousProduits, sousProduit){
     if(sousProduit == ""){
       return ""
     }

     for(let i = 0; i < sousProduits.length; i++){
        if(sousProduits[i].id == sousProduit){
          return sousProduits[i].reference
        }
     }
  }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
    this.inventaire.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.inventaire.personne = this.tokenStorage.getUser()?.id
  }

  isLoading = false
  ajoutInventaire() {
    if (!this.fnctModel.controleInput(this.erreurInventaire, this.inventaire)) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    if(this.articles.length == 0)
    {
      this.notificationToast.showError("Il faut ajouter une categorie avec des articles !")
      return
    }
    for (let key in this.inventaire) {
      this.request[key] = this.inventaire[key]
    }
    this.request.ligneInventaire = this.articles
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.inventaireServ.create(this.inventaire, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre inventaire est bien enregistrée !")
          this.router.navigate(["/inventaire/list"])
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  reseteFormulaire() {
    for (let key in this.erreurInventaire) {
      this.inventaire[key] = ""
    }
  }

  // start categorie
  objetCategorie = {
    libelle: "active",
  }
  keySelectedCategorie = "libelle"
  setCategorieID(id) {
    this.inventaire.categorie = id
  }
// end categorie
//start personnel
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
//end personnel

getArticleByCategories() {
  this.isLoading = true
  var request = {categorie:this.inventaire.categorie, societe: this.informationGenerale.idSocieteCurrent}
  this.inventaireServ.rechercheByCategorie(request)
    .subscribe(
      res => {
        this.isLoading = false
      let resultat: any = res
      if (resultat.status) {
        this.initialiserInventaireArticle(resultat.resultat);
      }  
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
}

//start Categorie
   isOpenModalAjoutElement = false
   idAjoutElementModal = ""
   typeElement

   closeModalAjoutElement(){
      this.isOpenModalAjoutElement = false
      this.getAllParametres()
   }
 
   openModalAjoutCategorie(){
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterCategorie
      this.isOpenModalAjoutElement = true
   }

   openModalAjoutPersonnel(){
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
      this.isOpenModalAjoutElement = true
   }
//end Categorie

}