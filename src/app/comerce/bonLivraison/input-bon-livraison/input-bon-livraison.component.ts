import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ImpressionDocumentService } from 'src/app/services/impression-document.service';

@Component({
  selector: 'app-input-bon-livraison',
  templateUrl: './input-bon-livraison.component.html',
  styleUrls: ['./input-bon-livraison.component.scss']
})
export class InputBonLivraisonComponent implements OnInit {
 
  public isCollapsed: boolean;
  public isCollapsed2: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonLivraisonFormGroup: FormGroup;

  @Input() lienAjoute = "/bonLivraisons/newBonLivraison"

  @Input() apiList = "/bonLivraisons/listBonLivraisons"

  @Input() apiParametres = "/bonlivraisons/getAllParametres"

  @Input() lienModifie = "/bonLivraisons/modifierBonLivraison/"

  @Input() lienGetById = "/bonLivraisons/getById/"

  @Input() apiAjouteReception = "/bonCommandes/addReception/"

  @Input() titreDocument = this.fonctionPartagesService.titreDocuments.bonLivraison
  
  @Input() titreDocumentTransfert = this.fonctionPartagesService.titreDocuments.bonLivraison

  @Input() modeTiere = this.fonctionPartagesService.modeTiere.client

  @Input() titreCrud = this.fonctionPartagesService.titreCrud.ajouter
  
  @Input() pageList = "/bonLivraison/list"
  
  @Input() receptions = []

  modeTransfert = false

  id = ""

  articles = []
  allArticles = []
  allClients = []
  
  reglements = []
  allModeReglement = []
  allTransporteurs = []

  objectKeys = Object.keys;

  request = {
    numero: "",
    date: "",
    client: "",

    totalRemise: 0,
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0,
    totalGain: 0,
    timbreFiscale: 0,

    montantPaye: 0,
    montantTotal: 0,
    totalRedevance: 0,
    totalFodec: 0,
    montantEscompte: 0,
    totalDC: 0,
    restPayer: 0,
    isValid : "non",
    validationStockBonAchat : "non",

    societe: "",
    exercice: "",

    observation: "",
    articles: [],
    expeditions: [],

    charges:[],
    chargesArticle:[]
  }

  bonLivraison = {
    numero: "",
    date: "",
    client: "",

    totalRemise: 0,
    totalHT: 0,
    totalTVA: 0,
    totalTTC: 0,
    totalGain: 0,
    timbreFiscale: 0,

    montantTotal: 0,
    montantPaye: 0,
    totalRedevance: 0,
    totalFodec: 0,
    montantEscompte: 0,
    totalDC: 0,
    restPayer: 0,

    societe: "",
    exercice: "",

    observation: "",
    isValid : "non",
    validationStockBonAchat : "non",
    articles: []
  }

  tabNumbers = ["totalDC", "montantEscompte", "tFiscale", "montantPaye", "restPaye", "totalRedevance", "totalFodec"]

  erreurBonLivraison = {
    client: "",
    date: "",
    totalHT: "",
  }

  uniteMesures = []
  
  charges = []
  chargesArticle = []
  allCharges = []
  chargeGlobals = []

  constructor(
    private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService,
    public fonctionPartagesService: FonctionPartagesService,
    private route: ActivatedRoute,
    private router: Router,
    private impressionDocument:ImpressionDocumentService) {
        
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  clickImpression(){
    var client = null
    var clients = this.allClients.filter(x => x.id == this.bonLivraison.client)
    if(clients.length > 0){
      client = clients[0]
    }
    this.impressionDocument.generatePDF(this.titreDocument, this.bonLivraison, this.articles, client)
  }

  isPrixVenteNotPrixAchat(){
    if(this.titreDocument == this.fonctionPartagesService.titreDocuments.bonRetourClient || this.titreDocument == this.fonctionPartagesService.titreDocuments.devis || this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison || this.titreDocument == this.fonctionPartagesService.titreDocuments.commande){
      return true
    }
    return false
  }

  getAllParametres() {
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
      exercice: this.informationGenerale.exerciceCurrent
    }

    this.http.post(this.informationGenerale.baseUrl + this.apiParametres, request).subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allArticles = resultat.articles
          this.allClients = resultat.clients
          
          if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
            this.bonLivraison.numero = resultat.numeroAutomatique
          }else if (this.titreCrud == this.fonctionPartagesService.titreCrud.transfert) {
            this.bonLivraison.numero = resultat.numeroAutomatique
          }

