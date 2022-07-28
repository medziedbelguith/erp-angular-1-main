import { Component, OnInit, Input, SimpleChanges , Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';

@Component({
  selector: 'app-ligne-bts',
  templateUrl: './ligne-bts.component.html',
  styleUrls: ['./ligne-bts.component.scss']
})
export class LigneBTsComponent implements OnInit {

  articleFormGroup: FormGroup;

  lienAjoute = "/articles/newArticle"

  objectKeys = Object.keys;

  erreurArticle = {
    quantiteVente:"",
    reference: "",
    prixVenteHT: "",
  }

  // begin autocomplete articles
  keySelectedArticle = "reference"
  
 

  @Input() articles

  @Input() bonLivraison
  @Input() articlesSelected
  @Output() changePrixTotalEvent = new EventEmitter<string>();
  
  modifierPrixTotalBL() {
    this.changePrixTotalEvent.emit();
    
    var totalTTC = 0
    var totalRemise = 0
    var totalTVA = 0
    var totalHT = 0

    for(let i = 0; i < this.articlesSelected.length; i++){
      console.log(this.articlesSelected[i].totalHT)
      totalTTC += this.articlesSelected[i].totalTTC
      totalRemise += this.articlesSelected[i].totalRemise
      totalTVA += this.articlesSelected[i].totalTVA
      totalHT += this.articlesSelected[i].totalHT
    }

    this.bonLivraison.totalTTC = totalTTC
    this.bonLivraison.totalRemise = totalRemise
    this.bonLivraison.totalTVA = totalTVA
    this.bonLivraison.totalHT = totalHT

    var montantPaye = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.montantPaye))
    this.bonLivraison.restPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(totalTTC - montantPaye))
    
  }

  itemArticleSelected = {
    numero:1,
    reference: "",
    designation: "",
    prixAchat:0,
    tauxRemise: 0,
    montantRemise:0,
    prixVenteHT:0,
    quantiteVente:0,
    unite:"",
    totalRemise:0,
    totalHT:0,
    tauxTVA: 0,
    totalTVA: 0,
    redevance:0,
    totalTTC:0,
    pVenteConseille:0,
    article:"",
  }

  shemaArticle = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix_HT",
    tauxTVA: "Taux_TVA (%)",
    tauxRemise: "Taux_Rémise (%)",
    quantiteVente: "Quantite",
    unite: "Unite",
    totalRemise: "Total_Remise",
    totalTVA:"Total_TVA",
    totalHT:"Total_HT",
    totalTTC:"Total_TTC"   
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
    tauxTVA: "",
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

    this.itemArticleSelected.quantiteVente =0
    this.itemArticleSelected.totalTTC = 0
    this.itemArticleSelected.totalTVA = 0
    this.itemArticleSelected.totalHT = 0
    this.itemArticleSelected.unite = ""
    this.itemArticleSelected.article = id
  }

  

  changePrixTotal(){
    var prixVenteHT = Number(this.getNumber(this.itemArticleSelected.prixVenteHT))
    var tauxTVA = Number(this.getNumber(this.itemArticleSelected.tauxTVA))
    var quantiteVente = Number(this.getNumber(this.itemArticleSelected.quantiteVente))
    var tauxRemise = Number(this.getNumber(this.itemArticleSelected.tauxRemise))

    var totalRemise = (prixVenteHT * Number(tauxRemise) / 100) * quantiteVente
    var newPrixVenteHt = prixVenteHT - (prixVenteHT * Number(tauxRemise) / 100)
    var totalHT = newPrixVenteHt * quantiteVente
    var totalTVA = (newPrixVenteHt * tauxTVA / 100) * quantiteVente
    var totalTTC = totalHT + totalTVA
    
    this.itemArticleSelected.totalRemise = Number(this.getNumber(totalRemise))
    this.itemArticleSelected.totalHT = Number(this.getNumber(totalHT))
    this.itemArticleSelected.totalTVA = Number(this.getNumber(totalTVA))
    this.itemArticleSelected.totalTTC = Number(this.getNumber(totalTTC))
    
    document.getElementById("affichePrixTotal").setAttribute("class","")
    setTimeout( () => { 
      document.getElementById("affichePrixTotal").setAttribute("class","headtext")
    /*this.itemArticleSelected.prixVenteHT = Number(this.getNumber(prixVenteHT))
      this.itemArticleSelected.tauxTVA = Number(this.getNumber(tauxTVA))
      this.itemArticleSelected.quantiteVente = Number(this.getNumber(quantiteVente))
      this.itemArticleSelected.tauxRemise = Number(this.getNumber(tauxRemise))*/
    },20)
  }

  changePrixTotalArray(numero){
    
    var prixVenteHT = Number(this.getNumber(this.articlesSelected[numero-1].prixVenteHT))
    var tauxTVA = Number(this.getNumber(this.articlesSelected[numero-1].tauxTVA))
    var quantiteVente = Number(this.getNumber(this.articlesSelected[numero-1].quantiteVente))
    var tauxRemise = Number(this.getNumber(this.articlesSelected[numero-1].tauxRemise))

    var totalRemise = (prixVenteHT * Number(tauxRemise) / 100) * quantiteVente
    var newPrixVenteHt = prixVenteHT - (prixVenteHT * Number(tauxRemise) / 100)
    var totalHT = newPrixVenteHt * quantiteVente
    var totalTVA = (newPrixVenteHt * tauxTVA / 100) * quantiteVente
    var totalTTC = totalHT + totalTVA
    
    this.articlesSelected[numero-1].totalRemise = Number(this.getNumber(totalRemise))
    this.articlesSelected[numero-1].totalHT = Number(this.getNumber(totalHT))
    this.articlesSelected[numero-1].totalTVA = Number(this.getNumber(totalTVA))
    this.articlesSelected[numero-1].totalTTC = Number(this.getNumber(totalTTC))
    
    this.modifierPrixTotalBL()
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

    if(Number(this.itemArticleSelected.quantiteVente) == 0){
      this.erreurArticle.quantiteVente = "Veuillez remplir ce champ"
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
      tauxRemise: 0,
      montantRemise:0,
      prixVenteHT:0,
      quantiteVente:0,
      unite:"",
      totalRemise:0,
      totalHT:0,
      tauxTVA: 0,
      totalTVA: 0,
      redevance:0,
      totalTTC:0,
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
      tauxRemise: 0,
      montantRemise:0,
      prixVenteHT:0,
      quantiteVente:0,
      unite:"",
      totalRemise:0,
      totalHT:0,
      tauxTVA: 0,
      totalTVA: 0,
      redevance:0,
      totalTTC:0,
      pVenteConseille:0,
      article:"",
    }

    this.modifierPrixTotalBL()

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
    this.modifierPrixTotalBL()
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

  
  tabNumbers= ['prixVenteHT', 'tauxTVA', 'tauxRemise', 'quantiteVente']
  allTabNumbers = ['prixVenteHT', 'tauxTVA', 'tauxRemise', 'quantiteVente', 'totalRemise', 'totalTVA', 'totalHT', 'totalTTC']
  tabNumbersLabel = ['totalRemise', 'totalTVA', 'totalHT', 'totalTTC']

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
