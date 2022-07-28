import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { FnctModelService } from 'src/app/services/fonctionModel/fnct-model.service';

@Component({
  selector: 'app-lignebl',
  templateUrl: './lignebl.component.html',
  styleUrls: ['./lignebl.component.scss']
})
export class LigneblComponent implements OnInit {

  articleFormGroup: FormGroup;

  lienAjoute = "/articles/newArticle"

  objectKeys = Object.keys;

  erreurArticle = {
    quantiteVente: "",
    reference: "",
    prixVenteHTReel: "",
  }

  // begin autocomplete articles
  keySelectedArticle = "reference"

  @Input() articles

  @Input() uniteMesures = []

  @Input() bonLivraison
  @Input() articlesSelected

  @Output() changePrixTotalEvent = new EventEmitter<string>();

  @Input() client

  @Input() isDetails = "non"
  @Input() titreDocument
  modifierPrixTotalBL() {
    this.changePrixTotalEvent.emit();

    var totals = {
      totalTTC: 0,
      totalRemise: 0,
      totalTVA: 0,
      totalHT: 0,
      totalGain: 0,
      totalFodec: 0,
      totalRedevance: 0,
      totalDC: 0
    }

    for (let i = 0; i < this.articlesSelected.length; i++) {
      totals.totalTTC += this.articlesSelected[i].totalTTC
      totals.totalRemise += this.articlesSelected[i].totalRemise
      totals.totalTVA += this.articlesSelected[i].totalTVA
      totals.totalHT += this.articlesSelected[i].totalHT
      totals.totalGain += this.articlesSelected[i].totalGain
      totals.totalFodec += this.articlesSelected[i].prixFodec * this.articlesSelected[i].quantiteVente
      totals.totalDC += this.articlesSelected[i].prixDC * this.articlesSelected[i].quantiteVente
      totals.totalRedevance += this.articlesSelected[i].redevance * this.articlesSelected[i].quantiteVente
    }

    this.bonLivraison.timbreFiscale = this.fonctionPartagesService.parametres.prixTimbreFiscale

    if (this.client) {
      if (this.client.exemptTimbreFiscale == "non") {
        this.bonLivraison.timbreFiscale = 0
      }
    }

    for (let key in totals) {
      this.bonLivraison[key] = totals[key]
    }

    var montantPaye = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.montantPaye))
    this.bonLivraison.montantTotal = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(totals.totalTTC + this.bonLivraison.timbreFiscale))
    
    if(!this.isPrixVenteNotPrixAchat()){
      this.bonLivraison.montantTotal = this.bonLivraison.montantTotal + totals.totalRedevance
    }

    this.bonLivraison.montantTotal = this.calculeRemise(this.bonLivraison.montantTotal)
  
    this.bonLivraison.totalTTC = this.bonLivraison.montantTotal
    this.bonLivraison.restPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.montantTotal - montantPaye))

  }
  
  calculeRemise(x)
  {
    if(this.client.remise == undefined)
    {
      this.client.remise = 0
      return(x)
    }
    return ( x * (1 - this.client.remise / 100))
  }

  getUniteById(id) {
    var libelle = ""
    var unites = this.uniteMesures.filter(x => x.id == id)

    if (unites.length > 0) {
      return unites[0].libelle
    }

    return libelle
  }

  sousProduits = []
  stocks = []
  changeSousProduit(){

  }

  itemArticleSelected = {
    article: "61c0692eb670950c58fff815",
    sansRemise: "non",
    numero: 0,
    reference: "",
    designation: "",
    marge: 0,
    remiseF: 0,
    prixFourn: 0,
    isFodec: "non",
    prixFodec: 0,
    tauxDC: 0,
    prixDC: 0,
    totalFrais: 0,
    redevance: 0,
    prixAchat: 0,
    prixVenteHT: 0,

    tauxRemise: 0,
    totalRemise: 0,

    totalHT: 0,
    tauxTVA: 0,

    totalGain: 0,

    totalTVA: 0,
    totalTTC: 0,

    prixTTC: 0,

    pVenteConseille: 0,
    plafondRemise: 0,

    unite1: "",
    quantiteVente: 0,
    prixVenteHTReel: 0,

    unite2: "",
    quantiteVente2: 0,
    prixVenteHTReel2: 0,


    coefficient: 0,

    quantiteALivree: 0,

    societe: ""
  }

  shemaArticle = {
    numero: "Numéro",
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix Vente HT(U1)",
    tauxRemise: "Taux_Rémise (%)",

    quantiteVente: "Quantité(U1)",
    prixVenteHTReel: "Prix Vente HT(Après remise)(U1)",
    unite1: "Unité 1",
    
    quantiteVente2: "Quantité(U2)",
    prixVenteHTReel2: "Prix Vente HT(Après remise)(U2)",
    unite2: "Unité 2",
    
    totalHT: "Total HT",
    tauxTVA: "Taux_TVA (%)",
    prixTTC:"P.U TTC",
    totalTTC:"Total TTC", 
    //pVenteConseille:"Prix vente conseillé",   
    totalGain:"Gain",   
  }

  shemaMultiSortie = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix HT",
    prixTTC: "Prix TTC"
  }

  shemaArticle2 = {
    reference: "Réference",
    designation: "Désignation",
    prixVenteHT: "Prix Vente HT",
    prixTTC: "Prix Vente TTC",
    prixAchat: "Prix Achat HT",
    prixAchatTTC: "Prix Achat TTC",
    tauxTVA: "TauxTVA(%)",
    qteEnStock: "Qte En Stock",
    qteTheorique: "Qte Theorique",
    plafondRemise: "Plafond Remise",
    pVenteConseille: "Prix Vente Conseille",
    enVente: "Vente",
    enAchat: "Achat",
    description: "Description",
  }

  shemaArticle2Number = {
    marge: '',
    tauxTVA: '',
    prixTTC: '',
    pVenteConseille: '',
    plafondRemise: ''
  }

  shemaArticle2Quantite = {
    qteEnStock: '',
    qteTheorique: ''
  }

  isLoading = false

  isPrixVenteNotPrixAchat(){
    if(this.titreDocument == this.fonctionPartagesService.titreDocuments.bonRetourClient || this.titreDocument == this.fonctionPartagesService.titreDocuments.devis || this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison || this.titreDocument == this.fonctionPartagesService.titreDocuments.commande){
      return true
    }
    return false
  }

  resetItemSelecte() {
    this.itemArticleSelected = {
      article: "61c0692eb670950c58fff815",
      numero: 0,
      reference: "",
      designation: "",
      marge: 0,
      sansRemise: "non",
      remiseF: 0,
      prixFourn: 0,

      isFodec: "non",
      prixFodec: 0,
      tauxDC: 0,
      prixDC: 0,
      totalFrais: 0,
      redevance: 0,

      prixAchat: 0,
      prixVenteHT: 0,
      tauxRemise: 0,
      totalRemise: 0,

      totalHT: 0,
      tauxTVA: 0,

      totalGain: 0,
      totalTVA: 0,
      totalTTC: 0,

      prixTTC: 0,
      
      pVenteConseille: 0,
      plafondRemise: 0,

      unite1: "",
      quantiteVente: 0,
      prixVenteHTReel: 0,

      unite2: "",
      quantiteVente2: 0,
      prixVenteHTReel2: 0,

      coefficient: 0,

      quantiteALivree: 0,

      societe: ""
    }
  }

  setArticleID(id){  
    var articles = this.articles.filter(x => x.id == id)
    if (articles.length > 0){
      var element = articles[0]
      for (let key in element) {
        if (this.itemArticleSelected[key] != undefined) {
          if(Number.isFinite(this.itemArticleSelected[key])){
            this.itemArticleSelected[key] = Number(element[key])
          }else{
            this.itemArticleSelected[key] = element[key]
          }
        }
      }

      if(!this.isPrixVenteNotPrixAchat()){
        this.itemArticleSelected.prixVenteHT = Number(element.prixAchat)
        this.itemArticleSelected.prixTTC = Number(element.prixAchatTTC)
      }else{
        this.itemArticleSelected.prixVenteHT = Number(element.prixVenteHT)
        this.itemArticleSelected.prixTTC = Number(element.prixTTC)
      }

      this.sousProduits = element.sousProduits
      this.stocks = element.stocks

      this.itemArticleSelected.quantiteVente = 1
      this.itemArticleSelected.totalTTC = 0
      this.itemArticleSelected.totalTVA = 0
      this.itemArticleSelected.totalHT = 0
      this.itemArticleSelected.article = id

      if(this.isPrixVenteNotPrixAchat()){
      //this.itemArticleSelected.prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(1, articles[0], this.client)
        this.itemArticleSelected.prixVenteHTReel = this.itemArticleSelected.prixVenteHT
      }else{
        this.itemArticleSelected.prixVenteHTReel = this.itemArticleSelected.prixVenteHT
      }

      this.itemArticleSelected.tauxRemise = (this.itemArticleSelected.prixVenteHT - this.itemArticleSelected.prixVenteHTReel) / this.itemArticleSelected.prixVenteHT * 100
      
      this.itemArticleSelected.prixVenteHTReel2 = this.itemArticleSelected.prixVenteHT * this.itemArticleSelected.coefficient
      this.itemArticleSelected.quantiteVente2 = 1 * this.itemArticleSelected.coefficient
      this.changePrixTotal()
    }else{
      this.resetItemSelecte()
    }
  }

  setMargePrix(prixAchat, marge, margePourcentage){
     if(marge == 0){
       return Number(prixAchat) + Number(prixAchat) * 0.01 * Number(margePourcentage)
     }else{
       return Number(prixAchat) + Number(marge)
     }
  }

  setPrixVenteSelonQuantiteAndClient(qte, article, client) {

    var prixVenteReel = 0

    if(client.id == undefined){
      return article.prixVenteHT
    }

    var prixWithQuantitesWithClient = article.prixWithQuantites.filter(x => x.client == client.id && x.quantiteMax != 0 && x.quantiteMin != 0)

    for (let i = 0; i < prixWithQuantitesWithClient.length; i++) {
      
      if (qte >= prixWithQuantitesWithClient[i].quantiteMin && qte <= prixWithQuantitesWithClient[i].quantiteMax) {
        prixVenteReel = this.setMargePrix(article.prixAchat, prixWithQuantitesWithClient[i].marge, prixWithQuantitesWithClient[i].margePourcentage)
      }
    }

    var prixWithQuantitesWithClient = article.prixWithQuantites.filter(x => x.client == client.id && x.quantiteMax == 0 && x.quantiteMin == 0)

    if (prixVenteReel == 0) {
      for (let i = 0; i < prixWithQuantitesWithClient.length; i++) {
        prixVenteReel = this.setMargePrix(article.prixAchat, prixWithQuantitesWithClient[i].marge, prixWithQuantitesWithClient[i].margePourcentage)
      }
    }

    if (prixVenteReel == 0) {
      var prixWithQuantitesSansClient = article.prixWithQuantites.filter(x => x.client == null && x.quantiteMax != 0 && x.quantiteMin != 0)
      for (let i = 0; i < prixWithQuantitesSansClient.length; i++) {
        if (qte >= prixWithQuantitesSansClient[i].quantiteMin && qte <= prixWithQuantitesSansClient[i].quantiteMax) {
          prixVenteReel = this.setMargePrix(article.prixAchat, prixWithQuantitesSansClient[i].marge, prixWithQuantitesSansClient[i].margePourcentage)
        }
      }
    }

    if (prixVenteReel == 0) {
      var prixWithQuantitesSansClient = article.prixWithQuantites.filter(x => x.client == null && x.quantiteMax == 0 && x.quantiteMin == 0)
      for (let i = 0; i < prixWithQuantitesSansClient.length; i++) {
        prixVenteReel = this.setMargePrix(article.prixAchat, prixWithQuantitesSansClient[i].marge, prixWithQuantitesSansClient[i].margePourcentage)
      }
    }

    if (prixVenteReel == 0) {
      prixVenteReel = article.prixVenteHT
    }

    return prixVenteReel
  }

  changePrixTotal() {
    var articles = this.articles.filter(x => x.id == this.itemArticleSelected.article)
    if (articles.length > 0) {
      if (articles[0].sansRemise == "oui") {
        //this.itemArticleSelected.prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(this.itemArticleSelected.quantiteVente, articles[0], this.client)
        this.itemArticleSelected.tauxRemise = (this.itemArticleSelected.prixVenteHT - this.itemArticleSelected.prixVenteHTReel) / this.itemArticleSelected.prixVenteHT * 100
      }
    }

    this.itemArticleSelected = this.calculTotals(this.itemArticleSelected)
    document.getElementById("affichePrixTotal").setAttribute("class", "")
    setTimeout(() => {
      document.getElementById("affichePrixTotal").setAttribute("class", "headtext")
    }, 20)
  }

  changeQuantite() {
    var articles = this.articles.filter(x => x.id == this.itemArticleSelected.article)
    if (articles.length > 0) {
      //this.itemArticleSelected.prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(this.itemArticleSelected.quantiteVente, articles[0], this.client)
      //this.itemArticleSelected.tauxRemise = (this.itemArticleSelected.prixVenteHT - this.itemArticleSelected.prixVenteHTReel) / this.itemArticleSelected.prixVenteHT * 100
      this.changePrixTotal()
    }
  }

  changeQuantite2Array(numero){
    this.articlesSelected[numero - 1].quantiteVente = this.articlesSelected[numero - 1].quantiteVente2 * this.articlesSelected[numero - 1].coefficient
    this.changePrixTotalArray(numero)
  }

  changePrixVenteHTReelArray(numero){
    this.articlesSelected[numero - 1].tauxRemise = (this.articlesSelected[numero - 1].prixVenteHT - this.articlesSelected[numero - 1].prixVenteHTReel) / this.articlesSelected[numero - 1].prixVenteHT * 100
    this.changePrixTotalArray(numero)
  }

  changePrixVenteHTReel2Array(numero){
    this.articlesSelected[numero - 1].prixVenteHTReel = this.articlesSelected[numero - 1].prixVenteHTReel2 / this.articlesSelected[numero - 1].coefficient
    this.articlesSelected[numero - 1].tauxRemise = (this.articlesSelected[numero - 1].prixVenteHT - this.articlesSelected[numero - 1].prixVenteHTReel) / this.articlesSelected[numero - 1].prixVenteHT * 100
    this.changePrixTotalArray(numero)
  }

  changePrixTotalArray(numero) {
    var articles = this.articles.filter(x => x.id == this.articlesSelected[numero - 1].article)
    if (articles.length > 0) {
      if (articles[0].sansRemise == "oui") {
        //this.articlesSelected[numero - 1].prixVenteHTReel = this.setPrixVenteSelonQuantiteAndClient(this.articlesSelected[numero - 1].quantiteVente, articles[0], this.client)
        this.articlesSelected[numero - 1].tauxRemise = (this.articlesSelected[numero - 1].prixVenteHT - this.articlesSelected[numero - 1].prixVenteHTReel) / this.articlesSelected[numero - 1].prixVenteHT * 100
      }
    }
    this.misAJourLigneBL(numero)
  }

  misAJourLigneBL(numero){
    this.articlesSelected[numero - 1] = this.calculTotals(this.articlesSelected[numero - 1])
    this.modifierPrixTotalBL()
  }

  // start valide le plafond remise
  numeroLigneCheckPlafondRemise = 0
  changeTauxRemise(numero){
    var articles = this.articles.filter(x => x.id == this.articlesSelected[numero - 1].article)
    if (articles.length > 0) {
      for(let i = 0; i < this.articlesSelected.length; i++){
        if (this.articlesSelected[i].numero == numero && this.articlesSelected[i].tauxRemise > articles[0].plafondRemise && articles[0].plafondRemise != 0) {
          this.numeroLigneCheckPlafondRemise = numero
          this.openConfirmationPlafondRemise()
          return
        }
      }
    }
    this.misAJourLigneBL(numero)
  }

  isOpenModalConfirmationPlafondRemise = false
  openConfirmationPlafondRemise() {
    this.isOpenModalConfirmationPlafondRemise = true
  }

  closeConfirmationPlafondRemise() {
    this.isOpenModalConfirmationPlafondRemise = false
  }

  confirmeePlafondRemise(){
    var articles = this.articles.filter(x => x.id == this.articlesSelected[this.numeroLigneCheckPlafondRemise - 1].article)
    if (articles.length > 0) {
      for(let i = 0; i < this.articlesSelected.length; i++){
        if (this.articlesSelected[i].numero == this.numeroLigneCheckPlafondRemise && this.articlesSelected[i].tauxRemise > articles[0].plafondRemise && articles[0].plafondRemise != 0) {
          this.articlesSelected[i].tauxRemise = articles[0].plafondRemise
          this.misAJourLigneBL(this.numeroLigneCheckPlafondRemise)
        }
      }
    }
    this.closeConfirmationPlafondRemise()
  }

  nonConfirmeePlafondRemise(){
    this.misAJourLigneBL(this.numeroLigneCheckPlafondRemise)
    this.closeConfirmationPlafondRemise()
  }

  // end valide le plafond remise

  calculTotals(item) {
    if (this.client) {
      if (this.client.exemptTVA == "non") {
        item.tauxTVA = 0
      }
    }

    var quantiteVente = Number(this.getNumber(item.quantiteVente))
    var tauxRemise = Number(item.tauxRemise.toFixed(5))

    /*if (tauxRemise > item.plafondRemise && item.plafondRemise > 0) {
      tauxRemise = item.plafondRemise
      item.tauxRemise = tauxRemise
      this.openConfirmationPlafondRemise()
    }*/

    var totalRemise = (Number(item.prixVenteHT) * tauxRemise / 100) * quantiteVente
    var newPrixVenteHt = Number(item.prixVenteHT) - (Number(item.prixVenteHT) * tauxRemise / 100)
    var totalHT = newPrixVenteHt * quantiteVente

    var totalTVA = totalHT * item.tauxTVA / 100
    var totalTTC = totalHT + totalTVA

    item.prixTTC = Number(newPrixVenteHt * (1 + item.tauxTVA / 100))

    
    item.prixVenteHTReel = Number(this.getNumber(newPrixVenteHt))
    item.totalRemise = Number(this.getNumber(totalRemise))
    item.totalHT = Number(this.getNumber(totalHT))
    item.totalTVA = Number(this.getNumber(totalTVA))
    item.totalTTC = Number(this.getNumber(totalTTC))

    item.prixVenteHTReel2 = item.prixVenteHTReel / item.coefficient
    item.quantiteVente2 = item.quantiteVente * item.coefficient
    
    item.totalGain = Number(this.getNumber((newPrixVenteHt - item.prixAchat) * quantiteVente))

    return item
  }


  getNumber(float) {
    return this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(float)
  }
  // end autocomplete articles
  constructor(
    private notificationToast: ToastNotificationService,
    public informationGenerale: InformationsService,

    public fonctionPartagesService: FonctionPartagesService,
    private fnctModel: FnctModelService,) {
     
    }

  ngOnInit(): void {
    if(!this.isPrixVenteNotPrixAchat()){
      this.shemaArticle.prixVenteHT = "Prix Achat HT(U1)"
      this.shemaArticle.prixVenteHTReel = "Prix Achat HT(Après remise)(U1)"
      this.shemaArticle.prixVenteHTReel2 = "Prix Achat HT(Après remise)(U2)"
    }

    this.initialiserVariablesOfShowsElements()
  }

  controleInputs() {
    for (let key in this.erreurArticle) {
      this.erreurArticle[key] = ""
    }

    var isValid = true

    if (this.itemArticleSelected.reference == "") {
      this.erreurArticle.reference = "Veuillez remplir ce champ"
      isValid = false
    }

    if (Number(this.itemArticleSelected.quantiteVente) == 0) {
      this.erreurArticle.quantiteVente = "Veuillez remplir ce champ"
      isValid = false
    }

    return isValid
  }

  ajoutArticle() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    this.notificationToast.showSuccess("Votre article est ajoutée")

    var item = {}

    for (let key of this.objectKeys(this.itemArticleSelected)) {
      item[key] = this.itemArticleSelected[key]
    }

    item['numero'] = this.articlesSelected.length + 1
    item['societe'] = this.informationGenerale.idSocieteCurrent

    this.articlesSelected.push(item)

    this.resetItemSelecte()
    this.modifierPrixTotalBL()

  }

  reseteFormulaire() {
    for (let key in this.itemArticleSelected) {
      this.itemArticleSelected[key] = ""
    }
  }

  //begin delete item

  isOpenModalDelete = false
  numeroItemDelete = 0
  params1Delete = ""
  params2Delete = ""

  deleteItem() {
    this.notificationToast.showSuccess("Votre article est supprimée")
    this.articlesSelected = this.articlesSelected.filter(x => x.numero != this.numeroItemDelete)
    this.closeModalDelete()
    this.modifierPrixTotalBL()
  }

  openModalDelete(numero, params2) {
    this.numeroItemDelete = numero
    this.isOpenModalDelete = true
    this.params1Delete = "L'article "
    this.params2Delete = params2
  }

  closeModalDelete() {
    this.isOpenModalDelete = false
  }

  //fin delete item
  tabNumbersInput = ['prixVenteHTReel2', 'prixVenteHTReel', 'tauxRemise', 'quantiteVente', 'quantiteVente2']
  allTabNumbers = ['prixVenteHTReel2','prixVenteHTReel', 'totalGain', 'pVenteConseille', 'totalTTC', 'prixTTC', 'tauxTVA', 'totalHT', 'prixVente', 'plafondRemise', 'prixVenteHT', 'prixAchat', 'tauxRemise', 'quantiteVente', 'quantiteVente2']
  tabNumbersLabel = [ 'totalGain', 'pVenteConseille', 'totalTTC', 'prixTTC', 'tauxTVA', 'totalHT', 'prixVente', 'plafondRemise', 'prixVenteHT', 'prixAchat']

  fixedVerguleNumbers() {

    for (let j = 0; j < this.tabNumbersInput.length; j++) {
      this.itemArticleSelected[this.tabNumbersInput[j]] = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.itemArticleSelected[this.tabNumbersInput[j]])
    }

    for (let i = 0; i < this.articlesSelected.length; i++) {
      for (let j = 0; j < this.tabNumbersInput.length; j++) {
        this.articlesSelected[i][this.tabNumbersInput[j]] = this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.articlesSelected[i][this.tabNumbersInput[j]])
      }
    }
  }

  showInput2(event) {
    this.fonctionPartagesService.showInput2(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 100)
  }

  resetDesactiveInput(id) {
    this.fonctionPartagesService.resetDesactiveInput(id)
  }

  deplaceLigne(numero, pas) {
    var newPos = numero + pas
    if (newPos == 0) {
      newPos = 0
    }

    if (newPos > (this.articlesSelected.length - 1)) {
      newPos = this.articlesSelected.length - 1
    }

    var item: any = {}
    item = this.articlesSelected[numero]
    this.articlesSelected[numero] = this.articlesSelected[newPos]
    this.articlesSelected[newPos] = item

    for (let i = 0; i < this.articlesSelected.length; i++) {
      this.articlesSelected[i].numero = i + 1
    }
  }

  //open modal ajout Article
  isOpenModalAjoutArticle = false
  idAjoutArticleModal = ""

  closeModalAjoutArticle() {
    this.isOpenModalAjoutArticle = false
    //this.getAllParametres()
  }

  openModalAjoutArticle() {
    this.isOpenModalAjoutArticle = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.client) {
      if (changes.client.previousValue != undefined && changes.client.previousValue.exemptTVA != undefined && changes.client.currentValue.exemptTVA != undefined) {
        if ((changes.client.previousValue.exemptTVA != changes.client.currentValue.exemptTVA) || (changes.client.previousValue.exemptTimbreFiscale != changes.client.currentValue.exemptTimbreFiscale)) {
          this.openConfirmationTVATimbreFiscal()
        }
      }
    }
  }

  //Modal Confirmation TVA Timbre Fiscal
  isOpenModalConfirmationTVATimbreFiscal = false
  confirmeeTVATimbreFiscal() {
    this.client.exemptTimbreFiscale = "oui"
    this.client.exemptTVA = "oui"
    this.closeConfirmationTVATimbreFiscal()
    this.resetLigneBL()
  }

  nonConfirmeeAction() {
    this.client.exemptTimbreFiscale = "non"
    this.client.exemptTVA = "non"
    this.closeConfirmationTVATimbreFiscal()
    this.resetLigneBL()
  }

  openConfirmationTVATimbreFiscal() {
    this.isOpenModalConfirmationTVATimbreFiscal = true
  }

  closeConfirmationTVATimbreFiscal() {
    this.isOpenModalConfirmationTVATimbreFiscal = false
  }

  //Modal-attention-Plafond-credit
  resetLigneBL() {
    for (let i = 0; i < this.articlesSelected.length; i++) {
      this.articlesSelected[i] = this.calculTotals(this.articlesSelected[i])
    }
    this.modifierPrixTotalBL()
  }

  //app-showelements
  itemsShowsElements = {}
  itemsVariableShowsElements = {}

  initialiserVariablesOfShowsElements() {
    for (let key in this.shemaArticle) {
      this.itemsShowsElements[key] = "active"
      this.itemsVariableShowsElements[key] = "active"
    }
  }

  //initialiser le completation de lignes si  
  //les lignes de table est inferieur a 6
  emptyTable = []
  initialisationEmptyTable() {
    this.emptyTable = []
    if (this.articlesSelected.length < 6) {
      for (let i = this.articlesSelected.length; i < 6; i++) {
        this.emptyTable.push({})
      }
      return true
    }
    return false
  }

  //pour tester si les champs client et article n'est pas sélectionné
  testVide()
  {
    if (this.client.raisonSociale == undefined) {
    this.notificationToast.showError("Veuillez sélectionner un client!")
    return false
  } else if (this.itemArticleSelected.prixVenteHT == 0) {
    this.notificationToast.showError("Veuillez sélectionner un article!")
    return false
  }
    return true
  }
  //open modal ajout Element
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  openModalHistoriqueAchat() {
    if(!this.testVide())
    {
       return
    }
    this.typeElement = this.fonctionPartagesService.titreOfModal.voirHistoriqueAchat
    this.idAjoutElementModal = this.itemArticleSelected.article
    this.isOpenModalAjoutElement = true
  }

  openModalHistoriqueVente() {
    if(!this.testVide())
    {
       return
    }
    this.typeElement = this.fonctionPartagesService.titreOfModal.voirHistoriqueVente
    this.idAjoutElementModal = this.itemArticleSelected.article
    this.isOpenModalAjoutElement = true
  }

  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
  }
  

  getReferenceSousProduit(idSousProduit, idArticle){
    if(idSousProduit == ""){
      return ""
    }
    var elements = this.articles.filter(x => x.id == idArticle)
    if(elements.length > 0){
       var element = elements[0]
       for(let i =0; i < element.sousProduits.length; i++){
         if(element.sousProduits[i].id = idSousProduit){
           return element.sousProduits[i].reference
         }
       }
    }
  }

}
