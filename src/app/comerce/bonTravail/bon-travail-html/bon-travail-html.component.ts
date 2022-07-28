import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BonTravail } from 'src/app/model/modelCommerce/bonTravail';
import { BonTravailService } from 'src/app/services/serviceBD_Commerce/bonTravail.service';

@Component({
  selector: 'app-bon-travail-html',
  templateUrl: './bon-travail-html.component.html',
  styleUrls: ['./bon-travail-html.component.scss']
})
export class BonTravailHtmlComponent implements OnInit {

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonTravailFormGroup: FormGroup;

  pageList="/bonTravail/list"
  
  @Input() titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  id = ""

  articles = []
  allArticles = []
  allPersonnels = []
  uniteMesures = []

  objectKeys = Object.keys;

  request = new BonTravail()

  bonTravail  = new BonTravail()

  tabNumbers = ["totalDC", "montantEscompte", "tFiscale", "montantPaye", "restPaye", "totalRedevance", "totalFodec"]

  erreurBonTravail = {
    numero:"",
    date:"",
    totalHT:"",
    personnel:"",
  }

  constructor(
    private notificationToast:ToastNotificationService, 
    public informationGenerale: InformationsService, 
    public fonctionPartagesService:FonctionPartagesService,
    private route: ActivatedRoute,
    private router: Router,
    private bonTravailSer: BonTravailService,) 
  {

  }
  
  getAllParametres() {
    let request = {
      societe: this.informationGenerale.idSocieteCurrent,
      exercice: this.informationGenerale.exerciceCurrent
    }
    this.bonTravailSer.parametre(request)
    .subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {

          this.allArticles = resultat.articles
          this.allPersonnels = resultat.personnels

          if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
            this.bonTravail.numero = resultat.numeroAutomatique
          }
          this.uniteMesures = resultat.uniteMesures
          if( this.allArticles.length == 0)
          {
            this.notificationToast.showError("Il faut ajouter des articles en stock et n'est pas disponible en vente !")
          }
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
  }

  changePrixTotalEvent(){
    console.log(this.articles)
  }

  isDetails = "non"
  
  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
    
    if (this.titreCrud == this.fonctionPartagesService.titreCrud.details) {
      this.isDetails = "oui"
    }

    this.getAllParametres()
    if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
      this.bonTravail.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    }else{
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id.length > 1) {
        this.getBonTravail(this.id)
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


  getBonTravail(id) {

    this.isLoading = true
    this.bonTravailSer.get(id)
    .subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
        
          this.request = response.resultat
          this.request.articles = this.organiserArtticlesSelonNumero(response.bonTravailArticles)
          for (let key in this.bonTravail) {
            this.bonTravail[key] = this.request[key]
          }
          this.bonTravail.date = formatDate(new Date(this.bonTravail.date), 'yyyy-MM-dd', 'en');
          this.articles = this.request.articles
     
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });

  }

  controleInputs() {
    for(let key in this.erreurBonTravail){
      this.erreurBonTravail[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }
   
    var isValid = true
    for (let key in this.erreurBonTravail) {
      if (this.bonTravail[key] == "") {
        if (document.getElementById(key) != null) {
          document.getElementById(key).classList.add("border-erreur")
        }
        this.erreurBonTravail[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }

    if(this.bonTravail['totalHT'] == 0){
      this.erreurBonTravail['totalHT'] = "Veuillez ajouter votres articles"
      isValid = false
      if(document.getElementById('totalHT') != null){
        document.getElementById('totalHT').classList.remove("border-erreur")
      }
    }

    if(this.bonTravail['magasinArrive'] == ""){
      this.erreurBonTravail['magasinArrive'] = "Veuillez ajouter votre magasin d'arrivee "
      isValid = false
      if(document.getElementById('magasinArrive') != null){
        document.getElementById('magasinArrive').classList.remove("border-erreur")
      }
    }
    
    return isValid
  }

  isLoading = false

  ajoutBonTravail(){
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
     
    for(let key in this.bonTravail){
      this.request[key] = this.bonTravail[key]
    }   

    this.request.articles = this.articles
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.exercice = this.informationGenerale.exerciceCurrent + ""
   
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.bonTravailSer.create(this.bonTravail, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre bon Travail est bien enregistrée !")
            this.router.navigate([this.pageList]);
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      });
    
  }

  modifierBonTravail() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }    
    for(let key in this.bonTravail){
      this.request[key] = this.bonTravail[key]
    }     
    this.request.articles = this.articles 
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.bonTravailSer.update(this.id,this.bonTravail, this.request)
    .subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre bonTravail est bien modifiée !")
             this.router.navigate([this.pageList]);
        }
      },
      error => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }); 
  }

  reseteFormulaire(){
    for(let key in this.erreurBonTravail){
      this.bonTravail[key] = ""
    }
  }

  calculerRestePayer(){
     var montantPaye = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonTravail.montantPaye))
     var totalTTC = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(this.bonTravail.totalTTC))
     this.bonTravail.restPayer = Number(this.fonctionPartagesService.getFormaThreeAfterVerguleNomber(totalTTC - montantPaye))
  }

 //autocomplete Personnel
 keySelectedPersonnel = "nom"

  objetPersonnel = {
    nom:"Nom",
    prenom:"Prenom",
    role:"Role",
    email:"Email",
    telephone:"Téléphone",
    adresse:"Adresse",
  }

  setPersonnel(id) {
    this.bonTravail.personnel = id
  }
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement
  closeModalAjoutElement() {
    this.isOpenModalAjoutElement = false
    this.getAllParametres()
  }

  openModalAjoutPersonnel() {
    this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
    this.isOpenModalAjoutElement = true
  }

}