          this.uniteMesures = resultat.uniteMesures
          if(resultat.modeReglements){
            this.allModeReglement = resultat.modeReglements
          }

          if(resultat.charges){
            this.allCharges = resultat.charges
          }

          if(resultat.transporteurs){
            this.allTransporteurs = resultat.transporteurs
          }

        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  changePrixTotalEvent() {
  }

  ngOnInit(): void {
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
    this.getAllParametres()
    if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
      this.bonLivraison.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    } else {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id.length > 1) {
        this.getBonLivraison(this.id)
      }
    }
    this.bonLivraison.client = this.informationGenerale.clientCurrent
    if(this.titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat)
    {
      this.bonLivraison.validationStockBonAchat = this.informationGenerale.valStockBACurrent

    }
  }

  controleInputs() {
    for (let key in this.erreurBonLivraison) {
      this.erreurBonLivraison[key] = ""
    }

    var isValid = true
    if (this.bonLivraison['totalHT'] == 0) {
      this.erreurBonLivraison['totalHT'] = "Veuillez ajouter votres articles"
      isValid = false
    }

    if (this.bonLivraison['client'] == "") {
      this.erreurBonLivraison['client'] = "Veuillez remplir ce champ"
      isValid = false
    }

    if (this.bonLivraison['date'] == "") {
      this.erreurBonLivraison['date'] = "Veuillez ajouter votre date"
      isValid = false
    }
    return isValid
  }

  isLoading = false

  checkTransferDocument(titreDocument,resultat) {
    var modeTransfert = false
    if (titreDocument == this.fonctionPartagesService.titreDocuments.devis) {
      if (resultat.transfertBonLivraison != "") {
        modeTransfert = resultat.transfertBonLivraison == ""
      } else {
        modeTransfert = resultat.transfertCommande == ""
      }
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.commande) {
      modeTransfert = resultat.transfertBonLivraison == ""
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.bonCommande) {
      modeTransfert = resultat.transfertBonAchat == ""
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat) {
      modeTransfert = true
    } else if (titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison) {
      modeTransfert = true
    }

    return modeTransfert

  }

  getRequestDocumentTransfert(titreDocumentTransfer,request) {
    var request : any 
    request = this.request
    if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.devis){
      request.idTypeTransfert = this.id
      request.typeTransfert = "Devis"
      return request
    }else if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.commande){
      request.idTypeTransfert = this.id
      request.typeTransfert = "Commande"
      return request
    }else if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonCommande){
      request.idTypeTransfert = this.id
      request.typeTransfert = "BonCommande"
      return request
    }else if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonLivraison){
      request.idTypeTransfert = this.id
      request.typeTransfert = "BonLivraison"
      return request
    }else if(titreDocumentTransfer == this.fonctionPartagesService.titreDocuments.bonAchat){
      request.idTypeTransfert = this.id
      request.typeTransfert = "BonAchat"
      return request
    }
    return request
  }

  organiserArtticlesSelonNumero(articles){
    var articlesOrdonnees = []
    for(let i = 0; i < articles.length; i++){
      articlesOrdonnees.push(articles.filter(x => x.numero == (i+1))[0])
    }
    return articlesOrdonnees
  }

  
  getBonLivraison(id) {

    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGetById + id).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          //this.reseteFormulaire()
          if(this.titreCrud == this.fonctionPartagesService.titreCrud.transfert){
            this.modeTransfert = this.checkTransferDocument(this.titreDocumentTransfert, response.resultat)
          }else{
            this.modeTransfert = this.checkTransferDocument(this.titreDocument, response.resultat)
          }
          
          this.request = response.resultat

          if(this.titreDocumentTransfert == this.fonctionPartagesService.titreDocuments.commande){
            if(response.resultat.transfertBonLivraison.length > 1){
              this.notificationToast.showError("Votre " + this.titreDocumentTransfert + " a déjà été transféré !")
              this.router.navigate([this.pageList]);
            }
          }else if(this.titreDocumentTransfert == this.fonctionPartagesService.titreDocuments.bonCommande){
            if(response.resultat.transfertBonAchat.length > 1){
              this.notificationToast.showError("Votre " + this.titreDocumentTransfert + " a déjà été transféré !")
              this.router.navigate([this.pageList]);
            }
          }

          this.request.articles = this.organiserArtticlesSelonNumero(response.articles)
          for (let key in this.bonLivraison) {
            this.bonLivraison[key] = this.request[key]
          }
          this.bonLivraison.date = formatDate(new Date(this.bonLivraison.date), 'yyyy-MM-dd', 'en');
          this.articles = this.request.articles
          if (this.modeTiere == this.fonctionPartagesService.modeTiere.fournisseur) {
            this.bonLivraison.client = response.resultat.fournisseur
          }
          if(this.titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat)
          {
            this.charges = this.request['charges']
          }

          if(response.reglements){
            this.reglements = response.reglements
          }

          if(response.receptions){
            this.receptions = response.receptions
          }

        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  ajoutBonLivraison() {
    if (this.titreCrud == this.fonctionPartagesService.titreCrud.modifier) {
      this.modifierBonLivraison()
    }else if(this.titreCrud == this.fonctionPartagesService.titreCrud.transfert){
        if(this.modeTransfert){
          this.ajoutBonLivraison2()
        }else{
          this.notificationToast.showSuccess("Votre " + this.titreDocumentTransfert + " déjà transféré !")
        }
    }else{
        this.ajoutBonLivraison2()
    }
  }

  ajoutBonLivraison2() {

    if(this.client.nbFactureNonPaye > 0 && this.client.nbFactureNonPaye <= this.nbLivsClientNonPayee && this.titreDocument == this.fonctionPartagesService.titreDocuments.bonLivraison)
    {
      this.notificationToast.showError("les nombres des bons livraisons non payées atteint le maximum !")
      return
    }
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.bonLivraison) {
      this.request[key] = this.bonLivraison[key]
    }

    this.request.articles = this.articles
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.exercice = this.informationGenerale.exerciceCurrent + ""
    if(this.titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat)
    {
       this.request['charges'] = this.charges
    }

    if (this.isLoading) {
      return
    }

    let request: any = {}
    request = this.request
    if (this.modeTiere == this.fonctionPartagesService.modeTiere.fournisseur) {
      request.fournisseur = request.client
    }
    request.expeditions = []
    this.isLoading = true
    
    if(this.titreCrud == this.fonctionPartagesService.titreCrud.transfert){
      request = this.getRequestDocumentTransfert(this.titreDocumentTransfert,request)
    }

    request.reglements = this.reglements
   
    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          //this.reseteFormulaire()
          this.notificationToast.showSuccess("Votre " + this.titreDocument + " est bien enregistrée !")
          this.router.navigate([this.pageList]);
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  modifierBonLivraison() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    for (let key in this.bonLivraison) {
      this.request[key] = this.bonLivraison[key]
    }
    if (this.request.expeditions) {
      for (let j = 0; j < this.request.articles.length; j++) {
        var sommeQuantite = 0
        for (let i = 0; i < this.request.expeditions.length; i++) {
          for (let k = 0; k < this.request.expeditions[i].articles.length; k++) {
            if (this.request.articles[j].article == this.request.expeditions[i].articles[k].article) {
              sommeQuantite += this.request.expeditions[i].articles[k].quantiteALivree
            }
          }
        }
        this.request.articles[j].quantiteLivree = sommeQuantite
      }
    }
    if(this.titreDocument == this.fonctionPartagesService.titreDocuments.bonAchat)
    {
       this.request['charges'] = this.charges
    }
    this.request.articles = this.articles
    let request:any = {}
    for(let key in this.request){
      request[key] = this.request[key]
    }
    request.reglements = this.reglements  
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.http.post(this.informationGenerale.baseUrl + this.lienModifie + this.id, request).subscribe( 
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.notificationToast.showSuccess("Votre bonLivraison est bien modifiée !")
          this.request = resultat.resultat
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire() {
    for (let key in this.erreurBonLivraison) {
      this.bonLivraison[key] = ""
    }
  }

  calculerRestePayer(){
    var montantPaye = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.montantPaye))
    var totalTTC = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison.totalTTC))
    this.bonLivraison.restPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(totalTTC - montantPaye))
  }

  //autocomplete client
  keySelectedClient = "raisonSociale"
  objetClient = {
    email: "Email",
    telephone: "Téléphone",
    code: "Code",
    raisonSociale: "Raison Sociale",
    matriculeFiscale: "Matricule Fiscale",
    classement: "Classement",
    plafondCredit: "Plafond Crédit",
    mobiles: "Mobiles",
    siteWeb: "Site Web",
    conditionReglement: "Condition Reglement",
    typeTiers: "Type Tiers",
    credit: "Crédit",
    fax: "Fax",
    statusProspection: "Status Prospection",
    modeReglement: "Mode Reglement",
    paysFacturation: "Pays Facturation",
    gouvernoratFacturation: "Gouvernorat Facturation",
    delegationFacturation: "Délégation Facturation",
    localiteFacturation: "Localite Facturation",
    codePostaleFacturation: "Code Postale Facturation",
    adresseFacturation: "Adresse Facturation",
    paysLivraison: "Pays Livraison",
    gouvernoratLivraison: "Gouvernorat Livraison",
    delegationLivraison: "Délégation Livraison",
    localiteLivraison: "Localite Livraison",
    codePostaleLivraison: "Code Postale Livraison",
    adresseLivraison: "Adresse Livraison",
  }
  client: any = {}
  setClientID(id) {
    this.bonLivraison.client = id
    let client: any = this.allClients.filter(x => x.id == id)
    if (client.length == 0) {
      return
    }
    this.client = client[0]
    this.bonLivraisonsClient(id)
  }
  //pour calculer le nombre des bons livraisons non payées par un id client 
  lienBonLivraisonsClient = "/bonLivraisons/bonLivraisonsClient/"
  nbLivsClientNonPayee = 0
  bonLivraisonsClient(idClient)
  {
    this.http.get(this.informationGenerale.baseUrl + this.lienBonLivraisonsClient + idClient).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.nbLivsClientNonPayee = resultat.bonLivraisonsClient
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  showInput(event) {
    this.fonctionPartagesService.showInput(event)
    setTimeout(() => {
      this.fixedVerguleNumbers()
    }, 10)
  }

  fixedVerguleNumbers() {
    for (let i = 0; i < this.tabNumbers.length; i++) {
      this.bonLivraison[this.tabNumbers[i]] = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonLivraison[this.tabNumbers[i]]))
    }
  }

  //open modal ajout Client
  isOpenModalAjoutClient = false
  idAjoutClientModal = ""
  typeElement
  closeModalAjoutClient() {
    this.isOpenModalAjoutClient = false
    this.getAllParametres()
  }

  openModalAjoutClient() {
    if(this.modeTiere == this.fonctionPartagesService.modeTiere.client){
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterClient
    }else{
      this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterFournisseur
    }

    this.isOpenModalAjoutClient = true
  }

  clickIsValid(){
    if(this.bonLivraison.isValid == "oui"){
      this.bonLivraison.isValid = "non"
    }else{
      this.bonLivraison.isValid = "oui"
    }
  }
  
  clickIsValid2(){
    if(this.bonLivraison.validationStockBonAchat == "oui"){
      this.bonLivraison.validationStockBonAchat = "non"
    }else{
      this.bonLivraison.validationStockBonAchat = "oui"
    }
  }
}