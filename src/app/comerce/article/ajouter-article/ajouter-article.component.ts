import { element } from 'protractor';
import { Component, OnInit,  Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/model/modelComerce/article/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.scss']
})
export class AjouterArticleComponent implements OnInit {
  
  articleFormGroup: FormGroup;
  lienAjoute = "/articles/newArticle"
  lienGetCodeBarre = "/articles/getCodeBare/"
  pageList = "/article/list"

  objectKeys = Object.keys;

  fournisseurs = []
  uniteMesures = []
  typeTiers = []

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
  
  request = new Article()

  article = new Article()

  prixWithQuantites = []

  isLoading = false

  erreurArticle = {
    reference: "",
    designation: "",
    categorie: "",
    prixFourn: "",
    unite1:"",
    unite2:"",
    coefficient:""
  }

  listFrais=[]
  listArticle = []
  variantes = []

  sousProduits = []

  @Output() closeModalAjoutArticle = new EventEmitter<string>();

  @Input() isPopup = false

  @Input() isOpenModalAjoutArticle = false

  ngOnChanges(changes: SimpleChanges) {
    if(this.isOpenModalAjoutArticle){
      this.getAllParametres()
    }
  }
  
  closeAjoutArticle(){
    this.closeModalAjoutArticle.emit();
  }

  constructor(private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    private fonctionPartagesService: FonctionPartagesService,
    private router: Router ) { }

  ngOnInit(): void {
    this.getAllParametres()
  }

  controleInputs() {

    for (let key in this.erreurArticle) {
      this.erreurArticle[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurArticle) {
      if (this.article[key] == "" && key != "unite2" && key != "coefficient" ){
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurArticle[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if(this.article.reference != ""){
      if(this.listArticle.filter(x => x.reference == this.article.reference).length > 0){
        this.erreurArticle.reference = "Cette référence est déjà utilisée !!"
        isValid = false
        if(document.getElementById('reference') != null){
          document.getElementById('reference').classList.add("border-erreur")
        }
      }
    }

    if(this.article.designation != ""){
      if(this.listArticle.filter(x => x.designation == this.article.designation).length > 0){
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

  ajoutArticle() {
    if(!this.controleInputs()) {
       this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
       return
    }

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.article.societe = this.informationGenerale.idSocieteCurrent
    this.article.frais = this.listFrais
    this.article.prixWithQuantites = this.prixWithQuantites
    this.article.sousProduits = this.sousProduits

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.article).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          console.log(resultat)
          this.notificationToast.showSuccess("Votre article est bien enregistrée !")
          if(this.isPopup){
            this.closeAjoutArticle()
          }else{
            this.router.navigate([this.pageList]);
          }
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
          this.listArticle = resultat.articles
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
