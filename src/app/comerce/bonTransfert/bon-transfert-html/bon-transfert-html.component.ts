import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bon-transfert-html',
  templateUrl: './bon-transfert-html.component.html',
  styleUrls: ['./bon-transfert-html.component.scss']
})
export class BonTransfertHtmlComponent implements OnInit {

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonTransfertFormGroup: FormGroup;

  lienAjoute = "/bonTransferts/newBonTransfert"

  apiList = "/bonTransferts/listBonTransferts"
 
  apiParametres = "/bonTransferts/getAllParametres"

  lienModifie = "/bonTransferts/modifierBonTransfert/"

  lienGetById = "/bonTransferts/getById/"

  pageList="/bonTransfert/list"
  
  @Input() titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  id = ""

  articles = []
  allArticles = []
  allMagasins = []
  uniteMesures = []

  ligneBTs = []

  objectKeys = Object.keys;

 
  request = {
    numero: "",
    date: "",

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

    societe: "",
    magasinArrive:"",
    magasinDepart:"",
    exercice: 0,

    observation: "",
    articles: [],
    expeditions: [],

  }

  bonTransfert = {
    numero: "",
    date: "",

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

    
    magasinArrive:"",
    magasinDepart:"",
    societe: "",

    observation: "",
    articles: []
  }

  tabNumbers = ["totalDC", "montantEscompte", "tFiscale", "montantPaye", "restPaye", "totalRedevance", "totalFodec"]

  erreurBonTransfert = {
    numero:"",
    date:"",
    totalHT:"",
    magasinArrive:"",
  }

  constructor(
    private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService, 
    public fonctionPartagesService:FonctionPartagesService,
    private route: ActivatedRoute,
    private router: Router,) 
  {
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
          this.allMagasins = resultat.societes
       
          if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
            this.bonTransfert.numero = resultat.numeroAutomatique
          }
          this.uniteMesures = resultat.uniteMesures
        
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  changePrixTotalEvent(){
    console.log(this.articles)
  }

  isDetails = "non"
  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
    this.getAllParametres()
    
    if (this.titreCrud == this.fonctionPartagesService.titreCrud.details) {
      this.isDetails = "oui"
    }

    if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
      this.bonTransfert.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    }else{
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id.length > 1) {
        this.getBonTransfert(this.id)
      }
    }
  }

  organiserArtticlesSelonNumero(articles){
    var articlesOrdonnees = []
    for(let i = 0; i < articles.length; i++){
      articlesOrdonnees.push(articles.filter(x => x.numero == (i+1))[0])
    }
    return articlesOrdonnees
  }


  getBonTransfert(id) {

    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGetById + id).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
        
          this.request = response.resultat
          this.request.articles = this.organiserArtticlesSelonNumero(response.bonTransfertArticles)
          for (let key in this.bonTransfert) {
            this.bonTransfert[key] = this.request[key]
          }
          this.bonTransfert.date = formatDate(new Date(this.bonTransfert.date), 'yyyy-MM-dd', 'en');
          this.articles = this.request.articles
     
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }


  controleInputs() {
    for(let key in this.erreurBonTransfert){
      this.erreurBonTransfert[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
   
    var isValid = true

    if(this.bonTransfert['totalHT'] == 0){
      this.erreurBonTransfert['totalHT'] = "Veuillez ajouter votres articles"
      isValid = false
      if(document.getElementById('totalHT') != null){
        document.getElementById('totalHT').classList.remove("border-erreur")
      }
    }

    if(this.bonTransfert['magasinArrive'] == ""){
      this.erreurBonTransfert['magasinArrive'] = "Veuillez ajouter votre magasin d'arrivee "
      isValid = false
      if(document.getElementById('magasinArrive') != null){
        document.getElementById('magasinArrive').classList.remove("border-erreur")
      }
    }
    
    return isValid
  }

  isLoading = false

  ajoutBonTransfert()
  {  
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
     
    for(let key in this.bonTransfert){
      this.request[key] = this.bonTransfert[key]
    }   

    this.request.articles = this.articles
    this.request.magasinDepart = this.informationGenerale.idSocieteCurrent
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.exercice = this.informationGenerale.exerciceCurrent
   
    if (this.isLoading) {
      return
    }
   
    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienAjoute, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            //this.reseteFormulaire()
            this.notificationToast.showSuccess("Votre bonTransfert est bien enregistrée !")
            this.router.navigate([this.pageList]);
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
    
  }

  modifierBonTransfert() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }
    
    for(let key in this.bonTransfert){
      this.request[key] = this.bonTransfert[key]
    } 
    
    this.request.articles = this.articles
 
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre bonTransfert est bien modifiée !")
             this.router.navigate([this.pageList]);
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  reseteFormulaire(){
    for(let key in this.erreurBonTransfert){
      this.bonTransfert[key] = ""
    }
    this.ligneBTs = []
  }

  calculerRestePayer(){
     var montantPaye = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonTransfert.montantPaye))
     var totalTTC = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonTransfert.totalTTC))
     this.bonTransfert.restPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(totalTTC - montantPaye))
  }

 //autocomplete Magasin
 keySelectedMagasin = "raisonSociale"

  objetMagasin = {
    raisonSociale: "Raison_Sociale",
    matriculeFiscale: "Matricule_Fiscale",
    responsable: "Responsable",
    cinResponable: "Cin_Responable",
    telephones: "Téléphones",
    mobiles: "Mobiles",
    fax: "Fax",
    localite: "Localite",
    email: "Email",
    pays: "Pays",
    gouvernorat: "Gouvernorat",
    delegation: "Délégation",
    codePostale: "Code_Postale",
  }

  setMagasinArrive(id) {
    this.bonTransfert.magasinArrive = id
  }

}
