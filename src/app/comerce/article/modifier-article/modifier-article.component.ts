import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Article } from 'src/app/model/modelComerce/article/article';

@Component({
  selector: 'app-modifier-article',
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.scss']
})
export class ModifierArticleComponent implements OnInit {


  articleFormGroup: FormGroup;

  lienModifie = "/articles/modifierArticle/"
  lienGetById = "/articles/getById/"
  lienGetCodeBarre = "/articles/getCodeBare/"
  pageList = "/article/list"

  objectKeys = Object.keys;
  id="";

  request = new Article()
  article = new Article()
  
  fournisseurs = []

  erreurArticle = {
    reference: "",
    designation: "",
    categorie: "",
    prixFourn: "",
    unite1:"",
    unite2:"",
    coefficient:""
  }

  prixWithQuantites = []

  listFrais=[]
  variantes = []
  sousProduits = []
  
  constructor(
    private http: HttpClient,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private route: ActivatedRoute, 
    private notificationToast:ToastNotificationService,
    private router: Router) 
  {
  }

  getArticle(id) {   
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetById + this.informationGenerale.idSocieteCurrent + "/" + id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          console.log(response)
          for (let key in this.article){
            this.article[key] = response.resultat[key]
          }
          this.listFrais = response.resultat.frais
          if(response.resultat.prixWithQuantites){
            this.prixWithQuantites = response.resultat.prixWithQuantites
          }

          if(response.resultat.sousProduits){
            this.sousProduits = response.resultat.sousProduits
          }

          this.initialiserParametres()
          this.changePrixVHT()
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  initialiserParametres(){
    this.famillesCurrent = []
    this.sousFamillesCurrent = []
   
    var categorieFamillesSelected = this.categorieFamilles.filter(x => x.categorie == this.article.categorie)
    for(let i = 0; i < categorieFamillesSelected.length; i++){
       var familles = this.familles.filter(x => x.id == categorieFamillesSelected[i].famille)
       if(familles.length > 0){
         this.famillesCurrent.push(familles[0])
       }
    }

    var familleSousFamillesSelected = this.familleSousFamilles.filter(x => x.famille == this.article.famille)
    for(let i = 0; i < familleSousFamillesSelected.length; i++){
       var sousFamilles = this.sousFamilles.filter(x => x.id == familleSousFamillesSelected[i].sousFamille)
       if(sousFamilles.length > 0){
         this.sousFamillesCurrent.push(sousFamilles[0])
       }
    }

    this.modelesCurrent = this.modeles.filter(x => x.marque == this.article.marque)
  }

  ngOnInit(): void {
    
    this.getAllParametres()
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getArticle(this.id)
    }

  }

