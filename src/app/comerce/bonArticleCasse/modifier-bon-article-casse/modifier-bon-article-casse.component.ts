import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-modifier-bon-article-casse',
  templateUrl: './modifier-bon-article-casse.component.html',
  styleUrls: ['./modifier-bon-article-casse.component.scss']
})
export class ModifierBonArticleCasseComponent implements OnInit {
  bonArticleCasseFormGroup: FormGroup;

  lienModifie = "/bonArticleCasses/modifierBonArticleCasse/"
  lienGetById = "/bonArticleCasses/getById/"

  allArticles = []
  allMagasins = []

  id="";
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

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private router: Router, 
    private notificationToast:ToastNotificationService,
    public fonctionPartagesService:FonctionPartagesService) {

    this.getArticlesWithClients()

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

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

  getBonArticleCasse(id) { 
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          this.request = response.resultat
          for (let key in this.bonArticleCasse) {
            this.bonArticleCasse[key] = this.request[key]
          }
          this.bonArticleCasse.date = formatDate(new Date(this.bonArticleCasse.date), 'yyyy-MM-dd', 'en');
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getBonArticleCasse(this.id)
    }
  }

  controleInputs() {
    for(let key in this.erreurBonArticleCasse){
      this.erreurBonArticleCasse[key] = ""
    }
   
    var isValid = true

    for(let key in this.erreurBonArticleCasse){
      if(this.bonArticleCasse[key] == ""){
        this.erreurBonArticleCasse[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   
    return isValid
  }

  isLoading = false

  modifierBonArticleCasse() {
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

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre bonArticleCasse est bien modifiée !") 
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  reseteFormulaire() {
    for (let key in this.erreurBonArticleCasse) {
      this.bonArticleCasse[key] = ""
    }
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
