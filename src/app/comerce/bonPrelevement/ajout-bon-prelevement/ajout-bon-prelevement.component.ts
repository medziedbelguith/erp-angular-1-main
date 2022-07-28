import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { InformationsService } from 'src/app/services/informations.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-ajout-bon-prelevement',
  templateUrl: './ajout-bon-prelevement.component.html',
  styleUrls: ['./ajout-bon-prelevement.component.scss']
})
export class AjoutBonPrelevementComponent implements OnInit {
  public isCollapsed: boolean;
  public multiCollapsed1: boolean;
  public multiCollapsed2: boolean;

  bonPrelevementFormGroup: FormGroup;

  lienAjoute = "/bonPrelevements/newBonPrelevement"

  apiList = "/bonPrelevements/listBonPrelevements"
 
  articles = []
  allArticles = []

  ligneBTrs = []

  objectKeys = Object.keys;

  request = {
    numero:"",
    date:"",
    magasinier:"",
    personnel:"",
    articleAchats:[],
  }

  bonPrelevement = {
    numero:"",
    date:"",
    magasinier:"",
    personnel:"",
    articleAchats:[],
  }

  erreurBonPrelevement = {
    numero:"",
    date:"",
    magasinier:"",
    personnel:"",
  }

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient, 
    public informationGenerale: InformationsService, public fonctionPartagesService:FonctionPartagesService) 
  {
    this.getArticlesWithClients()
  }
  
  getArticlesWithClients(){ 
    this.http.get(this.informationGenerale.baseUrl + "/bonPrelevements/getAllParametres").subscribe(
      res => {
        let resultat: any = res
        if (resultat.status) {
          console.log(resultat)
          this.allArticles = resultat.articles2
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }
  
  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;

    this.bonPrelevement.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  controleInputs() {
    for(let key in this.erreurBonPrelevement){
      this.erreurBonPrelevement[key] = ""
    }
   
    var isValid = true

    return isValid
  }

  isLoading = false

  ajoutBonPrelevement()
  {  
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    } 
     
    for(let key in this.bonPrelevement){
      this.request[key] = this.bonPrelevement[key]
    }   

    this.request.articleAchats = this.articles
    
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
            this.notificationToast.showSuccess("Votre bonPrelevement est bien enregistrée !")
            console.log(resultat)
          }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );
    
  }

  reseteFormulaire(){
    for(let key in this.erreurBonPrelevement){
      this.bonPrelevement[key] = ""
    }
    this.ligneBTrs = []
  }
}
