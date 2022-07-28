import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-ligne-bps',
  templateUrl: './ligne-bps.component.html',
  styleUrls: ['./ligne-bps.component.scss']
})
export class LigneBPsComponent implements OnInit {

  articleFormGroup: FormGroup;

  lienAjoute = "/articles/newArticle"

  objectKeys = Object.keys;

  erreurArticle = {
    quantite:"",
    reference: "",
    prixVenteHT: "",
    unite:""
  }

  // begin autocomplete articles
  keySelectedArticle = "reference"
  
  @Input() articles

  @Input() bonLivraison
  @Input() articlesSelected

  itemArticleSelected = {
    numero:1,
    reference: "",
    designation: "",
    prixAchat:0,
    montantRemise:0,
    prixVenteHT:0,
    quantite:0,
    unite:"",
    redevance:0,
    pVenteConseille:0,
    article:"",
  }

  shemaArticle = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix_HT",
    quantite: "Quantite",
    unite: "Unite",
  }

  shemaMultiSortie = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix HT",
    prixTTC: "Prix TTC"
  }

  shemaArticle2 = {
    reference: "",
    codeBarre: "",
    designation: "",
    typeArticle: "",
    remiseF: "",
    marge: "",
    prixVenteHT: "",
    montantTVA: "",
    prixAchat: "",
    valeurStock: "",
    QteEnStock: "",
    prixTTC: "",
    plafondRemise: "",
    pVenteConseille: "",
    enVente: "",
    enAchat: "",
    description: "",
    prixVenteHT2: "",
    prixVenteHT3: "",
  }

  isLoading = false

  setArticleID(id){
    var articles = this.articles.filter(x => x.id == id)
    if(articles.length > 0){
      var element = {}
      element = articles[0]
      for(let key in element){
        if(this.itemArticleSelected[key] != undefined){
          this.itemArticleSelected[key] = element[key]
        }
      }
    }

    this.itemArticleSelected.quantite =0
    this.itemArticleSelected.unite = ""
    this.itemArticleSelected.article = id
  }

  changePrixTotal(){
    var prixVenteHT = Number(this.getNumber(this.itemArticleSelected.prixVenteHT))

    document.getElementById("affichePrixTotal").setAttribute("class","")
    setTimeout( () => { 
      document.getElementById("affichePrixTotal").setAttribute("class","headtext")
    this.itemArticleSelected.prixVenteHT = Number(this.getNumber(prixVenteHT))
    },20)
  }

  getNumber(float){
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }
  // end autocomplete articles

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    private fonctionPartagesService: FonctionPartagesService) 
 {}

  ngOnInit(): void {
  }

  controleInputs() {
    for(let key in this.erreurArticle){
      this.erreurArticle[key] = ""
    }
   
    var isValid = true

    if(this.itemArticleSelected.reference == ""){
        this.erreurArticle.reference = "Veuillez remplir ce champ"
        isValid = false
    }

    if(Number(this.itemArticleSelected.quantite) == 0){
      this.erreurArticle.quantite = "Veuillez remplir ce champ"
      isValid = false
    }
   
    return isValid
  }

  ajoutArticle()
  { 
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    
    this.notificationToast.showSuccess("Votre article est ajoutée")
    
    var item={
      numero:1,
      reference: "",
      designation: "",
      prixAchat:0,
      montantRemise:0,
      prixVenteHT:0,
      quantite:0,
      unite:"",
      redevance:0,
      pVenteConseille:0,
      article:"",
    }

    for(let key of this.objectKeys(this.itemArticleSelected)){
      item[key] = this.itemArticleSelected[key]
    }

    item['numero']=this.articlesSelected.length + 1

    this.articlesSelected.push(item)

    this.itemArticleSelected = {
      numero:1,
      reference: "",
      designation: "",
      prixAchat:0,
      montantRemise:0,
      prixVenteHT:0,
      quantite:0,
      unite:"",
      redevance:0,
      pVenteConseille:0,
      article:"",
    }

  }

  reseteFormulaire(){
    for(let key in this.itemArticleSelected){
      this.itemArticleSelected[key] = ""
    }  
  }

  //begin delete item

  isOpenModalDelete = false
  numeroItemDelete = 0
  params1Delete = ""
  params2Delete = ""

  deleteItem(){
    this.notificationToast.showSuccess("Votre article est supprimée")
    this.articlesSelected = this.articlesSelected.filter(x => x.numero != this.numeroItemDelete)
    this.closeModalDelete()
  }

  openModalDelete(numero, params2){
    this.numeroItemDelete = numero
    this.isOpenModalDelete = true
    this.params1Delete = "L'article "
    this.params2Delete = params2
  }

  closeModalDelete(){
    this.isOpenModalDelete = false
  }

 //fin delete item

  
  tabNumbers= ['prixVenteHT', 'quantite']
  allTabNumbers = ['prixVenteHT', 'quantite']

  fixedVerguleNumbers(){
    console.log("fixedVerguleNumbers")

    for(let j = 0; j < this.tabNumbers.length; j++){
       this.itemArticleSelected[this.tabNumbers[j]] = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.itemArticleSelected[this.tabNumbers[j]]) 
    }

    for(let i = 0; i < this.articlesSelected.length; i++){
      for(let j = 0; j < this.tabNumbers.length; j++){
        this.articlesSelected[i][this.tabNumbers[j]] = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.articlesSelected[i][this.tabNumbers[j]]) 
      }
    } 
  }

  showInput2(event){
    this.fonctionPartagesService.showInput2(event)
    setTimeout( () => { 
      this.fixedVerguleNumbers()
    },100)
  }

  showInput(event){
    this.fonctionPartagesService.showInput(event)
    setTimeout( () => { 
      this.fixedVerguleNumbers()
    },100)
  }

  resetDesactiveInput(id){
    this.fonctionPartagesService.resetDesactiveInput(id)
  }

  deplaceLigne(numero, pas){
      var newPos = numero + pas
      if(newPos == 0){
        newPos = 0
      } 
      
      if(newPos > (this.articlesSelected.length - 1)){
        newPos = this.articlesSelected.length - 1
      } 
     
      var item:any = {}
      item = this.articlesSelected[numero]
      this.articlesSelected[numero] = this.articlesSelected[newPos]
      this.articlesSelected[newPos] = item

      for(let i = 0; i < this.articlesSelected.length; i++){
        this.articlesSelected[i].numero = i+1
      }
  }
}
