import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-ajout-bon-article-casse',
  templateUrl: './ajout-bon-article-casse.component.html',
  styleUrls: ['./ajout-bon-article-casse.component.scss']
})
export class AjoutBonArticleCasseComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonArticleCasseFormGroup: FormGroup;

  lienAjoute = "/bonArticleCasses/newBonArticleCasse"

  apiList = "/bonArticleCasses/listBonArticleCasses"
 
  articles = []
  allArticles = []
  allMagasins = []

  ligneBTs = []

  objectKeys = Object.keys;

  request = {
    numero:0,
    date:"",
    article:"",
    cas:"",
    magasin:"",
    quantite:0,
    prixUnitaire:0,
  }

  bonArticleCasse = {
    numero:0,
    date:"",
    article:"",
    cas:"",
    magasin:"",
    quantite:0,
    prixUnitaire:0,
  }

  tabNumbers = ["prixUnitaire"]

  erreurBonArticleCasse = {
    numero:"",
    date:"",
    article:"",
    cas:"",
    magasin:"",
    quantite:"",
    prixUnitaire:"",
  }

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService, public fonctionPartagesService:FonctionPartagesService) 
  {
    this.getArticlesWithClients()
  }
  
  getArticlesWithClients(){ 
    this.http.get(this.informationGenerale.baseUrl + "/bonArticleCasses/getAllParametres").subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allArticles = resultat.articles
          this.allMagasins = resultat.societes
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  changePrixTotalEvent(){
    console.log(this.articles)
  }

  
  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.bonArticleCasse.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  controleInputs() {
    for(let key in this.erreurBonArticleCasse){
      this.erreurBonArticleCasse[key] = ""
    }
    var isValid = true    
    return isValid
  }

  isLoading = false

  ajoutBonArticleCasse()
  {  
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
     
    for(let key in this.bonArticleCasse){
      this.request[key] = this.bonArticleCasse[key]
    }   
    
    if (this.isLoading) {
      return
    }
    
    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre bonArticleCasse est bien enregistrée !")
          }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
    
  }

  reseteFormulaire(){
    for(let key in this.erreurBonArticleCasse){
      this.bonArticleCasse[key] = ""
    }
    this.ligneBTs = []
  }

  //autocomplete Article
 keySelectedArticle = "reference"

 objetArticle = {
  codeBarre: "active",
  designation: "active",
  typeArticle: "active",
  tauxTVA: "active",
  prixFourn: "active",
  remiseF: "active",
  marge: "active",
  prixVenteHT: "active",
  montantTVA: "active",
  prixAchat: "active",
  valeurStock: "active",
  qteEnStock: "active",
  prixTTC: "active",
  plafondRemise: "active",
  pVenteConseille: "active",
  enVente: "active",
  enAchat: "active",
  refFournisseur: "active",
  redevance: "active",
  enBalance: "active",
  enPromotion: "active",
  enNouveau: "active",
  lotActive: "active",
  longueur: "active",
  largeur: "active",
  hauteur: "active",
  surface: "active",
  volume: "active",
  enDisponible: "active",
  enArchive: "active",
  enVedette: "active",
  enLiquidation: "active",
  description: "active",
  observations: "active",
  poids: "active",
  couleur: "active",
  unite1: "active",
  unite2: "active",
  coefficient: "active",
  emplacement: "active",
  raccourciPLU: "active",
  prixVenteHT2: "active",
  prixVenteHT3: "active",
  qteTheorique: "active",
  seuilAlerteQTS: "active",
  seuilRearpQTS: "active",
  QteEnStock: "active",
  categorie: "active",
  famille: "active",
  sousFamille: "active",
  marque: "active",
  modele: "active",
 }

 setArticleID(id) {
   this.bonArticleCasse.article = id
 }

 //autocomplete Magasin
 keySelectedMagasin = "raisonSociale"

  objetMagasin = {
    raisonSociale: "active",
    matriculeFiscale: "active",
    responsable: "active",
    cinResponable: "active",
    telephones: "active",
    mobiles: "active",
    fax: "active",
    localite: "active",
    email: "active",
    pays: "active",
    gouvernorat: "active",
    delegation: "active",
    codePostale: "active",
    societeParent: null,
  }

  setMagasinID(id) {
    this.bonArticleCasse.magasin = id
  }

  showInput(event){
    this.fonctionPartagesService.showInput(event)
    setTimeout( () => { 
      this.fixedVerguleNumbers()
    },10)
  }

  fixedVerguleNumbers(){
    for(let i = 0; i < this.tabNumbers.length; i++){
      this.bonArticleCasse[this.tabNumbers[i]] = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonArticleCasse[this.tabNumbers[i]]))
    }
  }

}
