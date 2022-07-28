import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationsService } from 'src/app/services/informations.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-modifier-bon-prelevement',
  templateUrl: './modifier-bon-prelevement.component.html',
  styleUrls: ['./modifier-bon-prelevement.component.scss']
})
export class ModifierBonPrelevementComponent implements OnInit {
  bonPrelevementFormGroup: FormGroup;

  lienModifie = "/bonPrelevements/modifierBonPrelevement/"
  lienGetById = "/bonPrelevements/getById/"

  articles = []
  allArticles = []

  id="";

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

  constructor(private http: HttpClient,
    public informationGenerale: InformationsService,
    private route: ActivatedRoute, 
    private router: Router, 
    private notificationToast:ToastNotificationService,
    public fonctionPartagesService:FonctionPartagesService) {

    this.getArticlesWithClients()

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

  }

  getArticlesWithClients(){
    this.http.get(this.informationGenerale.baseUrl + "/bonPrelevements/getAllParametres").subscribe(

      res => {
        let resultat: any = res
        if (resultat.status) {
          this.allArticles = resultat.articles2
        }
      }, err => {
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  getBonPrelevement(id) {
    
    this.isLoading = true

    this.http.get(this.informationGenerale.baseUrl + this.lienGetById+id).subscribe(

      res => {
        this.isLoading = false
        let response: any = res
        if (response.status) {
          console.log(response)
          this.request = response.resultat
          for (let key in this.bonPrelevement) {
            this.bonPrelevement[key] = this.request[key]
          }
          this.bonPrelevement.date = formatDate(new Date(this.bonPrelevement.date), 'yyyy-MM-dd', 'en');
          this.articles = this.request.articleAchats
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }

  isCollapsed = true;
  multiCollapsed1 = true;
  multiCollapsed2 = true;

  ngOnInit(): void {
    this.isCollapsed = true;
    this.multiCollapsed1 = true;
    this.multiCollapsed2 = true;
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getBonPrelevement(this.id)
    }
  }

  controleInputs() {
    for(let key in this.erreurBonPrelevement){
      this.erreurBonPrelevement[key] = ""
    }
   
    var isValid = true

    for(let key in this.erreurBonPrelevement){
      if(this.bonPrelevement[key] == ""){
        this.erreurBonPrelevement[key] = "Veuillez remplir ce champ"
        isValid = false
      }
    }   
    
    return isValid
  }

  isLoading = false

  modifierBonPrelevement() {
    /*if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }*/ 
    
    for(let key in this.bonPrelevement){
      this.request[key] = this.bonPrelevement[key]
    } 

    this.request.articleAchats = this.articles
    
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.lienModifie+this.id, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
             this.notificationToast.showSuccess("Votre bonPrelevement est bien modifiée !")
  
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );

  }
  ligneBTrs = []
  reseteFormulaire() {
    for (let key in this.erreurBonPrelevement) {
      this.bonPrelevement[key] = ""
    }

    this.ligneBTrs = []
  }
}
