import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';

@Component({
  selector: 'app-correction-stock-html',
  templateUrl: './correction-stock-html.component.html',
  styleUrls: ['./correction-stock-html.component.scss']
})
export class CorrectionStockHtmlComponent implements OnInit {

  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  correctionStockFormGroup: FormGroup;

  lienAjoute = "/correctionStocks/newCorrectionStock"
 
  lienGetByIdI = "/correctionStocks/getById/"
 
  apiList = "/correctionStocks/listCorrectionStocks"
  apiParametres = "/correctionStocks/getAllParametres"
  lienModifie = "/correctionStocks/modifierCorrectionStock/"
  
  articles = []
  allArticles = []
  allPersonnels = []

  @Input() titreCrud = this.fonctionPartagesService.titreCrud.ajouter

  ligneCorrectionStocks = []
  objectKeys = Object.keys;

  request = {
    numero: "",
    exercice: 0,
    date: "",
    societe: "",
    personnel: "",
    notes: "",
    ligneCorrectionStocks: []
  }

  correctionStock = {
    numero: "",
    exercice: 0,
    date: "",
    societe: "",
    personnel: "",
    notes: "",
    ligneCorrectionStocks: []
  }

  erreurCorrectionStock = {
    date: "",
    personnel: "",
  }

  id="";

  constructor(private notificationToast: ToastNotificationService,
    private http: HttpClient,
    public informationGenerale: InformationsService, public fonctionPartagesService: FonctionPartagesService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage:TokenStorageService) {
      this.getAllParametres()

      this.correctionStock  .date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  
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
          this.allPersonnels = resultat.personnels
          
          if (this.titreCrud == this.fonctionPartagesService.titreCrud.ajouter) {
            this.correctionStock.numero = resultat.numeroAutomatique
          }
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
  
  changePrixTotalEvent() {
    console.log(this.articles)
  }


  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != undefined){
      this.getCorrectionStock(this.id)
    }
  }

  getCorrectionStock(id) { 
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.lienGetByIdI+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          this.request = response.resultat
          for (let key in this.correctionStock) {
            this.correctionStock[key] = this.request[key]
          }
          this.correctionStock.date = formatDate(new Date(this.correctionStock.date), 'yyyy-MM-dd', 'en');
          this.articles = this.request.ligneCorrectionStocks
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  controleInputs() {
    for (let key in this.erreurCorrectionStock){
      this.erreurCorrectionStock[key] = ""
      if(document.getElementById(key) != null){
        document.getElementById(key).classList.remove("border-erreur")
      }
    }

    var isValid = true

    for (let key in this.erreurCorrectionStock){
      if(this.correctionStock[key] == ""){
        console.log(this.correctionStock[key].length)
        this.erreurCorrectionStock[key] = "Veuillez remplir ce champ"
        if(document.getElementById(key) != null){
          document.getElementById(key).classList.add("border-erreur")
        }
      }
    }

    if(this.articles.length == 0){
      alert("Aucun article modifier !!")
      isValid = false
    }

    return isValid
  }

  isLoading = false

  ajoutCorrectionStock() {
    if(this.id != undefined){
      this.modifierCorrectionStock()
    }

    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }

    for (let key in this.correctionStock) {
      this.request[key] = this.correctionStock[key]
    }
    this.request.ligneCorrectionStocks = this.articles
    this.request.societe = this.informationGenerale.idSocieteCurrent
    this.request.exercice = this.informationGenerale.exerciceCurrent
    this.request.personnel = this.tokenStorage.getUser()?.id

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
          this.router.navigate(['correctionStock/list'])
          this.notificationToast.showSuccess("Votre correctionStock est bien enregistrée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  reseteFormulaire() {
    for (let key in this.erreurCorrectionStock) {
      this.correctionStock[key] = ""
    }
    this.ligneCorrectionStocks = []
  }

  //autocomplete magasin
  objetPersonnel = {
    nom:"Nom",
    prenom:"Prénom",
    role:"Role",
    email:"Email",
    telephone:"Téléphone",
    adresse:"Adresse",
  }
  keySelectedPersonnel = "nom"
  setPersonnelID(id) {
    this.correctionStock.personnel = id
  }

  //start Categorie
  isOpenModalAjoutElement = false
  idAjoutElementModal = ""
  typeElement

  closeModalAjoutElement(){
     this.isOpenModalAjoutElement = false
     this.getAllParametres()
  }

  openModalAjoutPersonnel(){
     this.typeElement = this.fonctionPartagesService.titreOfModal.ajouterPersonnel
     this.isOpenModalAjoutElement = true
  }
//end Categorie

  modifierCorrectionStock() {
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
  
    for(let key in this.correctionStock){
      this.request[key] = this.correctionStock[key]
    }   
  
    this.request.ligneCorrectionStocks = this.articles
    this.request.societe = this.informationGenerale.idSocieteCurrent
    if (this.isLoading) {
      return
    }

    this.request.personnel = this.tokenStorage.getUser()?.id
    this.isLoading = true
  
    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.router.navigate(['correctionStock/list'])
          this.notificationToast.showSuccess("Votre correctionStock est bien modifiée !")
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }


}
