import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-ligne-correction-stocks',
  templateUrl: './ligne-correction-stocks.component.html',
  styleUrls: ['./ligne-correction-stocks.component.scss']
})
export class LigneCorrectionStocksComponent implements OnInit {

  articleFormGroup: FormGroup;

  lienAjoute = "/articles/newArticle"

  objectKeys = Object.keys;

  erreurArticle = {
    article:"",
    qteDifference:"",
  }

  // begin autocomplete articles
  keySelectedArticle = "reference"
  
  @Input() articles
  @Input() bonLivraison
  @Input() articlesSelected

  @Input() titreCrud

  itemArticleSelected = {
    numero:1,
    reference: "",
    designation: "",
    qteAncienne:0,
    qteDifference:0,
    qteNouvelle:0,
    notes:"",
    article:"",
  }

  shemaArticle = {
    numero: "Numero",
    reference: "Reference",
    designation: "Désignation",
    qteAncienne: "Qte Ancienne",
    qteDifference: "Qte Difference",
    qteNouvelle: "Qte Nouvelle",
    notes: "Notes",  
  }

  shemaMultiSortie = {
    reference: "Réference",
    designation: "Désignation",
    qteEnStock: "Quantité En Stock",
  }

  shemaArticle2 = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix Vente HT",
    tauxTVA: "tauxTVA(%)",
    prixTTC: "Montant TTC",
    qteEnStock: "Qte En Stock",
    qteTheorique: "Qte Theorique",
    plafondRemise: "Plafond Remise",
    pVenteConseille: "Prix Vente Conseille",
    enVente: "Vente",
    enAchat: "Achat",
    description: "Description",
  }

  isLoading = false

  setArticleID(id){
    var articles = this.articles.filter(x => x.id == id)
  
    if(articles.length > 0){
      var element:any = {}
      element = articles[0]
      for(let key in element){
        if(this.itemArticleSelected[key] != undefined){
          this.itemArticleSelected[key] = element[key]
        }
      }
      this.itemArticleSelected.qteAncienne = element.qteEnStock
      this.itemArticleSelected.qteNouvelle = element.qteEnStock
    }
  
    this.itemArticleSelected.qteDifference = 0
    this.itemArticleSelected.notes = ""
    this.itemArticleSelected.article = id
  }

  changeQuantiteDifference(){
    this.itemArticleSelected.qteNouvelle = Number(this.itemArticleSelected.qteAncienne) + Number(this.itemArticleSelected.qteDifference) 
  }

  changeQuantiteNouvelle(){
    this.itemArticleSelected.qteDifference =  Number(this.itemArticleSelected.qteNouvelle) - Number(this.itemArticleSelected.qteAncienne) 
  }

  changeQuantiteDifferenceTab(article){
    for(let i = 0; i < this.articlesSelected.length; i++){
      if(this.articlesSelected[i].article == article)
        this.articlesSelected[i].qteNouvelle = Number(this.articlesSelected[i].qteAncienne) + Number(this.articlesSelected[i].qteDifference) 
    }
  }

  changeQuantiteNouvelleTab(article){
    for(let i = 0; i < this.articlesSelected.length; i++){
      if(this.articlesSelected[i].article == article)
        this.articlesSelected[i].qteDifference =  Number(this.articlesSelected[i].qteNouvelle) - Number(this.articlesSelected[i].qteAncienne) 
    }
  }

  // end autocomplete articles

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService) 
  {}

  ngOnInit(): void {
    this.initialiserVariablesOfShowsElements()
  }

  controleInputs() {
    for(let key in this.erreurArticle){
      this.erreurArticle[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true
   
    if(this.itemArticleSelected.article == ""){
      this.erreurArticle.article = "Veuillez remplir ce champ"
      if(document.getElementById('article') != null){
        document.getElementById('article').classList.add("border-erreur")
      }
      isValid = false
    }
  
    if(Number(this.itemArticleSelected.qteDifference) == 0){
      this.erreurArticle.qteDifference = "Veuillez remplir ce champ"
      if(document.getElementById('qteDifference') != null){
        document.getElementById('qteDifference').classList.add("border-erreur")
      }
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
      qteAncienne:0,
      qteDifference:0,
      qteNouvelle:0,
      notes:"",
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
      qteAncienne:0,
      qteDifference:0,
      qteNouvelle:0,
      notes:"",
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

  tabNumbers= ['qteTeorique', 'qteDifference', 'qteNouvelle']
  allTabNumbers = ['qteTeorique', 'qteDifference', 'qteNouvelle', 'totalRemise', 'totalTVA', 'totalHT', 'totalTTC']
  tabNumbersLabel = ['totalRemise', 'totalTVA', 'totalHT', 'totalTTC']

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

  //initialiser le completation de lignes si  
  //les lignes de table est inferieur a 6

  emptyTable = []
  initialisationEmptyTable(){
    this.emptyTable = []
    if(this.articlesSelected.length < 6){
      for(let i = this.articlesSelected.length; i < 6; i++){
        this.emptyTable.push({})
      }
      return true
    }
    return false
  }


  //app-showelements
  itemsShowsElements = {}
  itemsVariableShowsElements = {}

  initialiserVariablesOfShowsElements(){
    for(let key in this.shemaArticle){
      this.itemsShowsElements[key] = "active"
      this.itemsVariableShowsElements[key] = "active"
    }
  }
}