  controleInputs() {
   
    for(let key in this.erreurArticle){
      this.erreurArticle[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
    
    var isValid = true

    for(let key in this.erreurArticle){
      if(this.article[key] == "" && key != "unite2" && key != "coefficient" ){
        this.erreurArticle[key] = "Veuillez remplir ce champ"
        isValid = false
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    } 

    if(this.article.reference != ""){
      if(this.listArticles.filter(x => x.reference == this.article.reference && x.id != this.id).length > 0){
        this.erreurArticle.reference = "Cette référence est déjà utilisée !!"
        isValid = false
        if(document.getElementById('reference') != null){
          document.getElementById('reference').classList.add("border-erreur")
        }
      
      }
    }

    if(this.article.designation != ""){
      if(this.listArticles.filter(x => x.designation == this.article.designation && x.id != this.id).length > 0){
        this.erreurArticle.designation = "Cette designation est déjà utilisée !!"
        isValid = false
        if(document.getElementById('designation') != null){
          document.getElementById('designation').classList.add("border-erreur")
        }
      }
    }

    if(this.article.coefficient != 0){
      if(this.article.unite2 == ""){
         this.erreurArticle.unite2 = "Veuillez à insérer la deuxième unité !!"
         isValid = false
      }
    }

    if(this.article.unite2 != ""){
      if(this.article.coefficient == 0){
         this.erreurArticle.coefficient = "Veuillez à insérer le coefficient de deuxième unité !!"
         isValid = false
      }
    }


    return isValid
  }

  isLoading = false

  modifierArticle()
  { 
    if (!this.controleInputs()) {
       this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
       return
    }   
    
    this.article.frais = this.listFrais
    this.article.prixWithQuantites = this.prixWithQuantites
    this.article.sousProduits = this.sousProduits
    if (this.isLoading) {
      return
    }
    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.article).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre article est bien modifiée !")
            this.router.navigate([this.pageList]);
        }else{
            this.notificationToast.showError(resultat.message)
        }

      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }

  getCodeBarre(){
    
    if (this.isLoading) {
      return
    }
 
    this.isLoading = true
 
    this.article.societe = this.informationGenerale.idSocieteCurrent
    
    this.http.get(this.informationGenerale.baseUrl + this.lienGetCodeBarre + this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.article.codeBarre = resultat.codeBarre
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  
  typeTiers = []
  listArticles = []

  getAllParametres() {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + "/articles/getAllParametres/"+this.informationGenerale.idSocieteCurrent).subscribe(
      res => {
        let resultat: any = res
        this.isLoading = false
        if (resultat.status) {
          this.categories = resultat.categories
          this.familles = resultat.familles
          this.sousFamilles = resultat.sousFamilles
          this.categorieFamilles = resultat.categorieFamilles
          this.familleSousFamilles = resultat.familleSousFamilles
          this.marques = resultat.marques
          this.modeles = resultat.modeles
          this.tauxTVAs = resultat.tauxTVAs
          this.frais = resultat.frais
          this.uniteMesures = resultat.uniteMesures
          this.listArticles = resultat.articles
          this.fournisseurs = resultat.fournisseurs
          this.typeTiers = resultat.typeTiers
          this.variantes = resultat.variantes
      
          this.initialiserParametres()
        }
      }, err => {
        this.isLoading = false
      }
    );
  }

  uniteMesures = []

  categories = []
  
  familles = []
  famillesCurrent = []
  
  sousFamilles = []
  sousFamillesCurrent = []

  categorieFamilles = []
  familleSousFamilles = []
  
  marques = []
  
  modeles = []
  modelesCurrent = []

  tauxTVAs = []
  tauxTVAsCurrent = []

  frais = []


  changePrixVHT() {

    var prixAchat = Number(this.article.prixFourn) - Number(this.article.prixFourn) * Number(this.article.remiseF / 100)
    
    var marge = Number(this.article.marge)
    
    this.article.prixDC = Number(this.getNumber(prixAchat * this.article.tauxDC / 100)) 
    
    if(this.article.isFodec == "oui"){
      this.article.prixFodec = Number(this.getNumber(prixAchat * this.fonctionPartagesService.parametres.tauxFodec / 100)) 
    }else{
      this.article.prixFodec = Number(this.getNumber(0)) 
    }
      
    this.article.prixAchat = Number(this.getNumber( prixAchat + this.article.prixDC + this.article.prixFodec))
    
    this.article.prixAchat = this.article.prixAchat - this.article.remiseParMontant
    this.article.prixAchatTTC = Number(this.getNumber(this.article.prixAchat + this.article.prixAchat * this.article.tauxTVA / 100))

    var prixRevient =  Number(this.article.prixAchat) + Number(this.article.totalFrais)

    var prixVenteHT = Number(prixRevient) + marge * prixRevient / 100

    var prixVenteHT = Number(prixRevient) + marge * prixRevient / 100

    this.article.prixVenteHT = Number(this.getNumber(prixVenteHT))

    this.article.montantTVA = Number(this.getNumber(this.article.prixVenteHT * this.article.tauxTVA / 100))

    this.article.prixTTC = Number(this.getNumber(Number(this.article.montantTVA) + Number(this.article.prixVenteHT)))

  }

  getNumber(float) {
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }
  
}