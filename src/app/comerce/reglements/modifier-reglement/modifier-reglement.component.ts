import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InformationsService } from 'src/app/services/informations.service';
import { HttpClient } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { FonctionPartagesService } from 'src/app/services/fonction-partages.service';
const parametres = require("../parametres.json");

@Component({
  selector: 'app-modifier-reglement',
  templateUrl: './modifier-reglement.component.html',
  styleUrls: ['./modifier-reglement.component.scss']
})
export class ModifierReglementComponent implements OnInit {
  societeFormGroup: FormGroup;
  
  parametres2 = {
    apiModifie:"",
    apiGetById:"",
    apiDeleteliltrage:"",
    apiParametres:"",
    apiBons:"",
    titreAjouter:"",
    typeReglement:"",
    typeTier:"",
    pageList:""
  }
  id="";

  objectKeys = Object.keys;
  
  request = {
    client:"",
    modeReglement:"",
    typeReglement:"",
    tresorerie:"",
    montant:0,
    dateReglement:new Date(),
    numCheque:"",
    dateEcheance:"",
    notes:"",
    societe:"",
    numero:"",
    reste:0,
    activerLiltrage:"non",
    bonLivraisons:[]
  }

  reglement = {
    client:"",
    modeReglement:"",
    typeReglement:"",
    tresorerie:"",
    montant:0,
    dateReglement:new Date(),
    numCheque:"",
    dateEcheance:"",
    notes:"",
    societe:"",
    numero:"",
    reste:0,
    activerLiltrage:"non",
    bonLivraisons:[]
  }

  erreurReglement = {
    modeReglement:"",
    montant:"",
    client:"",
    dateReglement:"",
    numCheque:"",
    dateEcheance:"",
  }

  parametres = {
    allClients : [],
    allModeReglements : [],
    bonLivraisons : []
  }

  ancienBonLivraisons = []

  isLoading = false

  ancienReglement={
    reste:0,
    montant:0
  }

  constructor(private notificationToast:ToastNotificationService, 
    private http: HttpClient,
    private route: ActivatedRoute, 
    private router:Router,
    public informationGenerale: InformationsService,
    public fonctionPartagesService:FonctionPartagesService) { }

  ngOnInit(): void {
    
    var key = this.router.url.replace("/reglement/", "")
    key = key.substring(0, key.indexOf('/'))
    this.parametres2 = parametres[key]
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id.length > 1){
      this.getReglement(this.id)
    }
  }

  getAllParametres() {
    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.parametres2.apiParametres+this.informationGenerale.idSocieteCurrent, {typeReglement:this.parametres2.typeReglement}).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.parametres.allClients = resultat.clients
          this.parametres.allModeReglements = resultat.modeReglements
        }
      }, err => {
        this.isLoading = false
        console.log(err)
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

  controleInputs() {
    for(let key in this.erreurReglement){
      this.erreurReglement[key] = ""
    }
   
    var isValid = true

    if(this.reglement.modeReglement == ""){
       this.erreurReglement.modeReglement = "Veuillez remplir ce champ"
       isValid = false
    }

    if(this.reglement.montant == 0){
      this.erreurReglement.montant = "Votre Montant est null"
      isValid = false
    }
     
    if(this.reglement.client == ""){
      this.erreurReglement.client = "Veuillez remplir ce champ"
      isValid = false
    }

    return isValid
  }

  getReglement(id) {
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.parametres2.apiGetById+id).subscribe(
      res => {
        this.isLoading = false
        let response: any = res
        this.ancienReglement = response.resultat
        
        if (response.status){
           
          for(let key in this.reglement){
              this.reglement[key] = response.resultat[key]
          }
          
          this.parametres.bonLivraisons = response.bonLivraisons
          var bonLivraisons = response.bonLivraisons 
          let newBonLivraisons = []
          for(let i = 0; i < bonLivraisons.length; i++){
            newBonLivraisons.push({
              id:bonLivraisons[i].id, 
              montantAPayer:bonLivraisons[i].montantAPayer, 
              montantTotal:bonLivraisons[i].montantTotal, 
              montantPaye:bonLivraisons[i].montantPaye, 
              restPayer:bonLivraisons[i].restPayer,
              isPayee:bonLivraisons[i].isPayee,
            })
          }

          this.ancienBonLivraisons = newBonLivraisons
          
          this.getAllParametres()
        }
      }, err => {
        this.isLoading = false
        console.log(err)
        alert("Désole, ilya un problème de connexion internet")
      }
    );
  }

  ajoutReglement()
  {   
    if (!this.controleInputs()) {
      this.notificationToast.showError("Veuillez remplir les champs obligatoires !")
      return
    }   

    for(let key in this.reglement){
      this.request[key] = this.reglement[key]
    } 

    if (this.isLoading) {
      return
    }

    this.isLoading = true

    var bonLivraisons = []
    for(let i = 0; i < this.parametres.bonLivraisons.length; i++){
        if(this.parametres.bonLivraisons[i].montantAPayer != 0 || this.parametres.bonLivraisons[i].isPayee == "oui"){
          bonLivraisons.push(this.parametres.bonLivraisons[i])
        }  
    }
   
    this.request.bonLivraisons = bonLivraisons

    this.http.post(this.informationGenerale.baseUrl + this.parametres2.apiModifie +this.id, this.request).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre reglement est bien enregistrée !")
            this.router.navigate([this.parametres2.pageList]);
 
        }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }

  supprimerLiltrage()
  {   
    
    if (this.isLoading) {
      return
    }

    this.isLoading = true

    this.http.post(this.informationGenerale.baseUrl + this.parametres2.apiDeleteliltrage +this.id, {typeReglement:this.parametres2.typeReglement}).subscribe(

      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
            this.notificationToast.showSuccess("Votre liltrage est bien supprimée !")
            this.getReglement(this.id)
         }
      }, err => {
        this.isLoading = false
        alert("Désole, ilya un problème de connexion internet")
      }
    );  
  }
  
  reseteFormulaire(){
    for(let key in this.erreurReglement){
      this.reglement[key] = ""
    }
  }


  getBonLivraison(){
    
    if(this.reglement.activerLiltrage == "non" || this.reglement.client == ""){
      return
    }
    
    this.isLoading = true
    this.http.get(this.informationGenerale.baseUrl + this.parametres2.apiBons +this.reglement.client).subscribe(
      res => {
        this.isLoading = false
        let resultat: any = res
        if (resultat.status) {
          this.parametres.bonLivraisons = resultat.bonLivs
          let bonLivraisons = resultat.bonLivs
          let newBonLivraisons = []
          for(let i = 0; i < bonLivraisons.length; i++){
            bonLivraisons[i].montantAPayer = 0
            bonLivraisons[i].montantTotal = bonLivraisons[i].totalTTC + bonLivraisons[i].timbreFiscale
            newBonLivraisons.push({
              id:bonLivraisons[i].id, 
              montantAPayer:bonLivraisons[i].montantAPayer, 
              montantTotal:bonLivraisons[i].montantTotal, 
              montantPaye:bonLivraisons[i].montantPaye, 
              restPayer:bonLivraisons[i].restPayer,
              isPayee:bonLivraisons[i].isPayee,
            })
          }

          this.parametres.bonLivraisons = bonLivraisons
          this.ancienBonLivraisons = newBonLivraisons
       
        }
      }, err => {
        this.isLoading = false
        console.log(err)
        alert("Désole, il y a un problème de connexion internet")
      }
    );
  }

}
